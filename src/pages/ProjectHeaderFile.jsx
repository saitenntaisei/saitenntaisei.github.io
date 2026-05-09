import React from "react";
import CodeShell from "../code/CodeShell.jsx";
import Line from "../code/Line.jsx";
import Token from "../code/Token.jsx";
import Footer from "../code/Footer.jsx";

export default function ProjectHeaderFile() {
  return (
    <CodeShell footer={<Footer />}>
      <div className="px-4 py-4">
        <Line n={1}><Token kind="cm">{"// project.hpp"}</Token></Line>
        <Line n={2}><Token kind="pp">#pragma once</Token></Line>
        <Line n={3}>
          <Token kind="pp">#include</Token>{" "}
          <Token kind="st">{"<string>"}</Token>
        </Line>
        <Line n={4}>
          <Token kind="pp">#include</Token>{" "}
          <Token kind="st">{"<variant>"}</Token>
        </Line>
        <Line n={5}>
          <Token kind="pp">#include</Token>{" "}
          <Token kind="st">{"<vector>"}</Token>
        </Line>
        <Line n={6} />

        <Line n={7}>
          <Token kind="kw">namespace</Token>{" "}
          <Token kind="ty">Project</Token>{" {"}
        </Line>
        <Line n={8} />

        <Line n={9}>
          <Token kind="kw">enum class</Token>{" "}
          <Token kind="ty">Hardware</Token>{" {"}
        </Line>
        <Line n={10}>{"  "}<Token kind="nm">VFD_TUBE</Token>,</Line>
        <Line n={11}>{"  "}<Token kind="nm">RP2040</Token>,</Line>
        <Line n={12}>{"  "}<Token kind="nm">GPS</Token>,</Line>
        <Line n={13}>{"  "}<Token kind="nm">NIXIE_TUBE</Token>,</Line>
        <Line n={14}>{"};"}</Line>
        <Line n={15} />

        <Line n={16}>
          <Token kind="kw">enum class</Token>{" "}
          <Token kind="ty">Lang</Token>{" {"}
        </Line>
        <Line n={17}>{"  "}<Token kind="nm">{"C++"}</Token>,</Line>
        <Line n={18}>{"  "}<Token kind="nm">Rust</Token>,</Line>
        <Line n={19}>{"};"}</Line>
        <Line n={20} />

        <Line n={21}>
          <Token kind="kw">using</Token>{" "}
          <Token kind="ty">StackItem</Token>{" = "}
          <Token kind="ty">std::variant</Token>{"<"}
          <Token kind="ty">Hardware</Token>, <Token kind="ty">Lang</Token>
          {">;"}
        </Line>
        <Line n={22} />

        <Line n={23}>
          <Token kind="kw">struct</Token>{" "}
          <Token kind="ty">PersonalProject</Token>{" {"}
        </Line>
        <Line n={24}>
          {"  "}<Token kind="ty">std::string</Token>{"            "}
          <Token kind="nm">title</Token>;
        </Line>
        <Line n={25}>
          {"  "}<Token kind="ty">std::vector</Token>{"<"}
          <Token kind="ty">StackItem</Token>{"> "}
          <Token kind="nm">stack</Token>;
        </Line>
        <Line n={26}>
          {"  "}<Token kind="ty">std::string</Token>{"            "}
          <Token kind="nm">software</Token>;{" "}
          <Token kind="cm">{"// repo URL"}</Token>
        </Line>
        <Line n={27}>
          {"  "}<Token kind="ty">std::string</Token>{"            "}
          <Token kind="nm">hardware</Token>;{" "}
          <Token kind="cm">{"// repo URL"}</Token>
        </Line>
        <Line n={28}>{"};"}</Line>
        <Line n={29} />

        <Line n={30}>
          {"} "}<Token kind="cm">{"// namespace Project"}</Token>
        </Line>
      </div>
    </CodeShell>
  );
}
