import React, { useEffect, useRef, useState } from "react";

export default function ProjectB() {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);

  useEffect(() => {
    function measure() {
      if (containerRef.current) {
        const w = containerRef.current.clientWidth;
        setContainerWidth(w);
        // If we know intrinsic video size, compute rotated height
        const v = videoRef.current;
        if (v && v.videoWidth && v.videoHeight) {
          const rotatedHeight = w * (v.videoWidth / v.videoHeight);
          setContainerHeight(rotatedHeight);
        }
      }
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  function handleLoadedMetadata() {
    // Recompute container height when metadata is ready
    const v = videoRef.current;
    const w = containerRef.current?.clientWidth || 0;
    if (v && v.videoWidth && v.videoHeight && w) {
      setContainerHeight(w * (v.videoWidth / v.videoHeight));
    }
  }

  return (
    <article className="w-full max-w-3xl my-6 overflow-hidden rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow">
      <div className="flex flex-col">
        <div
          ref={containerRef}
          className="relative w-full"
          style={{ height: containerHeight ? `${containerHeight}px` : undefined }}
        >
          <video
            ref={videoRef}
            src="material/nixie.mp4"
            title="Preview of Project B"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-90"
            style={{ height: containerWidth ? `${containerWidth}px` : undefined, width: "auto" }}
            autoPlay
            loop
            muted
            playsInline
            onLoadedMetadata={handleLoadedMetadata}
          />
        </div>
        <div className="p-6 w-full">
          <h2 className="text-2xl font-mono font-semibold text-black dark:text-slate-100">
            Project B — Example Title
          </h2>
          <p className="mt-3 text-black dark:text-slate-300 leading-7">
            Project B explores a data‑driven workflow that turns small,
            composable utilities into a smooth end‑to‑end experience. The
            example integrates lightweight caching, optimistic UI updates, and
            clear loading/error states, so users always understand what the
            app is doing. On the implementation side, it favors predictable
           
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <a
              className="inline-flex items-center gap-1 rounded-md px-3 py-1.5 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              href="https://github.com/saitenntaisei/project-b"
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
              className="inline-flex items-center gap-1 rounded-md px-3 py-1.5 text-sm font-medium text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-slate-700/40 hover:bg-emerald-100 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-300"
              href="https://example.com/project-b-demo"
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
