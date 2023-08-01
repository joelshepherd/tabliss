import { addLink, removeLink, updateLink, reorderLink } from "./actions";
import { reducer } from "./reducer";

describe("links/reducer()", () => {
  it("should add new links", () => {
    expect(reducer([], addLink())).toEqual([{ url: "https://" }]);
    expect(
      reducer([{ url: "https://tab-nine.xsfs.xyz/" }], { type: "ADD_LINK" }),
    ).toEqual([{ url: "https://tab-nine.xsfs.xyz/" }, { url: "https://" }]);
  });

  it("should remove links", () => {
    expect(
      reducer(
        [
          { url: "https://tab-nine.xsfs.xyz/" },
          { url: "https://tab-nine.xsfs.xyz/about.html" },
        ],
        removeLink(0),
      ),
    ).toEqual([{ url: "https://tab-nine.xsfs.xyz/about.html" }]);
  });

  it("should update links", () => {
    expect(
      reducer(
        [
          { url: "https://tab-nine.xsfs.xyz/" },
          { url: "https://tab-nine.xsfs.xyz/about.html" },
        ],
        updateLink(0, { name: "tab-nine", url: "https://tab-nine.xsfs.xyz/" }),
      ),
    ).toEqual([
      { name: "tab-nine", url: "https://tab-nine.xsfs.xyz/" },
      { url: "https://tab-nine.xsfs.xyz/about.html" },
    ]);
  });

  it("should reorder links", () => {
    expect(
      reducer(
        [
          { url: "https://tab-nine.xsfs.xyz/" },
          { url: "https://tab-nine.xsfs.xyz/about.html" },
          { url: "https://tab-nine.xsfs.xyz/support.html" },
        ],
        reorderLink(1, 0),
      ),
    ).toEqual([
      { url: "https://tab-nine.xsfs.xyz/about.html" },
      { url: "https://tab-nine.xsfs.xyz/" },
      { url: "https://tab-nine.xsfs.xyz/support.html" },
    ]);

    expect(
      reducer(
        [
          { url: "https://tab-nine.xsfs.xyz/" },
          { url: "https://tab-nine.xsfs.xyz/about.html" },
          { url: "https://tab-nine.xsfs.xyz/support.html" },
        ],
        reorderLink(1, 2),
      ),
    ).toEqual([
      { url: "https://tab-nine.xsfs.xyz/" },
      { url: "https://tab-nine.xsfs.xyz/support.html" },
      { url: "https://tab-nine.xsfs.xyz/about.html" },
    ]);
  });

  it("should throw on unknown action", () => {
    expect(() => reducer([], { type: "UNKNOWN" } as any)).toThrow();
  });
});
