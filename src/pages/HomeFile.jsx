import React from "react";
import CodeShell from "../code/CodeShell.jsx";
import HeaderBar from "../code/HeaderBar.jsx";
import Line from "../code/Line.jsx";
import Token from "../code/Token.jsx";
import Footer from "../code/Footer.jsx";

const HISTORY = [
  { company: "pixiv",    year: 2022, month: "April",     dur: { unit: "weeks", n: 26 } },
  { company: "DeNA",     year: 2023, month: "September", dur: { unit: "days",  n: 3  } },
  { company: "Wantedly", year: 2023, month: "September", dur: { unit: "weeks", n: 3  } },
  { company: "FixStars", year: 2025, month: "March",     dur: { unit: "weeks", n: 3  } },
  { company: "M3",       year: 2025, month: "August",    dur: { unit: "weeks", n: 2  } },
];

export default function HomeFile() {
  return (
    <CodeShell footer={<Footer />}>
      <HeaderBar />
      <div className="px-4 pb-4">
        <Line n={2}>
          <Token kind="pp">#include</Token>{" "}
          <Token kind="st">{"<chrono>"}</Token>
        </Line>
        <Line n={3}>
          <Token kind="pp">#include</Token>{" "}
          <Token kind="st">{"<iostream>"}</Token>
        </Line>
        <Line n={4}>
          <Token kind="pp">#include</Token>{" "}
          <Token kind="st">{"<string>"}</Token>
        </Line>
        <Line n={5}>
          <Token kind="pp">#include</Token>{" "}
          <Token kind="st">{"<vector>"}</Token>
        </Line>
        <Line n={6} />

        <Line n={7}>
          <Token kind="kw">struct</Token>{" "}
          <Token kind="ty">Profile</Token>{" {"}
        </Line>
        <Line n={8}>
          {"  "}<Token kind="ty">std::string</Token>{" "}
          <Token kind="nm">name</Token>{" = "}
          <Token kind="st">"saiten"</Token>;
        </Line>
        <Line n={9}>
          {"  "}<Token kind="ty">Status</Token>{"      "}
          <Token kind="nm">status</Token>{" = { "}
          <Token kind="st">"Tokyo Institute of Technology"</Token>{", "}
          <Token kind="ty">Grade</Token>{"::"}<Token kind="nm">M1</Token>
          {" };"}
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
          <Token kind="ty">std::vector</Token>{"<"}
          <Token kind="ty">Project::Skill</Token>{"> "}
          <Token kind="nm">skill</Token>{" = { "}
          <Token kind="ty">Lang</Token>::<Token kind="nm">{"C++"}</Token>,{" "}
          <Token kind="ty">Lang</Token>::<Token kind="nm">Python</Token>,{" "}
          <Token kind="ty">Lang</Token>::<Token kind="nm">Rust</Token>,{" "}
          <Token kind="ty">Lang</Token>::<Token kind="nm">Go</Token>,{" "}
          <Token kind="ty">Tool</Token>::<Token kind="nm">Kicad</Token>,{" "}
          <Token kind="ty">Tool</Token>::<Token kind="nm">Inventor</Token>
          {" };"}
        </Line>
        <Line n={17} />

        <Line n={18}>
          <Token kind="kw">struct</Token>{" "}
          <Token kind="ty">Internship</Token>{" {"}
        </Line>
        <Line n={19}>
          {"  "}<Token kind="ty">std::string</Token>{"             "}
          <Token kind="nm">company</Token>;
        </Line>
        <Line n={20}>
          {"  "}<Token kind="ty">std::chrono::year_month</Token>{" "}
          <Token kind="nm">start_date</Token>;
        </Line>
        <Line n={21}>
          {"  "}<Token kind="ty">std::chrono::days</Token>{"       "}
          <Token kind="nm">duration</Token>;
        </Line>
        <Line n={22}>{"};"}</Line>
        <Line n={23}>
          <Token kind="kw">constexpr</Token>{" "}
          <Token kind="ty">Internship</Token>{" "}
          <Token kind="nm">history</Token>[] = {"{"}
        </Line>
        {HISTORY.map((row, i) => (
          <Line key={row.company} n={24 + i}>
            {"  { "}
            <Token kind="st">{`"${row.company}"`}</Token>,{" "}
            <Token kind="ty">std::chrono::year</Token>{`{${row.year}}/`}
            <Token kind="ty">std::chrono::</Token><Token kind="nm">{row.month}</Token>,{" "}
            <Token kind="ty">{`std::chrono::${row.dur.unit}`}</Token>{`{${row.dur.n}}`}
            {" },"}
          </Line>
        ))}
        <Line n={29}>{"};"}</Line>
        <Line n={30} />

        {/* projects */}
        <Line n={31} id="L-projects">
          <Token kind="ty">std::vector</Token>{"<"}
          <Token kind="ty">Project::PersonalProject</Token>{"> "}
          <Token kind="nm">personalProjects</Token>{" = {"}
        </Line>
        <Line n={32}>
          {"  "}
          <a href="#/projects/nixied-clock" className="hover:underline">
            <Token kind="nm">nixied_clock</Token>
          </a>
          ,
        </Line>
        <Line n={33}>
          {"  "}
          <a href="#/projects/vfd-gps-clock" className="hover:underline">
            <Token kind="nm">vfd_gps_clock</Token>
          </a>
          ,
        </Line>
        <Line n={34}>{"};"}</Line>
        <Line n={35} />

        {/* main */}
        <Line n={36}>
          <Token kind="kw">void</Token>{" "}
          <Token kind="fn">main</Token>(){" {"}
        </Line>
        <Line n={37}>
          {"  "}<Token kind="ty">Profile</Token>{" "}
          <Token kind="nm">self</Token>;
        </Line>
        <Line n={38}>
          {"  "}<Token kind="ty">std::cout</Token>{" << "}
          <Token kind="nm">self</Token>{"             << "}
          <Token kind="st">{'"\\n"'}</Token>
        </Line>
        <Line n={39}>
          {"            << "}<Token kind="nm">skill</Token>
          {"            << "}<Token kind="st">{'"\\n"'}</Token>
        </Line>
        <Line n={40}>
          {"            << "}<Token kind="nm">history</Token>
          {"          << "}<Token kind="st">{'"\\n"'}</Token>
        </Line>
        <Line n={41}>
          {"            << "}<Token kind="nm">personalProjects</Token>;
        </Line>
        <Line n={42}>{"}"}</Line>
      </div>
    </CodeShell>
  );
}
