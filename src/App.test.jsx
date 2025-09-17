import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import App from "./App.jsx";

describe("App", () => {
  it("renders portfolio header", () => {
    render(<App />);
    expect(
      screen.getByText(/This is saiten's Portfolio/i)
    ).toBeInTheDocument();
  });

  it("navigates to Personal Project via hamburger menu", async () => {
    render(<App />);

    // Open the menu
    const openBtns = screen.getAllByRole("button", { name: /open menu/i });
    openBtns[0].click();

    // Click the Personal Project link
    const links = screen.getAllByRole("link", { name: /personal project/i });
    links[0].click();

    // Dispatch hashchange so the app updates route state
    window.dispatchEvent(new HashChangeEvent("hashchange"));

    // Expect the Personal Projects heading to be visible
    const headings = await screen.findAllByRole("heading", {
      name: /personal projects/i,
    });
    expect(headings.length).toBeGreaterThan(0);
  });
});
