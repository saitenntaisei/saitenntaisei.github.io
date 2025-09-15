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
});
