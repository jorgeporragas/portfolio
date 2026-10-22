// The shape of every content file's frontmatter: docs/PRD.md › Domain model, as types.
// Objects are strict, so a misspelled key fails the build instead of being silently ignored.
import { z } from "zod";

/** The person the site is about. His roles on a work are the credits that name him. */
export const SELF = "Jorge Porragas";

/** Roles a credit can name. Adding one is a one-line change here. */
export const ROLES = [
  "production",
  "additional-production",
  "songwriting",
  "vocals",
  "recording",
  "mixing",
  "mastering",
  "sound-design",
  "composition",
  "design",
  "development",
] as const;

export const PLATFORMS = [
  "spotify",
  "apple-music",
  "tidal",
  "youtube",
  "soundcloud",
  "bandcamp",
  "github",
  "website",
] as const;

const httpsUrl = z.url({ protocol: /^https$/, error: "must be an https:// URL" });

/** A file under public/, written as the URL path it is served at: /images/releases/x.jpg. */
export const publicPath = z
  .string()
  .regex(/^\/(?!.*\.\.)[\w\-./]+$/, "must be a path under public/, starting with /");

const isoDate = z.iso.date({ error: "must be a date written YYYY-MM-DD" });

export const credit = z.strictObject({
  person: z.string().min(1),
  role: z.enum(ROLES),
});

export const link = z.strictObject({
  platform: z.enum(PLATFORMS),
  url: httpsUrl,
});

/** How a visitor hears or sees a piece: ADR-003. */
export const playback = z.discriminatedUnion("type", [
  z.strictObject({ type: z.literal("player"), src: httpsUrl }),
  z.strictObject({
    type: z.literal("embed"),
    platform: z.enum(["spotify", "apple-music", "youtube", "soundcloud", "bandcamp"]),
    url: httpsUrl,
  }),
  z.strictObject({ type: z.literal("links") }),
]);

/** Fields every work shares. */
const work = {
  title: z.string().min(1),
  date: isoDate,
  summary: z.string().min(1),
  credits: z
    .array(credit)
    .min(1)
    .refine((cs) => cs.some((c) => c.person === SELF), `must credit ${SELF} at least once`),
  links: z.array(link).default([]),
};

export const release = z.strictObject({
  ...work,
  artist: z.string().min(1),
  format: z.enum(["single", "ep", "album"]),
  cover: publicPath,
  playback,
});

export const ad = z.strictObject({
  ...work,
  brand: z.string().min(1),
  agency: z.string().min(1).optional(),
  medium: z.enum(["audio", "video"]),
  image: publicPath.optional(),
  playback,
});

export const project = z.strictObject({
  ...work,
  stack: z.array(z.string().min(1)).min(1),
  repository: httpsUrl.optional(),
  status: z.enum(["in-progress", "shipped", "archived"]),
  screens: z.array(publicPath).default([]),
});

/** A reference from a post to a work, as collection/slug: "releases/luz-nada". */
export const workRef = z
  .string()
  .regex(/^(releases|ads|projects)\/[a-z0-9]+(?:-[a-z0-9]+)*$/, "must be collection/slug");

export const post = z.strictObject({
  title: z.string().min(1),
  date: isoDate,
  summary: z.string().min(1),
  works: z.array(workRef).default([]),
});

export type Credit = z.infer<typeof credit>;
export type Release = z.infer<typeof release>;
export type Ad = z.infer<typeof ad>;
export type Project = z.infer<typeof project>;
export type Post = z.infer<typeof post>;
export type Role = (typeof ROLES)[number];
