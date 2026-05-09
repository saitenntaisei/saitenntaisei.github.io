import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import NixieClockFile from "./NixieClockFile.jsx";

describe("NixieClockFile", () => {
  it("renders the project title and repo links", () => {
    render(<NixieClockFile />);
    expect(screen.getByText(/Nixie Tube Clock/)).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /nixiecontrol/ })
    ).toHaveAttribute("href", "https://github.com/saitenntaisei/nixiecontrol");
    expect(
      screen.getByRole("link", { name: /nixie9v/ })
    ).toHaveAttribute("href", "https://github.com/saitenntaisei/nixie9v");
  });

  it("renders the preview video", () => {
    const { container } = render(<NixieClockFile />);
    const video = container.querySelector("video");
    expect(video).not.toBeNull();
    expect(video.querySelector("source")?.src ?? video.src).toMatch(/nixie\.mp4$/);
  });
});
