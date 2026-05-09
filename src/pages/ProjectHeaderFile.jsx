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
          <Token kind="st">{"<vector>"}</Token>
        </Line>
        <Line n={5} />

        <Line n={6}>
          <Token kind="kw">namespace</Token>{" "}
          <Token kind="ty">Project</Token>{" {"}
        </Line>
        <Line n={7} />

        <Line n={8}>
          <Token kind="kw">enum class</Token>{" "}
          <Token kind="ty">Hardware</Token>{" {"}
        </Line>
        <Line n={9}>{"  "}<Token kind="nm">VFD_TUBE</Token>,</Line>
        <Line n={10}>{"  "}<Token kind="nm">RP2040</Token>,</Line>
        <Line n={11}>{"  "}<Token kind="nm">GPS</Token>,</Line>
        <Line n={12}>{"  "}<Token kind="nm">NIXIE_TUBE</Token>,</Line>
        <Line n={13}>{"};"}</Line>
        <Line n={14} />

        <Line n={15}>
          <Token kind="kw">struct</Token>{" "}
          <Token kind="ty">PersonalProject</Token>{" {"}
        </Line>
        <Line n={16}>
          {"  "}<Token kind="ty">std::string</Token>{"           "}
          <Token kind="nm">title</Token>;
        </Line>
        <Line n={17}>
          {"  "}<Token kind="ty">std::vector</Token>{"<"}
          <Token kind="ty">Hardware</Token>{"> "}
          <Token kind="nm">stack</Token>;
        </Line>
        <Line n={18}>
          {"  "}<Token kind="ty">std::string</Token>{"           "}
          <Token kind="nm">software</Token>;{" "}
          <Token kind="cm">{"// repo URL"}</Token>
        </Line>
        <Line n={19}>
          {"  "}<Token kind="ty">std::string</Token>{"           "}
          <Token kind="nm">hardware</Token>;{" "}
          <Token kind="cm">{"// repo URL"}</Token>
        </Line>
        <Line n={20}>{"};"}</Line>
        <Line n={21} />

        <Line n={22}>
          {"} "}<Token kind="cm">{"// namespace Project"}</Token>
        </Line>
      </div>
    </CodeShell>
  );
}
