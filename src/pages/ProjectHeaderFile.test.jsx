import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ProjectHeaderFile from "./ProjectHeaderFile.jsx";

describe("ProjectHeaderFile", () => {
  it("renders the project.hpp file comment", () => {
    render(<ProjectHeaderFile />);
    expect(screen.getByText(/project\.hpp/)).toBeInTheDocument();
  });

  it("renders the Project namespace and PersonalProject struct", () => {
    render(<ProjectHeaderFile />);
    expect(screen.getByText(/^Project$/)).toBeInTheDocument();
    expect(screen.getByText(/^PersonalProject$/)).toBeInTheDocument();
  });

  it("lists every Hardware enum member", () => {
    render(<ProjectHeaderFile />);
    for (const member of ["VFD_TUBE", "RP2040", "GPS", "NIXIE_TUBE"]) {
      expect(screen.getByText(member)).toBeInTheDocument();
    }
  });
});
