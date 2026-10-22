// Reads and validates everything under content/. Server-side only: it reads the filesystem at
// build time. Every problem in every file is collected and reported at once, so one build
// shows the whole list instead of one error per run.
import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import type { z } from "zod";
import { FrontmatterError, splitFrontmatter } from "./frontmatter";
import * as schema from "./schema";

export type Entry<T> = {
  /** The file name without .mdx; also the last segment of the page's URL. */
  slug: string;
  /** Path from the project root, for error messages. */
  file: string;
  data: T;
  body: string;
};

export type Content = {
  releases: Entry<schema.Release>[];
  ads: Entry<schema.Ad>[];
  projects: Entry<schema.Project>[];
  posts: Entry<schema.Post>[];
};

export class ContentError extends Error {
  constructor(readonly problems: string[]) {
    super(`content/ has ${problems.length} problem(s):\n${problems.map((p) => `- ${p}`).join("\n")}`);
    this.name = "ContentError";
  }
}

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function loadCollection<S extends z.ZodType>(
  root: string,
  name: keyof Content,
  shape: S,
  problems: string[],
): Entry<z.output<S>>[] {
  const dir = path.join(root, "content", name);
  // A collection with no files yet is empty, not an error.
  if (!existsSync(dir)) return [];
  const entries: Entry<z.output<S>>[] = [];
  for (const fileName of readdirSync(dir).sort()) {
    if (fileName.startsWith(".")) continue;
    const file = `content/${name}/${fileName}`;
    if (!fileName.endsWith(".mdx")) {
      problems.push(`${file}: content files end in .mdx`);
      continue;
    }
    const slug = fileName.slice(0, -".mdx".length);
    if (!SLUG.test(slug)) {
      problems.push(`${file}: file name must be lowercase words joined by hyphens`);
      continue;
    }
    let parsed;
    try {
      parsed = splitFrontmatter(readFileSync(path.join(dir, fileName), "utf8"));
    } catch (error) {
      if (!(error instanceof FrontmatterError)) throw error;
      problems.push(`${file}: ${error.message}`);
      continue;
    }
    const result = shape.safeParse(parsed.data);
    if (!result.success) {
      for (const issue of result.error.issues) {
        const where = issue.path.length ? issue.path.join(".") : "frontmatter";
        problems.push(`${file}: ${where}: ${issue.message}`);
      }
      continue;
    }
    entries.push({ slug, file, data: result.data, body: parsed.body });
  }
  return entries;
}

/** Every public/ path a work points at, which must exist or the page would show a broken image. */
function assetPaths(content: Content): [string, string][] {
  const paths: [string, string][] = [];
  for (const e of content.releases) paths.push([e.file, e.data.cover]);
  for (const e of content.ads) if (e.data.image) paths.push([e.file, e.data.image]);
  for (const e of content.projects) for (const s of e.data.screens) paths.push([e.file, s]);
  return paths;
}

function newestFirst<T extends { date: string; title: string }>(a: Entry<T>, b: Entry<T>) {
  return b.data.date.localeCompare(a.data.date) || a.data.title.localeCompare(b.data.title);
}

/** Loads and validates all content. Throws ContentError listing every problem found. */
export function loadContent(root: string = process.cwd()): Content {
  const problems: string[] = [];
  const content: Content = {
    releases: loadCollection(root, "releases", schema.release, problems),
    ads: loadCollection(root, "ads", schema.ad, problems),
    projects: loadCollection(root, "projects", schema.project, problems),
    posts: loadCollection(root, "posts", schema.post, problems),
  };

  for (const [file, asset] of assetPaths(content)) {
    if (!existsSync(path.join(root, "public", asset))) {
      problems.push(`${file}: ${asset} does not exist under public/`);
    }
  }

  const known = new Set(
    (["releases", "ads", "projects"] as const).flatMap((c) => content[c].map((e) => `${c}/${e.slug}`)),
  );
  for (const p of content.posts) {
    for (const ref of p.data.works) {
      if (!known.has(ref)) problems.push(`${p.file}: works: ${ref} is not a content file`);
    }
  }

  if (problems.length) throw new ContentError(problems);

  content.releases.sort(newestFirst);
  content.ads.sort(newestFirst);
  content.projects.sort(newestFirst);
  content.posts.sort(newestFirst);
  return content;
}

/** Jorge's roles on a work: the credits that name him, in the order written, without repeats. */
export function selfRoles(credits: schema.Credit[]): schema.Role[] {
  return [...new Set(credits.filter((c) => c.person === schema.SELF).map((c) => c.role))];
}
