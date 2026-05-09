import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import HeaderBar from "./HeaderBar.jsx";

describe("HeaderBar", () => {

  it("renders the gutter line number 1", () => {
    render(<HeaderBar />);
    expect(screen.getByText("1")).toBeInTheDocument();
  });

  it("renders the projects void declaration as a link", () => {
    render(<HeaderBar />);
    const link = screen.getByRole("link", { name: /^projects$/ });
    expect(link).toHaveAttribute("href", "#L-projects");
  });
});
