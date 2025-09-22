import React from "react";
import ProjectA from "./ProjectA.jsx";
import ProjectB from "./ProjectB.jsx";

function PersonalProject() {
  return (
    <div className="flex flex-col items-center py-10">
      <h1 className="text-black dark:text-slate-200 text-4xl font-mono font-semibold mb-6">
        Personal Projects
      </h1>
      <div className="max-w-3xl w-full px-6">
        <p className="text-black dark:text-slate-300 text-lg leading-7">
          Here are some of my personal projects. This section can feature
          descriptions, screenshots, and links to repositories or live demos.
        </p>
      </div>
      <div className="w-full flex flex-col items-center mt-4">
        <ProjectA />
        <ProjectB />
      </div>
    </div>
  );
}

export default PersonalProject;
