import React, { useEffect, useRef, useState } from "react";

export default function NixiedClockPage() {
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
            Nixie Tube Clock
          </h2>
          <p className="mt-3 text-black dark:text-slate-300 leading-7">
           Nixie Tube, I will write detail description later...
           
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <a
              className="inline-flex items-center gap-1 rounded-md px-3 py-1.5 text-sm font-medium text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-slate-700/40 hover:bg-emerald-100 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-300"
              href="https://github.com/saitenntaisei/project-b"
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
