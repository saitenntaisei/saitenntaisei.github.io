"use client";

import Image from 'next/image';

function Header() {
  return (
    <div className="shadow-md  flex justify-center w-full">
      <h1 className="text-black dark:text-slate-400 text-5xl font-mono m-7">
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
        {/* Using next/image is optional for static export; plain img also works. */}
        <img
          className="object-contain w-64 h-64  relative rounded-full"
          src="/saiten.png"
          alt="icon"
        />
      </div>
      <div className="text-black dark:text-slate-400 text-2xl font-semibold font-mono text-left shadow-md border border-gray-200 rounded mx-10">
        <ul className="list-disc list-inside m-5">
          <li>saiten</li>
          <li>
            Status
            <ul className="list-disc list-inside ml-7">
              <li>Tokyo Institute of Technology</li>
              <li>B3</li>
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
      <div className="text-black dark:text-slate-400 text-2xl font-semibold font-mono text-left shadow-inner border\t rounded">
        <ul className="mx-20 my-7 list-disc list-inside">
          <li> pixiv 2022.4-2022.10</li>
          <li>DeNA 2023.9 (3 days)</li>
          <li>Wantedly 2023.9 (3 weeks)</li>
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

export default function Page() {
  return (
    <div className="bg-white dark:bg-slate-800 min-h-screen h-fit text-center">
      <header>
        <Header />
      </header>
      <Section sectionTitle="About" />
      <Itroduction />
      <Section sectionTitle="Works" />
      <WorkedList />
      <Section sectionTitle="Links" />
      <Links />
    </div>
  );
}

