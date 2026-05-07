import "./App.css";
import React, { useEffect, useState } from "react";
import { getRouteFromHash } from "./route.js";
import HomeFile from "./pages/HomeFile.jsx";
import VfdGpsClockFile from "./pages/VfdGpsClockFile.jsx";
import NixiedClockFile from "./pages/NixiedClockFile.jsx";

const PROJECT_PAGES = {
  "vfd-gps-clock": VfdGpsClockFile,
  "nixied-clock":  NixiedClockFile,
};

function ProjectByName({ slug }) {
  const Comp = PROJECT_PAGES[slug];
  return Comp ? <Comp /> : <HomeFile />;
}

export default function App() {
  const [route, setRoute] = useState(() => getRouteFromHash());

  useEffect(() => {
    const onHashChange = () => setRoute(getRouteFromHash());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  useEffect(() => {
    if (route.name === "home" && route.anchor) {
      const el = document.getElementById(route.anchor);
      if (el && typeof el.scrollIntoView === "function") {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [route]);

  if (route.name === "project") {
    return <ProjectByName slug={route.params.slug} />;
  }
  return <HomeFile />;
}
