import React from "react";
import CodeShell from "../code/CodeShell.jsx";
import HeaderBar from "../code/HeaderBar.jsx";
import Line from "../code/Line.jsx";
import Token from "../code/Token.jsx";

const SKILL_LOGOS = [
  { label: "C++", src: "/logo/C++.png" },
  { label: "Python", src: "/logo/Python.png" },
  { label: "Rust", src: "/logo/Rust.png" },
  { label: "Go", src: "/logo/Golang.png" },
];

const HISTORY = [
  { company: "pixiv",    period: "2022.4 — 2022.10" },
  { company: "DeNA",     period: "2023.9 (3 days)"  },
  { company: "Wantedly", period: "2023.9 (3 weeks)" },
  { company: "FixStars", period: "2025.3 (3 weeks)" },
  { company: "M3",       period: "2025.8 (2 weeks)" },
];

export default function HomeFile() {
  return (
    <CodeShell>
      <HeaderBar />
      <div className="px-4 py-4">
        <Line n={2}><Token kind="cm">{"// portfolio.cpp"}</Token></Line>
        <Line n={3}><Token kind="pp">#pragma once</Token></Line>
        <Line n={4}>
          <Token kind="pp">#include</Token>{" "}
          <Token kind="st">{"<string>"}</Token>
        </Line>
        <Line n={5} />

        <Line n={6}>
          <Token kind="kw">struct</Token>{" "}
          <Token kind="ty">Profile</Token>{" {"}
        </Line>
        <Line n={7}>
          {"  "}<Token kind="ty">std::string</Token>{" "}
          <Token kind="nm">name</Token>{" = "}
          <Token kind="st">"saiten"</Token>;
        </Line>
        <Line n={8}>
          {"  "}<Token kind="ty">std::string</Token>{" "}
          <Token kind="nm">univ</Token>{" = "}
          <Token kind="st">"Tokyo Institute of Technology"</Token>;
        </Line>
        <Line n={9}>
          {"  "}<Token kind="ty">int</Token>{"         "}
          <Token kind="nm">grade</Token>{" = "}
          <Token kind="st">1</Token>;{" "}<Token kind="cm">{"// M1"}</Token>
        </Line>
        <Line n={10}>
          {"  "}<Token kind="ty">Affiliation</Token>{" "}
          <Token kind="nm">affiliations</Token>[] = {"{"}
        </Line>
        <Line n={11}>
          {"    "}<Token kind="st">"デジタル創作同好会 traP"</Token>,
        </Line>
        <Line n={12}>
          {"    "}<Token kind="st">"ロボット技術研究会 Rogy"</Token>,
        </Line>
        <Line n={13}>{"  "}{"};"}</Line>
        <Line n={14}>{"};"}</Line>
        <Line n={15} />

        <Line n={16}>
          <Token kind="kw">enum class</Token>{" "}
          <Token kind="ty">Skill</Token>{" { "}
          <Token kind="nm">Cpp</Token>, <Token kind="nm">Python</Token>,{" "}
          <Token kind="nm">Rust</Token>, <Token kind="nm">Go</Token>{" };"}
        </Line>
        <Line n={17} />

        <Line n={18}>
          <Token kind="kw">struct</Token>{" "}
          <Token kind="ty">Internship</Token>{" { "}
          <Token kind="ty">std::string</Token>{" "}
          <Token kind="nm">company</Token>;{" "}
          <Token kind="ty">std::string</Token>{" "}
          <Token kind="nm">period</Token>;{" };"}
        </Line>
        <Line n={19}>
          <Token kind="kw">static const</Token>{" "}
          <Token kind="ty">Internship</Token>{" "}
          <Token kind="nm">history</Token>[] = {"{"}
        </Line>
        {HISTORY.map((row, i) => (
          <Line key={row.company} n={20 + i}>
            {"  { "}
            <Token kind="st">{`"${row.company}"`}</Token>,{" "}
            <Token kind="st">{`"${row.period}"`}</Token>
            {" },"}
          </Line>
        ))}
        <Line n={25}>{"};"}</Line>
        <Line n={26} />

        {/* about */}
        <Line n={27} id="L-about">
          <Token kind="kw">void</Token>{" "}
          <Token kind="fn">about</Token>(){" {"}
        </Line>
        <Line n={28}>
          {"  "}<Token kind="ty">Profile</Token>{" "}
          <Token kind="nm">self</Token>;
        </Line>
        <Line n={29}>
          {"  "}<Token kind="cm">{"// (image: /saiten.png)"}</Token>
        </Line>
        <div className="pl-12 py-2">
          <img
            src="/saiten.png"
            alt="saiten"
            className="w-40 h-40 rounded-full object-cover"
          />
        </div>
        <Line n={30}>{"}"}</Line>
        <Line n={31} />

        {/* skills */}
        <Line n={32} id="L-skills">
          <Token kind="kw">void</Token>{" "}
          <Token kind="fn">skills</Token>(){" {"}
        </Line>
        <Line n={33}>
          {"  "}<Token kind="cm">{"// logos for enum class Skill"}</Token>
        </Line>
        <div className="pl-12 py-2 flex gap-4 flex-wrap">
          {SKILL_LOGOS.map((s) => (
            <img
              key={s.label}
              src={s.src}
              alt={`${s.label} logo`}
              className="w-20 h-20 object-contain"
              loading="lazy"
            />
          ))}
        </div>
        <Line n={34}>{"}"}</Line>
        <Line n={35} />

        {/* history */}
        <Line n={36} id="L-history">
          <Token kind="kw">void</Token>{" "}
          <Token kind="fn">history</Token>(){" {"}
        </Line>
        {HISTORY.map((row, i) => (
          <Line key={row.company} n={37 + i}>
            {"  "}
            <Token kind="cm">{`// ${row.company}: ${row.period}`}</Token>
          </Line>
        ))}
        <Line n={42}>{"}"}</Line>
        <Line n={43} />

        {/* projects */}
        <Line n={44} id="L-projects">
          <Token kind="kw">void</Token>{" "}
          <Token kind="fn">projects</Token>(){" {"}
        </Line>
        <Line n={45}>
          {"  "}
          <a href="#/projects/vfd-gps-clock" className="hover:underline">
            <Token kind="fn">vfd_gps_clock</Token>
          </a>
          ();{" "}<Token kind="cm">{"// → detail"}</Token>
        </Line>
        <Line n={46}>
          {"  "}
          <a href="#/projects/nixied-clock" className="hover:underline">
            <Token kind="fn">nixied_clock</Token>
          </a>
          ();{" "}<Token kind="cm">{"// → detail"}</Token>
        </Line>
        <Line n={47}>{"}"}</Line>
        <Line n={48} />

        {/* links */}
        <Line n={49} id="L-links">
          <Token kind="kw">void</Token>{" "}
          <Token kind="fn">links</Token>(){" {"}
        </Line>
        <Line n={50}>
          {"  "}<Token kind="fn">open</Token>(
          <a
            href="https://twitter.com/saitenntaisei"
            target="_blank"
            rel="noreferrer"
            className="hover:underline"
            aria-label="twitter"
          >
            <Token kind="st">"https://twitter.com/saitenntaisei"</Token>
          </a>
          );
        </Line>
        <Line n={51}>
          {"  "}<Token kind="fn">open</Token>(
          <a
            href="https://github.com/saitenntaisei"
            target="_blank"
            rel="noreferrer"
            className="hover:underline"
          >
            <Token kind="st">"https://github.com/saitenntaisei"</Token>
          </a>
          );
        </Line>
        <Line n={52}>
          {"  "}<Token kind="fn">open</Token>(
          <a
            href="https://qiita.com/saitenntaisei"
            target="_blank"
            rel="noreferrer"
            className="hover:underline"
            aria-label="qiita"
          >
            <Token kind="st">"https://qiita.com/saitenntaisei"</Token>
          </a>
          );
        </Line>
        <Line n={53}>{"}"}</Line>
      </div>
    </CodeShell>
  );
}
