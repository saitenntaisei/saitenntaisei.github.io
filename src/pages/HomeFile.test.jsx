import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import HomeFile from "./HomeFile.jsx";

describe("HomeFile", () => {
  it("renders the sticky header bar with an #include linking to projects", () => {
    render(<HomeFile />);
    expect(
      screen.getByRole("link", { name: /projects\.hpp/ })
    ).toHaveAttribute("href", "#L-projects");
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
    for (const id of ["L-projects"]) {
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

  it("renders the footer with social links", () => {
    render(<HomeFile />);
    // The footer (rendered via <Footer />) carries the external profile
    // links now that void links() is gone from the file body.
    expect(screen.getByRole("link", { name: /X \/ Twitter/ })).toHaveAttribute(
      "href",
      "https://twitter.com/saitenntaisei"
    );
    expect(screen.getByRole("link", { name: /GitHub/ })).toHaveAttribute(
      "href",
      "https://github.com/saitenntaisei"
    );
    expect(screen.getByRole("link", { name: /Qiita/ })).toHaveAttribute(
      "href",
      "https://qiita.com/saitenntaisei"
    );
  });
});
