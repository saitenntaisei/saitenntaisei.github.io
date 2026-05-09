import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Line from "./Line.jsx";

describe("Line", () => {
  it("renders the line number and content", () => {
    render(<Line n={6}>hello</Line>);
    expect(screen.getByText("6")).toBeInTheDocument();
    expect(screen.getByText("hello")).toBeInTheDocument();
  });

  it("attaches the id when provided", () => {
    render(<Line n={27} id="L-about">body</Line>);
    expect(document.getElementById("L-about")).not.toBeNull();
  });

  it("renders an empty content when no children", () => {
    const { container } = render(<Line n={5} />);
    expect(screen.getByText("5")).toBeInTheDocument();
    expect(container.querySelector('[data-role="line-content"]').textContent).toBe("");
  });
});
