import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Token from "./Token.jsx";
import { TOKEN_CLASS } from "./tokens.js";

describe("Token", () => {
  it("renders children with the keyword color class", () => {
    render(<Token kind="kw">struct</Token>);
    const el = screen.getByText("struct");
    expect(el).toHaveClass(TOKEN_CLASS.kw);
  });

  it.each([
    ["ty", "Profile"],
    ["fn", "about"],
    ["st", '"saiten"'],
    ["cm", "// hello"],
    ["nm", "name"],
    ["pp", "#include"],
  ])("applies %s color class", (kind, text) => {
    render(<Token kind={kind}>{text}</Token>);
    expect(screen.getByText(text)).toHaveClass(TOKEN_CLASS[kind]);
  });

  it("falls back to default class for unknown kind", () => {
    render(<Token kind="???">x</Token>);
    expect(screen.getByText("x")).toHaveClass(TOKEN_CLASS.default);
  });
});
