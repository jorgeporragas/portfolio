import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { stringify } from "yaml";
import { ContentError, loadContent, selfRoles } from "./load";
import { SELF } from "./schema";

let root: string;

beforeEach(() => {
  root = mkdtempSync(path.join(tmpdir(), "content-"));
});
afterEach(() => {
  rmSync(root, { recursive: true, force: true });
});

function write(relative: string, contents: string) {
  const file = path.join(root, relative);
  mkdirSync(path.dirname(file), { recursive: true });
  writeFileSync(file, contents);
}

function mdx(fields: Record<string, unknown>, body = "Body.\n") {
  return `---\n${stringify(fields)}---\n${body}`;
}

const release = (overrides: Record<string, unknown> = {}) => ({
  title: "Luz / Nada",
  date: "2025-06-20",
  summary: "Two tracks, written and produced alone.",
  credits: [
    { person: SELF, role: "production" },
    { person: SELF, role: "mixing" },
  ],
  artist: "Slim",
  format: "single",
  cover: "/images/releases/luz-nada.jpg",
  playback: { type: "links" },
  links: [{ platform: "spotify", url: "https://open.spotify.com/album/x" }],
  ...overrides,
});

/** The problems loadContent reports, or [] when it loads. */
function problems(): string[] {
  try {
    loadContent(root);
    return [];
  } catch (error) {
    if (error instanceof ContentError) return error.problems;
    throw error;
  }
}

describe("loadContent", () => {
  it("treats missing collections as empty", () => {
    expect(loadContent(root)).toEqual({ releases: [], ads: [], projects: [], posts: [] });
  });

  it("loads a valid release with its slug, file and body", () => {
    write("public/images/releases/luz-nada.jpg", "");
    write("content/releases/luz-nada.mdx", mdx(release(), "How it was made.\n"));
    const [entry] = loadContent(root).releases;
    expect(entry.slug).toBe("luz-nada");
    expect(entry.file).toBe("content/releases/luz-nada.mdx");
    expect(entry.data.artist).toBe("Slim");
    expect(entry.body).toBe("How it was made.\n");
  });

  it("fills defaults for optional lists", () => {
    write("public/images/releases/luz-nada.jpg", "");
    const noLinks: Record<string, unknown> = release();
    delete noLinks.links;
    write("content/releases/luz-nada.mdx", mdx(noLinks));
    expect(loadContent(root).releases[0].data.links).toEqual([]);
  });

  it("sorts newest first", () => {
    write("public/images/releases/luz-nada.jpg", "");
    write("content/releases/old.mdx", mdx(release({ title: "Old", date: "2021-01-01" })));
    write("content/releases/new.mdx", mdx(release({ title: "New", date: "2025-01-01" })));
    expect(loadContent(root).releases.map((e) => e.slug)).toEqual(["new", "old"]);
  });

  it.each([
    ["a misspelled key", { artsit: "Slim" }, "content/releases/luz-nada.mdx: frontmatter: Unrecognized key"],
    ["a bad date", { date: "20/06/2025" }, "date: must be a date written YYYY-MM-DD"],
    ["an http link", { links: [{ platform: "spotify", url: "http://x.com" }] }, "links.0.url: must be an https:// URL"],
    ["an unknown role", { credits: [{ person: SELF, role: "vibes" }] }, "credits.0.role"],
    ["no credit for Jorge", { credits: [{ person: "Someone", role: "mixing" }] }, `credits: must credit ${SELF}`],
    ["an unknown playback", { playback: { type: "autoplay" } }, "playback"],
  ])("reports %s, naming the file and field", (_, overrides, expected) => {
    write("public/images/releases/luz-nada.jpg", "");
    write("content/releases/luz-nada.mdx", mdx(release(overrides)));
    expect(problems().join("\n")).toContain(expected);
  });

  it("reports a cover that does not exist", () => {
    write("content/releases/luz-nada.mdx", mdx(release()));
    expect(problems()).toEqual([
      "content/releases/luz-nada.mdx: /images/releases/luz-nada.jpg does not exist under public/",
    ]);
  });

  it("reports file names that cannot be URLs, and files that are not .mdx", () => {
    write("content/releases/Luz Nada.mdx", mdx(release()));
    write("content/releases/notes.md", "x");
    write("content/releases/.DS_Store", "x");
    expect(problems()).toEqual([
      "content/releases/Luz Nada.mdx: file name must be lowercase words joined by hyphens",
      "content/releases/notes.md: content files end in .mdx",
    ]);
  });

  it("reports a post that cites a work that does not exist", () => {
    write("content/posts/on-luz.mdx", mdx({
      title: "On Luz", date: "2025-07-01", summary: "Why it sounds that way.",
      works: ["releases/luz-nada"],
    }));
    expect(problems()).toEqual(["content/posts/on-luz.mdx: works: releases/luz-nada is not a content file"]);
  });

  it("reports every problem in every file at once", () => {
    write("content/releases/a.mdx", mdx(release({ date: "soon" })));
    write("content/releases/b.mdx", "no frontmatter");
    const found = problems();
    expect(found.some((p) => p.startsWith("content/releases/a.mdx: date"))).toBe(true);
    expect(found.some((p) => p.startsWith("content/releases/b.mdx: has no frontmatter"))).toBe(true);
  });
});

describe("a track on someone else's release", () => {
  const track = (overrides: Record<string, unknown> = {}) =>
    release({
      title: "hesperia",
      artist: "Noah Pino Palo",
      format: "track",
      appearsOn: { title: "clásico", format: "album" },
      ...overrides,
    });

  it("loads when it names the release it's on", () => {
    write("public/images/releases/luz-nada.jpg", "");
    write("content/releases/hesperia.mdx", mdx(track()));
    expect(loadContent(root).releases[0].data.appearsOn).toEqual({ title: "clásico", format: "album" });
  });

  it("reports a track that doesn't say what it's on", () => {
    write("public/images/releases/luz-nada.jpg", "");
    write("content/releases/hesperia.mdx", mdx(track({ appearsOn: undefined })));
    expect(problems()).toEqual([
      "content/releases/hesperia.mdx: appearsOn: a track names the release it's on",
    ]);
  });

  it("reports a single that claims to be on another release", () => {
    write("public/images/releases/luz-nada.jpg", "");
    write("content/releases/luz-nada.mdx", mdx(release({ appearsOn: { title: "x", format: "ep" } })));
    expect(problems()).toEqual([
      "content/releases/luz-nada.mdx: appearsOn: only a track is on another release",
    ]);
  });

  it("accepts the roles the credits use", () => {
    write("public/images/releases/luz-nada.jpg", "");
    const credits = ["co-production", "background-vocals", "bass", "guitar", "drums", "synthesizer", "programming", "arrangement"]
      .map((role) => ({ person: SELF, role }));
    write("content/releases/hesperia.mdx", mdx(track({ credits })));
    expect(problems()).toEqual([]);
  });
});

describe("selfRoles", () => {
  it("lists Jorge's roles once each, in the order written, ignoring other people", () => {
    expect(selfRoles([
      { person: SELF, role: "production" },
      { person: "Alfredo Savoy", role: "additional-production" },
      { person: SELF, role: "mixing" },
      { person: SELF, role: "production" },
    ])).toEqual(["production", "mixing"]);
  });
});
