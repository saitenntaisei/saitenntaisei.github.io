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
      screen.getByRole("link", { name: /project\.hpp/ })
    ).toBeInTheDocument();
  });

  it("renders VfdGpsClockFile when hash points to it", async () => {
    render(<App />);
    window.location.hash = "#/projects/vfd-gps-clock";
    window.dispatchEvent(new HashChangeEvent("hashchange"));
    expect(await screen.findByText(/VFD Tube GPS Clock/)).toBeInTheDocument();
  });

  it("renders NixieClockFile when hash points to it", async () => {
    render(<App />);
    window.location.hash = "#/projects/nixie-clock";
    window.dispatchEvent(new HashChangeEvent("hashchange"));
    expect(await screen.findByText(/Nixie Tube Clock/)).toBeInTheDocument();
  });

  it("falls back to HomeFile when an unknown project slug is given", () => {
    window.location.hash = "#/projects/does-not-exist";
    render(<App />);
    expect(
      screen.getByRole("link", { name: /project\.hpp/ })
    ).toBeInTheDocument();
  });

  it("renders ProjectHeaderFile when hash is #/projects", async () => {
    render(<App />);
    window.location.hash = "#/projects";
    window.dispatchEvent(new HashChangeEvent("hashchange"));
    expect(await screen.findByText(/^namespace$/)).toBeInTheDocument();
  });
});
