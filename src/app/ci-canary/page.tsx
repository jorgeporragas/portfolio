// Deliberately broken to prove the build step fails on its own: lint and types pass, but
// prerendering throws. Removed in the next commit.
export default function CiCanary(): never {
  throw new Error("ci-canary: prerender failure on purpose");
}
