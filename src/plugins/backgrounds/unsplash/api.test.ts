import { calculateWidth } from "./api";

describe("unsplash/api", () => {
  it("should calculate width for screen", () => {
    expect(calculateWidth()).toBe(1920);
    expect(calculateWidth(1920)).toBe(1920);
    expect(calculateWidth(2000)).toBe(2160);
    expect(calculateWidth(5000)).toBe(3840);
  });
});
