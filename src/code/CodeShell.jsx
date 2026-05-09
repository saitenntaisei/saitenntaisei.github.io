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

export default function CodeShell({ children, hero, footer }) {
  return (
    <div className="min-h-screen bg-[#0d1117] text-[#c9d1d9] font-mono">
      <div style={HAZARD_BG}>
        <div className="max-w-4xl mx-auto py-8">
          {hero}
          <div className="bg-[#0d1117] border border-[#30363d] rounded-lg">
            {children}
          </div>
        </div>
      </div>
      {footer}
    </div>
  );
}
