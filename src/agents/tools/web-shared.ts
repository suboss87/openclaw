export type CacheEntry<T> = {
  value: T;
  expiresAt: number;
  insertedAt: number;
};

export const DEFAULT_TIMEOUT_SECONDS = 30;
export const DEFAULT_CACHE_TTL_MINUTES = 15;
const DEFAULT_CACHE_MAX_ENTRIES = 100;

export function resolveTimeoutSeconds(value: unknown, fallback: number): number {
  const parsed = typeof value === "number" && Number.isFinite(value) ? value : fallback;
  return Math.max(1, Math.floor(parsed));
}

export function resolveCacheTtlMs(value: unknown, fallbackMinutes: number): number {
  const minutes =
    typeof value === "number" && Number.isFinite(value) ? Math.max(0, value) : fallbackMinutes;
  return Math.round(minutes * 60_000);
}

export function normalizeCacheKey(value: string): string {
  return value.trim().toLowerCase();
}

export function readCache<T>(
  cache: Map<string, CacheEntry<T>>,
  key: string,
): { value: T; cached: boolean } | null {
  const entry = cache.get(key);
  if (!entry) {
    return null;
  }
  if (Date.now() > entry.expiresAt) {
    cache.delete(key);
    return null;
  }
  return { value: entry.value, cached: true };
}

export function writeCache<T>(
  cache: Map<string, CacheEntry<T>>,
  key: string,
  value: T,
  ttlMs: number,
) {
  if (ttlMs <= 0) {
    return;
  }
  if (cache.size >= DEFAULT_CACHE_MAX_ENTRIES) {
    const oldest = cache.keys().next();
    if (!oldest.done) {
      cache.delete(oldest.value);
    }
  }
  cache.set(key, {
    value,
    expiresAt: Date.now() + ttlMs,
    insertedAt: Date.now(),
  });
}

export function withTimeout(signal: AbortSignal | undefined, timeoutMs: number): AbortSignal {
  if (timeoutMs <= 0) {
    return signal ?? new AbortController().signal;
  }
  const controller = new AbortController();
  const timer = setTimeout(controller.abort.bind(controller), timeoutMs);
  if (signal) {
    signal.addEventListener(
      "abort",
      () => {
        clearTimeout(timer);
        controller.abort();
      },
      { once: true },
    );
  }
  controller.signal.addEventListener(
    "abort",
    () => {
      clearTimeout(timer);
    },
    { once: true },
  );
  return controller.signal;
}

export type ReadResponseTextResult = {
  text: string;
  truncated: boolean;
  bytesRead: number;
};

// Extract charset label from a Content-Type value, e.g. "text/html; charset=Shift_JIS" → "Shift_JIS".
function charsetFromContentType(contentType: string | null): string | null {
  if (!contentType) {
    return null;
  }
  const m = /;\s*charset\s*=\s*["']?\s*([^\s"';]+)/i.exec(contentType);
  return m?.[1]?.trim() ?? null;
}

// Scan the first 4 KB of raw bytes for an HTML <meta charset> or http-equiv charset declaration.
// Decoded as latin1 so no byte is lost; meta tags are ASCII-safe.
const META_CHARSET_RE = /<meta[^>]+charset\s*=\s*["']?\s*([^\s"';>]+)/i;

function charsetFromHtmlBytes(bytes: Uint8Array): string | null {
  const sample = new TextDecoder("latin1").decode(bytes.subarray(0, Math.min(bytes.length, 4096)));
  return META_CHARSET_RE.exec(sample)?.[1]?.trim() ?? null;
}

// Construct a TextDecoder for the given charset label, falling back to UTF-8 on unknown labels.
function safeTextDecoder(charset: string | null | undefined): TextDecoder {
  if (!charset) {
    return new TextDecoder();
  }
  try {
    return new TextDecoder(charset);
  } catch {
    return new TextDecoder();
  }
}

function concatUint8Arrays(chunks: Uint8Array[], totalSize: number): Uint8Array {
  const result = new Uint8Array(totalSize);
  let offset = 0;
  for (const chunk of chunks) {
    result.set(chunk, offset);
    offset += chunk.length;
  }
  return result;
}

export async function readResponseText(
  res: Response,
  options?: { maxBytes?: number },
): Promise<ReadResponseTextResult> {
  const maxBytesRaw = options?.maxBytes;
  const maxBytes =
    typeof maxBytesRaw === "number" && Number.isFinite(maxBytesRaw) && maxBytesRaw > 0
      ? Math.floor(maxBytesRaw)
      : undefined;

  const contentType = res.headers?.get("content-type") ?? null;
  const isHtml = contentType?.toLowerCase().includes("text/html") ?? false;
  const headerCharset = charsetFromContentType(contentType);

  const body = (res as unknown as { body?: unknown }).body;
  if (
    maxBytes &&
    body &&
    typeof body === "object" &&
    "getReader" in body &&
    typeof (body as { getReader: () => unknown }).getReader === "function"
  ) {
    // Collect raw bytes so we can detect charset from HTML meta before decoding.
    const reader = (body as ReadableStream<Uint8Array>).getReader();
    let bytesRead = 0;
    let truncated = false;
    const rawChunks: Uint8Array[] = [];

    try {
      while (true) {
        const { value, done } = await reader.read();
        if (done) {
          break;
        }
        if (!value || value.byteLength === 0) {
          continue;
        }

        let chunk = value;
        if (bytesRead + chunk.byteLength > maxBytes) {
          const remaining = Math.max(0, maxBytes - bytesRead);
          if (remaining <= 0) {
            truncated = true;
            break;
          }
          chunk = chunk.subarray(0, remaining);
          truncated = true;
        }

        rawChunks.push(chunk);
        bytesRead += chunk.byteLength;

        if (truncated || bytesRead >= maxBytes) {
          truncated = true;
          break;
        }
      }
    } catch {
      // Best-effort: return whatever we decoded so far.
    } finally {
      if (truncated) {
        try {
          await reader.cancel();
        } catch {
          // ignore
        }
      }
    }

    const combined = concatUint8Arrays(rawChunks, bytesRead);
    let charset = headerCharset;
    if (!charset && isHtml) {
      charset = charsetFromHtmlBytes(combined) ?? null;
    }
    return { text: safeTextDecoder(charset).decode(combined), truncated, bytesRead };
  }

  // Non-streaming fallback: read as ArrayBuffer for proper charset detection when supported.
  try {
    const hasArrayBuffer =
      typeof (res as unknown as { arrayBuffer?: unknown }).arrayBuffer === "function";
    if (hasArrayBuffer) {
      const buf = await res.arrayBuffer();
      const bytes = new Uint8Array(buf);
      let charset = headerCharset;
      if (!charset && isHtml) {
        charset = charsetFromHtmlBytes(bytes) ?? null;
      }
      return {
        text: safeTextDecoder(charset).decode(bytes),
        truncated: false,
        bytesRead: bytes.length,
      };
    }
    // Last-resort fallback for environments that don't expose arrayBuffer() (e.g. some test mocks).
    const text = await res.text();
    return { text, truncated: false, bytesRead: text.length };
  } catch {
    return { text: "", truncated: false, bytesRead: 0 };
  }
}
