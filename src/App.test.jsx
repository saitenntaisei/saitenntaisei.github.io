import { render, screen } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import App from "./App.jsx";

describe("App", () => {
  beforeEach(() => {
    window.location.hash = "";
    window.dispatchEvent(new HashChangeEvent("hashchange"));
  });

  it("renders HomeFile by default with the projects #include link", () => {
    render(<App />);
    expect(
      screen.getByRole("link", { name: /projects\.hpp/ })
    ).toBeInTheDocument();
  });

  it("renders VfdGpsClockFile when hash points to it", async () => {
    render(<App />);
    window.location.hash = "#/projects/vfd-gps-clock";
    window.dispatchEvent(new HashChangeEvent("hashchange"));
    expect(await screen.findByText(/VFD Tube GPS Clock/)).toBeInTheDocument();
  });

  it("renders NixiedClockFile when hash points to it", async () => {
    render(<App />);
    window.location.hash = "#/projects/nixied-clock";
    window.dispatchEvent(new HashChangeEvent("hashchange"));
    expect(await screen.findByText(/Nixie Tube Clock/)).toBeInTheDocument();
  });

  it("provides L-projects anchor on the home page", () => {
    render(<App />);
    expect(document.getElementById("L-projects")).not.toBeNull();
  });

  it("legacy #/projects scrolls to the projects function on the home page", () => {
    render(<App />);
    window.location.hash = "#/projects";
    window.dispatchEvent(new HashChangeEvent("hashchange"));
    expect(document.getElementById("L-projects")).not.toBeNull();
  });
});
