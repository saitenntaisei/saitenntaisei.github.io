import React from "react";
import VFDGPSClockPage from "./Projects/VFDGPSClockPage.jsx";
import NixiedClockPage from "./Projects/NixiedClockPage.jsx";

function PersonalProject() {
  return (
    <div className="flex flex-col items-center py-10">
      <h1 className="text-black dark:text-slate-200 text-4xl font-mono font-semibold mb-6">
        Personal Projects
      </h1>
      <div className="w-full flex flex-col items-center mt-4">
        <VFDGPSClockPage />
        <NixiedClockPage />
      </div>
    </div>
  );
}

export default PersonalProject;
