import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Footer from "./Footer.jsx";

describe("Footer", () => {
  it("renders the copyright line", () => {
    render(<Footer />);
    expect(
      screen.getByText(/© 2026 @saitenntaisei\. All rights reserved\./)
    ).toBeInTheDocument();
  });

  it("renders three social links", () => {
    render(<Footer />);
    for (const label of [/X \/ Twitter/, /GitHub/, /Qiita/]) {
      expect(screen.getByRole("link", { name: label })).toBeInTheDocument();
    }
  });
});
