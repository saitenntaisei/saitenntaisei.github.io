import React from "react";
import Token from "./Token.jsx";

const ITEMS = ["about", "skills", "history", "projects", "links"];

export default function HeaderBar() {
  return (
    <div className="sticky top-0 z-30 bg-[#161b22] border-b border-[#30363d] font-mono text-[13px] leading-7 whitespace-nowrap overflow-x-auto">
      <div className="flex items-center px-4 py-3">
        <span className="select-none text-[#6e7681] pr-3 text-right min-w-[2.5rem]">
          1
        </span>
        <span className="flex-1">
          {ITEMS.map((name) => (
            <span key={name} className="mr-3">
              <Token kind="kw">void</Token>{" "}
              <a href={`#L-${name}`} className="hover:underline">
                <Token kind="fn">{name}</Token>
              </a>
              <Token kind="default">();</Token>
            </span>
          ))}
        </span>
      </div>
    </div>
  );
}
