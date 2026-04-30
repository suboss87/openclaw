import { describe, expect, it } from "vitest";
import { readResponseText } from "./web-shared.js";

// é in Latin-1 is 0xE9; in UTF-8 it would be 0xC3 0xA9.
// If decoded as UTF-8, lone 0xE9 produces U+FFFD (replacement char).
const LATIN1_CAFE = new Uint8Array([0x63, 0x61, 0x66, 0xe9]); // "café"

function makeStreamResponse(bytes: Uint8Array, contentType: string): Response {
  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      controller.enqueue(bytes);
      controller.close();
    },
  });
  return new Response(stream, { headers: { "content-type": contentType } });
}

function makeBufferedResponse(bytes: Uint8Array, contentType: string): Response {
  return new Response(bytes.buffer as ArrayBuffer, { headers: { "content-type": contentType } });
}

describe("readResponseText - charset detection", () => {
  it("decodes Latin-1 body when Content-Type declares charset=ISO-8859-1 (streaming)", async () => {
    const res = makeStreamResponse(LATIN1_CAFE, "text/html; charset=ISO-8859-1");
    const result = await readResponseText(res, { maxBytes: 1_000_000 });
    expect(result.text).toBe("café"); // é
    expect(result.truncated).toBe(false);
    expect(result.bytesRead).toBe(4);
  });

  it("decodes Latin-1 body when Content-Type declares charset=ISO-8859-1 (non-streaming)", async () => {
    const res = makeBufferedResponse(LATIN1_CAFE, "text/html; charset=ISO-8859-1");
    const result = await readResponseText(res);
    expect(result.text).toBe("café");
  });

  it("returns UTF-8 replacement char when charset is missing and body is not valid UTF-8", async () => {
    // No charset declared — lone 0xE9 is invalid UTF-8, expect replacement char.
    const res = makeStreamResponse(LATIN1_CAFE, "text/html");
    const result = await readResponseText(res, { maxBytes: 1_000_000 });
    expect(result.text).toContain("�");
  });

  it("detects charset from HTML <meta charset> when absent from Content-Type (streaming)", async () => {
    const metaHtml = `<html><head><meta charset="ISO-8859-1"></head><body>caf\xe9</body></html>`;
    const bytes = new Uint8Array(Buffer.from(metaHtml, "latin1"));
    const res = makeStreamResponse(bytes, "text/html");
    const result = await readResponseText(res, { maxBytes: 1_000_000 });
    expect(result.text).toContain("café");
  });

  it("detects charset from HTML http-equiv meta when absent from Content-Type (streaming)", async () => {
    const metaHtml = `<html><head><meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1"></head><body>caf\xe9</body></html>`;
    const bytes = new Uint8Array(Buffer.from(metaHtml, "latin1"));
    const res = makeStreamResponse(bytes, "text/html");
    const result = await readResponseText(res, { maxBytes: 1_000_000 });
    expect(result.text).toContain("café");
  });

  it("uses UTF-8 for non-HTML content even when body has non-UTF-8 bytes", async () => {
    const res = makeStreamResponse(new Uint8Array([0x68, 0x65, 0x6c, 0x6c, 0x6f]), "text/plain");
    const result = await readResponseText(res, { maxBytes: 1_000_000 });
    expect(result.text).toBe("hello");
  });

  it("decodes Latin-1 body when Content-Type declares quoted charset (charset=\"ISO-8859-1\")", async () => {
    const res = makeStreamResponse(LATIN1_CAFE, 'text/html; charset="ISO-8859-1"');
    const result = await readResponseText(res, { maxBytes: 1_000_000 });
    expect(result.text).toBe("café");
  });

  it("respects maxBytes truncation while still detecting charset from header", async () => {
    const longBody = new Uint8Array(
      Array.from({ length: 20 }, (_, i) => (i < 4 ? (LATIN1_CAFE[i] ?? 0x61) : 0x61)),
    );
    const res = makeStreamResponse(longBody, "text/html; charset=ISO-8859-1");
    const result = await readResponseText(res, { maxBytes: 4 });
    expect(result.truncated).toBe(true);
    expect(result.bytesRead).toBe(4);
    expect(result.text).toBe("café");
  });
});
