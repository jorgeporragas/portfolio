// Splits a content file into its YAML frontmatter and its body.
import { parse } from "yaml";

// Tolerates a byte-order mark and Windows line endings: files edited on Windows may carry
// either, and a frontmatter block the regex misses would read as "no frontmatter".
const BLOCK = /^\uFEFF?---\r?\n([\s\S]*?)\r?\n---[ \t]*(?:\r?\n|$)([\s\S]*)$/;

export class FrontmatterError extends Error {}

export function splitFrontmatter(source: string): { data: unknown; body: string } {
  const match = BLOCK.exec(source);
  if (!match) {
    throw new FrontmatterError("has no frontmatter: it must start with a --- block");
  }
  let data: unknown;
  try {
    // YAML 1.2 core schema: dates stay strings ("2026-10-01"), and a repeated key is an error.
    data = parse(match[1], { schema: "core", uniqueKeys: true });
  } catch (error) {
    throw new FrontmatterError(`has invalid YAML: ${(error as Error).message.split("\n")[0]}`);
  }
  if (data === null || typeof data !== "object" || Array.isArray(data)) {
    throw new FrontmatterError("frontmatter must be a set of key: value fields");
  }
  return { data, body: match[2].replace(/\r\n/g, "\n") };
}
