import React from "react";
import StickyHeader from "./StickyHeader.jsx";
import Token from "./Token.jsx";

export default function HeaderBar() {
  return (
    <StickyHeader>
      <Token kind="pp">#include</Token>{" "}
      <a href="#/projects" className="hover:underline">
        <Token kind="st">"project.hpp"</Token>
      </a>
    </StickyHeader>
  );
}
