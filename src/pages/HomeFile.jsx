import React from "react";
import CodeShell from "../code/CodeShell.jsx";
import HeaderBar from "../code/HeaderBar.jsx";
import Line from "../code/Line.jsx";
import Token from "../code/Token.jsx";

const HISTORY = [
  { company: "pixiv",    period: "2022.4 — 2022.10" },
  { company: "DeNA",     period: "2023.9 (3 days)"  },
  { company: "Wantedly", period: "2023.9 (3 weeks)" },
  { company: "FixStars", period: "2025.3 (3 weeks)" },
  { company: "M3",       period: "2025.8 (2 weeks)" },
];

// ASCII rendering of public/saiten.png — kept here so the file's
// "header banner" feels like a real source-file header comment.
// Sized 44x9 (after blank-row trim) so the 7px×28px char cell renders
// the original square glyph at a ~1:1 visual aspect ratio.
const ASCII_ART = [
  " *              .::::::::...      :-",
  " *             :=:.. .....:--------.",
  " *           -----------+*:::---------:",
  " *                       +%",
  " *             ---------%@=---------.",
  " *                    :**=#-",
  " *                 .:++:  .=+=:.",
  " *             :----:.       .:-=--::",
  " *             .                   ..",
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

        <Line n={6}><Token kind="cm">/*</Token></Line>
        {ASCII_ART.map((row, i) => (
          <Line key={i} n={7 + i}>
            <Token kind="cm">{row}</Token>
          </Line>
        ))}
        <Line n={16}><Token kind="cm">{" */"}</Token></Line>
        <Line n={17} />

        <Line n={18}>
          <Token kind="kw">struct</Token>{" "}
          <Token kind="ty">Profile</Token>{" {"}
        </Line>
        <Line n={19}>
          {"  "}<Token kind="ty">std::string</Token>{" "}
          <Token kind="nm">name</Token>{" = "}
          <Token kind="st">"saiten"</Token>;
        </Line>
        <Line n={20}>
          {"  "}<Token kind="ty">Status</Token>{"      "}
          <Token kind="nm">status</Token>{" = { "}
          <Token kind="st">"Tokyo Institute of Technology"</Token>{", "}
          <Token kind="ty">Grade</Token>{"::"}<Token kind="nm">M1</Token>
          {" };"}
        </Line>
        <Line n={21}>
          {"  "}<Token kind="ty">Affiliation</Token>{" "}
          <Token kind="nm">affiliations</Token>[] = {"{"}
        </Line>
        <Line n={22}>
          {"    "}<Token kind="st">"デジタル創作同好会 traP"</Token>,
        </Line>
        <Line n={23}>
          {"    "}<Token kind="st">"ロボット技術研究会 Rogy"</Token>,
        </Line>
        <Line n={24}>{"  "}{"};"}</Line>
        <Line n={25}>{"};"}</Line>
        <Line n={26} />

        <Line n={27}>
          <Token kind="kw">enum class</Token>{" "}
          <Token kind="ty">Skill</Token>{" { "}
          <Token kind="nm">Cpp</Token>, <Token kind="nm">Python</Token>,{" "}
          <Token kind="nm">Rust</Token>, <Token kind="nm">Go</Token>{" };"}
        </Line>
        <Line n={28} />

        <Line n={29}>
          <Token kind="kw">struct</Token>{" "}
          <Token kind="ty">Internship</Token>{" { "}
          <Token kind="ty">std::string</Token>{" "}
          <Token kind="nm">company</Token>;{" "}
          <Token kind="ty">std::string</Token>{" "}
          <Token kind="nm">period</Token>;{" };"}
        </Line>
        <Line n={30}>
          <Token kind="kw">static const</Token>{" "}
          <Token kind="ty">Internship</Token>{" "}
          <Token kind="nm">history</Token>[] = {"{"}
        </Line>
        {HISTORY.map((row, i) => (
          <Line key={row.company} n={31 + i}>
            {"  { "}
            <Token kind="st">{`"${row.company}"`}</Token>,{" "}
            <Token kind="st">{`"${row.period}"`}</Token>
            {" },"}
          </Line>
        ))}
        <Line n={36}>{"};"}</Line>
        <Line n={37} />

        {/* about */}
        <Line n={38} id="L-about">
          <Token kind="kw">void</Token>{" "}
          <Token kind="fn">about</Token>(){" {"}
        </Line>
        <Line n={39}>
          {"  "}<Token kind="ty">Profile</Token>{" "}
          <Token kind="nm">self</Token>;
        </Line>
        <Line n={40}>{"}"}</Line>
        <Line n={41} />

        {/* history */}
        <Line n={42} id="L-history">
          <Token kind="kw">void</Token>{" "}
          <Token kind="fn">history</Token>(){" {"}
        </Line>
        {HISTORY.map((row, i) => (
          <Line key={row.company} n={43 + i}>
            {"  "}
            <Token kind="cm">{`// ${row.company}: ${row.period}`}</Token>
          </Line>
        ))}
        <Line n={48}>{"}"}</Line>
        <Line n={49} />

        {/* projects */}
        <Line n={50} id="L-projects">
          <Token kind="kw">void</Token>{" "}
          <Token kind="fn">projects</Token>(){" {"}
        </Line>
        <Line n={51}>
          {"  "}
          <a href="#/projects/vfd-gps-clock" className="hover:underline">
            <Token kind="fn">vfd_gps_clock</Token>
          </a>
          ();{" "}<Token kind="cm">{"// → detail"}</Token>
        </Line>
        <Line n={52}>
          {"  "}
          <a href="#/projects/nixied-clock" className="hover:underline">
            <Token kind="fn">nixied_clock</Token>
          </a>
          ();{" "}<Token kind="cm">{"// → detail"}</Token>
        </Line>
        <Line n={53}>{"}"}</Line>
        <Line n={54} />

        {/* links */}
        <Line n={55} id="L-links">
          <Token kind="kw">void</Token>{" "}
          <Token kind="fn">links</Token>(){" {"}
        </Line>
        <Line n={56}>
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
        <Line n={57}>
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
        <Line n={58}>
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
        <Line n={59}>{"}"}</Line>
      </div>
    </CodeShell>
  );
}
