import React from "react";
import CodeShell from "../code/CodeShell.jsx";
import HeaderBar from "../code/HeaderBar.jsx";
import Line from "../code/Line.jsx";
import Token from "../code/Token.jsx";
import Footer from "../code/Footer.jsx";

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
      <div className="px-4 pb-4">
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
          {"  "}<Token kind="ty">Status</Token>{"      "}
          <Token kind="nm">status</Token>{" = { "}
          <Token kind="st">"Tokyo Institute of Technology"</Token>{", "}
          <Token kind="ty">Grade</Token>{"::"}<Token kind="nm">M1</Token>
          {" };"}
        </Line>
        <Line n={9}>
          {"  "}<Token kind="ty">Affiliation</Token>{" "}
          <Token kind="nm">affiliations</Token>[] = {"{"}
        </Line>
        <Line n={10}>
          {"    "}<Token kind="st">"デジタル創作同好会 traP"</Token>,
        </Line>
        <Line n={11}>
          {"    "}<Token kind="st">"ロボット技術研究会 Rogy"</Token>,
        </Line>
        <Line n={12}>{"  "}{"};"}</Line>
        <Line n={13}>{"};"}</Line>
        <Line n={14} />

        <Line n={15}>
          <Token kind="kw">enum class</Token>{" "}
          <Token kind="ty">Skill</Token>{" { "}
          <Token kind="nm">Cpp</Token>, <Token kind="nm">Python</Token>,{" "}
          <Token kind="nm">Rust</Token>, <Token kind="nm">Go</Token>{" };"}
        </Line>
        <Line n={16} />

        <Line n={17}>
          <Token kind="kw">struct</Token>{" "}
          <Token kind="ty">Internship</Token>{" { "}
          <Token kind="ty">std::string</Token>{" "}
          <Token kind="nm">company</Token>;{" "}
          <Token kind="ty">std::string</Token>{" "}
          <Token kind="nm">period</Token>;{" };"}
        </Line>
        <Line n={18}>
          <Token kind="kw">static const</Token>{" "}
          <Token kind="ty">Internship</Token>{" "}
          <Token kind="nm">history</Token>[] = {"{"}
        </Line>
        {HISTORY.map((row, i) => (
          <Line key={row.company} n={19 + i}>
            {"  { "}
            <Token kind="st">{`"${row.company}"`}</Token>,{" "}
            <Token kind="st">{`"${row.period}"`}</Token>
            {" },"}
          </Line>
        ))}
        <Line n={24}>{"};"}</Line>
        <Line n={25} />

        {/* projects */}
        <Line n={26} id="L-projects">
          <Token kind="kw">void</Token>{" "}
          <Token kind="fn">projects</Token>(){" {"}
        </Line>
        <Line n={27}>
          {"  "}
          <a href="#/projects/vfd-gps-clock" className="hover:underline">
            <Token kind="fn">vfd_gps_clock</Token>
          </a>
          ();{" "}<Token kind="cm">{"// → detail"}</Token>
        </Line>
        <Line n={28}>
          {"  "}
          <a href="#/projects/nixied-clock" className="hover:underline">
            <Token kind="fn">nixied_clock</Token>
          </a>
          ();{" "}<Token kind="cm">{"// → detail"}</Token>
        </Line>
        <Line n={29}>{"}"}</Line>
      </div>
      <Footer />
    </CodeShell>
  );
}
