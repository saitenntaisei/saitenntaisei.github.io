import { describe, it, expect } from "vitest";
import { getRouteFromHash } from "./route.js";

describe("getRouteFromHash", () => {
  const cases = [
    { hash: "",                            expect: { name: "home",    params: {},                          anchor: null     } },
    { hash: "#/",                          expect: { name: "home",    params: {},                          anchor: null     } },
    { hash: "#/home",                      expect: { name: "home",    params: {},                          anchor: null     } },
    { hash: "#/projects",                  expect: { name: "project_header", params: {},                   anchor: null     } },
    { hash: "#/projects/vfd-gps-clock",    expect: { name: "project", params: { slug: "vfd-gps-clock" },   anchor: null     } },
    { hash: "#/projects/nixie-clock",      expect: { name: "project", params: { slug: "nixie-clock" },     anchor: null     } },
    { hash: "#L-about",                    expect: { name: "home",    params: {},                          anchor: "L-about" } },
    { hash: "#/garbage",                   expect: { name: "home",    params: {},                          anchor: null     } },
  ];
  it.each(cases)("parses $hash", ({ hash, expect: e }) => {
    expect(getRouteFromHash(hash)).toEqual(e);
  });
});
