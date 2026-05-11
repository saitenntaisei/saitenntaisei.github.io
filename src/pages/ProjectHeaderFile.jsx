import React from "react";
import CodeShell from "../code/CodeShell.jsx";
import Line from "../code/Line.jsx";
import Token from "../code/Token.jsx";
import Footer from "../code/Footer.jsx";

export default function ProjectHeaderFile() {
  return (
    <CodeShell footer={<Footer />}>
      <div className="px-4 py-4">
        <Line n={1}>
          <Token kind="pp">#ifndef</Token>{" "}
          <Token kind="nm">PROJECT_HPP</Token>
        </Line>
        <Line n={2}>
          <Token kind="pp">#define</Token>{" "}
          <Token kind="nm">PROJECT_HPP</Token>
        </Line>
        <Line n={3} />
        <Line n={4}>
          <Token kind="pp">#include</Token>{" "}
          <Token kind="st">{"<string>"}</Token>
        </Line>
        <Line n={5}>
          <Token kind="pp">#include</Token>{" "}
          <Token kind="st">{"<variant>"}</Token>
        </Line>
        <Line n={6}>
          <Token kind="pp">#include</Token>{" "}
          <Token kind="st">{"<vector>"}</Token>
        </Line>
        <Line n={7} />

        <Line n={8}>
          <Token kind="kw">namespace</Token>{" "}
          <Token kind="ty">Project</Token>{" {"}
        </Line>
        <Line n={9} />

        <Line n={10}>
          <Token kind="kw">enum class</Token>{" "}
          <Token kind="ty">Hardware</Token>{" {"}
        </Line>
        <Line n={11}>{"  "}<Token kind="nm">VFD_TUBE</Token>,</Line>
        <Line n={12}>{"  "}<Token kind="nm">RP2040</Token>,</Line>
        <Line n={13}>{"  "}<Token kind="nm">GPS</Token>,</Line>
        <Line n={14}>{"  "}<Token kind="nm">NIXIE_TUBE</Token>,</Line>
        <Line n={15}>{"};"}</Line>
        <Line n={16} />

        <Line n={17}>
          <Token kind="kw">enum class</Token>{" "}
          <Token kind="ty">Lang</Token>{" {"}
        </Line>
        <Line n={18}>{"  "}<Token kind="nm">{"C++"}</Token>,</Line>
        <Line n={19}>{"  "}<Token kind="nm">Python</Token>,</Line>
        <Line n={20}>{"  "}<Token kind="nm">Matlab</Token>,</Line>
        <Line n={21}>{"  "}<Token kind="nm">Rust</Token>,</Line>
        <Line n={22}>{"  "}<Token kind="nm">Go</Token>,</Line>
        <Line n={23}>{"};"}</Line>
        <Line n={24} />

        <Line n={25}>
          <Token kind="kw">enum class</Token>{" "}
          <Token kind="ty">Tool</Token>{" {"}
        </Line>
        <Line n={26}>{"  "}<Token kind="nm">Kicad</Token>,</Line>
        <Line n={27}>{"  "}<Token kind="nm">Inventor</Token>,</Line>
        <Line n={28}>{"};"}</Line>
        <Line n={29} />

        <Line n={30}>
          <Token kind="kw">using</Token>{" "}
          <Token kind="ty">Skill</Token>{" = "}
          <Token kind="ty">std::variant</Token>{"<"}
          <Token kind="ty">Lang</Token>, <Token kind="ty">Tool</Token>
          {">;"}
        </Line>
        <Line n={31}>
          <Token kind="kw">using</Token>{" "}
          <Token kind="ty">StackItem</Token>{" = "}
          <Token kind="ty">std::variant</Token>{"<"}
          <Token kind="ty">Hardware</Token>, <Token kind="ty">Lang</Token>
          {">;"}
        </Line>
        <Line n={32} />

        <Line n={33}>
          <Token kind="kw">struct</Token>{" "}
          <Token kind="ty">PersonalProject</Token>{" {"}
        </Line>
        <Line n={34}>
          {"  "}<Token kind="ty">std::string</Token>{"            "}
          <Token kind="nm">title</Token>;
        </Line>
        <Line n={35}>
          {"  "}<Token kind="ty">std::vector</Token>{"<"}
          <Token kind="ty">StackItem</Token>{"> "}
          <Token kind="nm">stack</Token>;
        </Line>
        <Line n={36}>
          {"  "}<Token kind="ty">std::string</Token>{"            "}
          <Token kind="nm">software</Token>;{" "}
          <Token kind="cm">{"// repo URL"}</Token>
        </Line>
        <Line n={37}>
          {"  "}<Token kind="ty">std::string</Token>{"            "}
          <Token kind="nm">hardware</Token>;{" "}
          <Token kind="cm">{"// repo URL"}</Token>
        </Line>
        <Line n={38}>{"};"}</Line>
        <Line n={39} />

        <Line n={40}>
          {"} "}<Token kind="cm">{"// namespace Project"}</Token>
        </Line>
        <Line n={41} />
        <Line n={42}>
          <Token kind="kw">extern</Token>{" "}
          <Token kind="ty">Project::PersonalProject</Token>{" "}
          <a href="#/projects/nixie-clock" className="hover:underline">
            <Token kind="nm">nixie_clock</Token>
          </a>
          ;
        </Line>
        <Line n={43}>
          <Token kind="kw">extern</Token>{" "}
          <Token kind="ty">Project::PersonalProject</Token>{" "}
          <a href="#/projects/vfd-gps-clock" className="hover:underline">
            <Token kind="nm">vfd_gps_clock</Token>
          </a>
          ;
        </Line>
        <Line n={44} />
        <Line n={45}>
          <Token kind="pp">#endif</Token>{" "}
          <Token kind="cm">{"// PROJECT_HPP"}</Token>
        </Line>
      </div>
    </CodeShell>
  );
}
