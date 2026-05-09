import React from "react";

const HAZARD_BG = {
  background: `repeating-linear-gradient(
    45deg,
    #0d1117 0,
    #0d1117 16px,
    #161b22 16px,
    #161b22 32px
  )`,
};

export default function CodeShell({ children }) {
  return (
    <div className="min-h-screen text-[#c9d1d9] font-mono" style={HAZARD_BG}>
      <div className="max-w-4xl mx-auto bg-[#0d1117] min-h-screen border-x border-[#30363d]">
        {children}
      </div>
    </div>
  );
}
