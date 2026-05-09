import React from "react";
import StickyHeader from "./StickyHeader.jsx";
import Token from "./Token.jsx";

export default function HeaderBar() {
  return (
    <StickyHeader>
      <Token kind="pp">#include</Token>{" "}
      <a href="#L-projects" className="hover:underline">
        <Token kind="st">"projects.hpp"</Token>
      </a>
    </StickyHeader>
  );
}
