import React from "react";
import StickyHeader from "./StickyHeader.jsx";
import Token from "./Token.jsx";

const ITEMS = ["history", "projects", "links"];

export default function HeaderBar() {
  return (
    <StickyHeader>
      {ITEMS.map((name) => (
        <span key={name} className="mr-3">
          <Token kind="kw">void</Token>{" "}
          <a href={`#L-${name}`} className="hover:underline">
            <Token kind="fn">{name}</Token>
          </a>
          <Token kind="default">();</Token>
        </span>
      ))}
    </StickyHeader>
  );
}
