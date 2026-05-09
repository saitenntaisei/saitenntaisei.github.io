import React from "react";
import Line from "./Line.jsx";
import Token from "./Token.jsx";

const SEPARATOR = "/" + "*".repeat(66) + "/";

export default function StickyHeader({ children }) {
  return (
    <div className="sticky top-0 z-30 bg-[#0d1117] font-mono text-[13px] leading-7">
      <div className="px-4 pt-3 whitespace-nowrap overflow-x-auto">
        <div className="flex items-center">
          <span className="select-none text-[#6e7681] pr-3 text-right min-w-[2.5rem]">
            1
          </span>
          <span className="flex-1">{children}</span>
        </div>
      </div>
      <div className="px-4 pb-3 overflow-x-auto">
        <Line n={2}>
          <Token kind="cm">{SEPARATOR}</Token>
        </Line>
      </div>
    </div>
  );
}
