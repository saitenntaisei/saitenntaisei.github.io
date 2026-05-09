import React from "react";

export default function StickyHeader({ children }) {
  return (
    <div className="sticky top-0 z-30 bg-[#0d1117] font-mono text-[13px] leading-7">
      <div className="flex items-center px-4 pt-3 whitespace-nowrap overflow-x-auto">
        <span className="select-none text-[#6e7681] pr-3 text-right min-w-[2.5rem]">
          1
        </span>
        <span className="flex-1">{children}</span>
      </div>
    </div>
  );
}
