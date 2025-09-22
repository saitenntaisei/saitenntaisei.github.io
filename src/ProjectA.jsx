import React from "react";

export default function ProjectA() {
  return (
    <article className="w-full max-w-3xl my-6 overflow-hidden rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow">
      <div className="md:flex md:items-stretch">
        <div className="md:w-6/12 bg-black dark:bg-slate-900">
          <img
            src="material/vfd.jpg"
            alt="Screenshot of Project A"
            className="w-full h-64 md:h-full object-contain"
          />
        </div>
        <div className="p-6 md:w-6/12">
          <h2 className="text-2xl font-mono font-semibold text-black dark:text-slate-100">
            Project A — Example Title
          </h2>
          <p className="mt-3 text-black dark:text-slate-300 leading-7">
            Project A is a showcase example of a modern, user‑centric
            application focused on clarity, performance, and maintainability.
            The project demonstrates how to design a clean component
            architecture, handle state predictably, and compose accessible UI.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <a
              className="inline-flex items-center gap-1 rounded-md px-3 py-1.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              href="https://github.com/saitenntaisei/project-a"
              target="_blank"
              rel="noreferrer"
            >
              Repo
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path d="M12.293 2.293a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1-1.414 1.414L14 5.414V12a1 1 0 1 1-2 0V5.414L9.707 7.707A1 1 0 0 1 8.293 6.293l4-4z" />
                <path d="M3 9a1 1 0 0 1 1 1v5h12v-5a1 1 0 1 1 2 0v6a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-6a1 1 0 0 1 1-1z" />
              </svg>
            </a>
            <a
              className="inline-flex items-center gap-1 rounded-md px-3 py-1.5 text-sm font-medium text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-slate-700/40 hover:bg-blue-100 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
              href="https://example.com/project-a-demo"
              target="_blank"
              rel="noreferrer"
            >
              Live Demo
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path fillRule="evenodd" d="M12.293 2.293a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1-1.414 1.414L14 5.414 9.707 9.707a1 1 0 1 1-1.414-1.414L12.586 4 10.5 1.914a1 1 0 1 1 1.414-1.414l.379.379z" clipRule="evenodd" />
                <path d="M3 5a2 2 0 0 1 2-2h4a1 1 0 1 1 0 2H5v10h10v-4a1 1 0 1 1 2 0v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
