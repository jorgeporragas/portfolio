// Deliberately broken to prove CI fails. Reverted in the next commit.
export const canary: number = "not a number"; // type error
export function untyped(x: any) { return x; } // lint error: no-explicit-any
