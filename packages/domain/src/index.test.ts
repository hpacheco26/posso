import { describe, expect, it } from "vitest";

import { DOMAIN_PACKAGE } from "./index";

describe("@posso/domain", () => {
  it("exposes its package name", () => {
    expect(DOMAIN_PACKAGE).toBe("@posso/domain");
  });
});
