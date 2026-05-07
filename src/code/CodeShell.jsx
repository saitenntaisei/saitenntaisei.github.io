import React from "react";

export default function CodeShell({ children }) {
  return (
    <div className="min-h-screen bg-[#0d1117] text-[#c9d1d9] font-mono">
      <div className="max-w-4xl mx-auto">{children}</div>
    </div>
  );
}
