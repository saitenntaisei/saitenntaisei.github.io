import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import HeaderBar from "./HeaderBar.jsx";

describe("HeaderBar", () => {

  it("renders the gutter line number 1", () => {
    render(<HeaderBar />);
    expect(screen.getByText("1")).toBeInTheDocument();
  });

  it("renders an #include directive linking to the projects anchor", () => {
    render(<HeaderBar />);
    const link = screen.getByRole("link", { name: /project\.hpp/ });
    expect(link).toHaveAttribute("href", "#L-projects");
  });
});
