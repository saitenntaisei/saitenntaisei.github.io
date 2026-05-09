import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import StickyHeader from "./StickyHeader.jsx";

describe("StickyHeader", () => {
  it("renders the gutter line number 1", () => {
    render(<StickyHeader>hello</StickyHeader>);
    expect(screen.getByText("1")).toBeInTheDocument();
  });

  it("renders the provided children inside line 1", () => {
    render(<StickyHeader>nav-content</StickyHeader>);
    expect(screen.getByText("nav-content")).toBeInTheDocument();
  });
});
