import { extractByPath } from "./api";

describe("customApi/api - extractByPath", () => {
  it("should extract a top-level string field", () => {
    expect(extractByPath({ url: "https://example.com/img.jpg" }, "url")).toBe(
      "https://example.com/img.jpg",
    );
  });

  it("should extract a nested field via dot-notation", () => {
    expect(
      extractByPath({ data: { url: "https://example.com/img.jpg" } }, "data.url"),
    ).toBe("https://example.com/img.jpg");
  });

  it("should extract from an array using bracket notation", () => {
    expect(
      extractByPath(
        { items: [{ src: "https://example.com/img.jpg" }] },
        "items[0].src",
      ),
    ).toBe("https://example.com/img.jpg");
  });

  it("should extract from an array using dot-index notation", () => {
    expect(
      extractByPath(
        { photos: [{ links: { download: "https://example.com/img.jpg" } }] },
        "photos.0.links.download",
      ),
    ).toBe("https://example.com/img.jpg");
  });

  it("should return undefined for a missing field", () => {
    expect(extractByPath({ data: {} }, "data.url")).toBeUndefined();
  });

  it("should return undefined when path traverses a non-object", () => {
    expect(extractByPath({ url: 42 }, "url.nested")).toBeUndefined();
  });

  it("should return undefined when the value is not a string", () => {
    expect(extractByPath({ count: 5 }, "count")).toBeUndefined();
  });

  it("should return undefined for null values in the path", () => {
    expect(extractByPath({ data: null }, "data.url")).toBeUndefined();
  });

  it("should handle deeply nested paths", () => {
    expect(
      extractByPath(
        { a: { b: { c: { d: "https://example.com/deep.jpg" } } } },
        "a.b.c.d",
      ),
    ).toBe("https://example.com/deep.jpg");
  });

  it("should return undefined for an empty path", () => {
    expect(extractByPath({ url: "https://example.com/img.jpg" }, "")).toBeUndefined();
  });
});
