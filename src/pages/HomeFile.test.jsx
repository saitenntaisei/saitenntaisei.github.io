import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import HomeFile from "./HomeFile.jsx";

describe("HomeFile", () => {
  it("renders the sticky header bar with three void links", () => {
    render(<HomeFile />);
    for (const name of ["history", "projects", "links"]) {
      expect(
        screen.getByRole("link", { name: new RegExp(`^${name}$`) })
      ).toHaveAttribute("href", `#L-${name}`);
    }
  });

  it("renders profile struct fields", () => {
    render(<HomeFile />);
    expect(screen.getAllByText(/saiten/).length).toBeGreaterThan(0);
    expect(screen.getByText(/Tokyo Institute of Technology/)).toBeInTheDocument();
    expect(screen.getByText(/traP/)).toBeInTheDocument();
    expect(screen.getByText(/Rogy/)).toBeInTheDocument();
  });

  it("provides scroll anchors for each header destination", () => {
    render(<HomeFile />);
    for (const id of ["L-history", "L-projects", "L-links"]) {
      expect(document.getElementById(id)).not.toBeNull();
    }
  });

  it("links to each project detail page", () => {
    render(<HomeFile />);
    expect(
      screen.getByRole("link", { name: /vfd_gps_clock/ })
    ).toHaveAttribute("href", "#/projects/vfd-gps-clock");
    expect(
      screen.getByRole("link", { name: /nixied_clock/ })
    ).toHaveAttribute("href", "#/projects/nixied-clock");
  });

  it("links to external profiles (twitter / github / qiita)", () => {
    render(<HomeFile />);
    expect(screen.getByRole("link", { name: /twitter/i })).toHaveAttribute(
      "href",
      "https://twitter.com/saitenntaisei"
    );
    expect(screen.getByRole("link", { name: /github\.com\/saitenntaisei/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /qiita/i })).toHaveAttribute(
      "href",
      "https://qiita.com/saitenntaisei"
    );
  });
});
