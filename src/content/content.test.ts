// Validates the real content/ folder, so a broken content file fails CI before its preview.
import { expect, it } from "vitest";
import { loadContent } from "./load";

it("every file in content/ is valid", () => {
  expect(() => loadContent()).not.toThrow();
});
