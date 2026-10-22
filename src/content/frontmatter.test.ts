import { describe, expect, it } from "vitest";
import { FrontmatterError, splitFrontmatter } from "./frontmatter";

describe("splitFrontmatter", () => {
  it("separates the fields from the body", () => {
    const { data, body } = splitFrontmatter("---\ntitle: Luz\n---\nThe story.\n");
    expect(data).toEqual({ title: "Luz" });
    expect(body).toBe("The story.\n");
  });

  it("reads files saved with Windows line endings and a byte-order mark", () => {
    const { data, body } = splitFrontmatter("\uFEFF---\r\ntitle: Luz\r\n---\r\nLine one\r\nLine two\r\n");
    expect(data).toEqual({ title: "Luz" });
    expect(body).toBe("Line one\nLine two\n");
  });

  it("keeps dates as strings", () => {
    expect(splitFrontmatter("---\ndate: 2026-10-01\n---\n").data).toEqual({ date: "2026-10-01" });
  });

  it("accepts a file that ends right after the frontmatter", () => {
    expect(splitFrontmatter("---\ntitle: Luz\n---").body).toBe("");
  });

  it.each([
    ["no frontmatter", "title: Luz\n", /no frontmatter/],
    ["an unclosed block", "---\ntitle: Luz\n", /no frontmatter/],
    ["a repeated key", "---\ntitle: A\ntitle: B\n---\n", /invalid YAML/],
    ["broken YAML", "---\ntitle: [unclosed\n---\n", /invalid YAML/],
    ["a list instead of fields", "---\n- a\n- b\n---\n", /key: value/],
  ])("rejects %s", (_, source, message) => {
    expect(() => splitFrontmatter(source)).toThrow(FrontmatterError);
    expect(() => splitFrontmatter(source)).toThrow(message);
  });
});
