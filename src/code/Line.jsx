import React from "react";

export default function Line({ n, id, children }) {
  return (
    <div id={id} className="flex items-start font-mono text-[13px] leading-7">
      <span className="select-none text-[#6e7681] pr-3 text-right min-w-[2.5rem]">
        {n}
      </span>
      <span data-role="line-content" className="flex-1 whitespace-pre-wrap">
        {children}
      </span>
    </div>
  );
}
