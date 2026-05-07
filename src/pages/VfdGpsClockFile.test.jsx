import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import VfdGpsClockFile from "./VfdGpsClockFile.jsx";

describe("VfdGpsClockFile", () => {
  it("renders a back-to-home link", () => {
    render(<VfdGpsClockFile />);
    expect(
      screen.getByRole("link", { name: /back_to_home/ })
    ).toHaveAttribute("href", "#/home");
  });

  it("renders the project title and key links", () => {
    render(<VfdGpsClockFile />);
    expect(screen.getByText(/VFD Tube GPS Clock/)).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /gps-clock(?!-pcb)/ })
    ).toHaveAttribute("href", "https://github.com/saitenntaisei/gps-clock");
    expect(
      screen.getByRole("link", { name: /gps-clock-pcb/ })
    ).toHaveAttribute("href", "https://github.com/saitenntaisei/gps-clock-pcb");
  });

  it("renders the preview image", () => {
    render(<VfdGpsClockFile />);
    expect(screen.getByAltText(/VFD Tube GPS Clock/i)).toHaveAttribute(
      "src",
      "/material/vfd.jpg"
    );
  });
});
