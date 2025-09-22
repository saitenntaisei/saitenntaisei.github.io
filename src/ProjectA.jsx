import React from "react";

export default function ProjectA() {
  return (
    <article className="w-full max-w-3xl my-6 overflow-hidden rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow">
      <div className="md:flex md:items-stretch md:h-80">
        <div className="md:w-6/12 h-64 md:h-80">
          <img
            src="material/vfd.jpg"
            alt="Screenshot of Project A"
            className="w-full h-full object-cover object-center"
          />
        </div>
        <div className="p-6 md:w-6/12 flex flex-col h-full overflow-hidden">
          <div className="flex-1 overflow-auto pr-1">
            <h2 className="text-2xl font-mono font-semibold text-black dark:text-slate-100">
              VFD Tube GPS Clock
            </h2>
            <p className="mt-3 text-black dark:text-slate-300 leading-7">
              VFD TUBE, RP2040. GPS Available. I will write detail description later...
            </p>
          </div>
          <div className="mt-4 md:mt-0 pt-4 flex flex-wrap items-center gap-3">
            <a
              className="inline-flex items-center gap-1 rounded-md px-3 py-1.5 text-sm font-medium text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-slate-700/40 hover:bg-emerald-100 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-300"
              href="https://github.com/saitenntaisei/project-a"
              target="_blank"
              rel="noreferrer"
            >
              Repo (Software)
              <img src="logo/oss.png" alt="Open Source Software" className="w-4 h-4" />
            </a>
            <a
              className="inline-flex items-center gap-1 rounded-md px-3 py-1.5 text-sm font-medium text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-slate-700/40 hover:bg-emerald-100 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-300"
              href="#"
              target="_blank"
              rel="noreferrer"
            >
              Repo (Hardware)
              <img src="logo/oshw.png" alt="Open Source Hardware" className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
