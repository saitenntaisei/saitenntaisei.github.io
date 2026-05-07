import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import HeaderBar from "./HeaderBar.jsx";

describe("HeaderBar", () => {

  it("renders the gutter line number 1", () => {
    render(<HeaderBar />);
    expect(screen.getByText("1")).toBeInTheDocument();
  });

  it("renders all five void declarations as links", () => {
    render(<HeaderBar />);
    const labels = ["about", "skills", "history", "projects", "links"];
    for (const label of labels) {
      const link = screen.getByRole("link", { name: new RegExp(`^${label}$`) });
      expect(link).toHaveAttribute("href", `#L-${label}`);
    }
  });

  it("renders an anchor href that points to L-about", () => {
    // jsdom does not implement navigation on link click, so we verify the
    // anchor href instead. The browser handles the hash update natively.
    render(<HeaderBar />);
    const aboutLink = screen.getByRole("link", { name: /^about$/ });
    expect(aboutLink).toHaveAttribute("href", "#L-about");
  });
});
