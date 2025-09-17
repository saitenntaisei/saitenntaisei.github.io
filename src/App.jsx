import "./App.css";
import React, { useEffect, useState } from "react";
import PersonalProject from "./PersonalProject.jsx";
import Skills from "./Skills.jsx";

function Header() {
  return (
    <div className="shadow-md  flex justify-center w-full">
      <h1 className="text-black	 dark:text-slate-400 text-5xl	 font-mono	 m-7">
        <span>This is saiten's Portfolio</span>
      </h1>
    </div>
  );
}
function Section({ sectionTitle }) {
  return (
    <div>
      <h1 className="text-black  dark:text-slate-400  text-center text-4xl font-medium font-mono underline m-7 ">
        <span>{sectionTitle}</span>
      </h1>
    </div>
  );
}
function Itroduction() {
  return (
    <div className="flex justify-center flex-wrap">
      <div>
        <img
          className="object-contain w-64 h-64  relative rounded-full"
          src="/saiten.png"
          alt="icon"
        />
      </div>
      <div className="text-black dark:text-slate-400 text-2xl font-semibold font-mono text-left shadow-md border border-gray-200	 rounded mx-10">
        <ul className="list-disc list-inside m-5">
          <li>saiten</li>
          <li>
            Status
            <ul className="list-disc list-inside ml-7">
              <li>Tokyo Institute of Technology</li>
              <li>M1</li>
            </ul>
          </li>
          <li>
            Affiliation
            <ul className="list-disc list-inside ml-7">
              <li>デジタル創作同好会traP</li>
              <li>ロボット技術研究会Rogy </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
}

function WorkedList() {
  return (
    <div className="flex justify-center items-center">
      <div className="text-black dark:text-slate-400 text-2xl font-semibold font-mono text-left shadow-inner border	 rounded">
        <ul className="mx-20 my-7 list-disc list-inside">
          <li>pixiv 2022.4-2022.10</li>
          <li>DeNA 2023.9 (3 days)</li>
          <li>Wantedly 2023.9 (3 weeks)</li>
          <li>FixStars 2025.3 (3 weeks)</li>
          <li>M3 2025.8 (2 weeks)</li>
        </ul>
      </div>
    </div>
  );
}
function Links() {
  return (
    <div className="flex justify-center items-center space-x-10">
      <a href="https://twitter.com/sort_reverse">
        <img
          className="object-contain w-10 h-10  relative"
          src="/x.png"
          alt="Twitter"
        />
      </a>
      <a href="https://github.com/saitenntaisei">
        <img
          className="object-contain w-10 h-10  relative"
          src="/github.png"
          alt="github"
        />
      </a>
      <a href="https://qiita.com/saitenntaisei">
        <img
          className="object-contain w-10 h-10  relative"
          src="/qiita.png"
          alt="qiita"
        />
      </a>
    </div>
  );
}

function App() {
  const getRouteFromHash = () => {
    const hash = window.location.hash.replace(/^#\/?/, "");
    if (hash.startsWith("projects")) return "projects";
    return "home";
  };

  const [route, setRoute] = useState(getRouteFromHash());
  const [isMenuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onHashChange = () => setRoute(getRouteFromHash());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="App bg-white dark:bg-slate-800 min-h-screen h-fit relative">
      {/* Hamburger button */}
      <button
        aria-label="Open menu"
        className="fixed left-4 top-4 z-50 inline-flex items-center justify-center w-10 h-10 rounded-md border border-gray-300 dark:border-slate-600 bg-white/90 dark:bg-slate-800/90 text-gray-700 dark:text-slate-200 shadow hover:bg-white dark:hover:bg-slate-700 focus:outline-none"
        onClick={() => setMenuOpen((v) => !v)}
      >
        <span className="sr-only">Toggle menu</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
        </svg>
      </button>

      {/* Sidebar menu */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 transform transition-transform duration-200 ease-out bg-white dark:bg-slate-900 border-r border-gray-200 dark:border-slate-700 ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        role="dialog"
        aria-label="Main menu"
      >
        <div className="p-4 flex items-center justify-between border-b border-gray-200 dark:border-slate-700">
          <span className="text-lg font-mono font-semibold text-gray-800 dark:text-slate-200">
            Menu
          </span>
          <button
            aria-label="Close menu"
            className="inline-flex items-center justify-center w-8 h-8 rounded-md text-gray-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800"
            onClick={closeMenu}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        <nav className="p-2">
          <a
            href="#/home"
            onClick={closeMenu}
            className={`block px-4 py-3 rounded-md text-gray-800 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-800 ${
              route === "home" ? "font-semibold" : ""
            }`}
          >
            Home
          </a>
          <a
            href="#/projects"
            onClick={closeMenu}
            className={`block px-4 py-3 rounded-md text-gray-800 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-800 ${
              route === "projects" ? "font-semibold" : ""
            }`}
          >
            Personal Project
          </a>
        </nav>
      </div>

      {/* Page content */}
      <header className="">
        <Header />
      </header>
      {route === "projects" ? (
        <PersonalProject />
      ) : (
        <>
          <Section sectionTitle="About" />
          <Itroduction />
          <Section sectionTitle="Skills" />
          <Skills />
          <Section sectionTitle="Links" />
          <Links />
        </>
      )}
    </div>
  );
}

export default App;
