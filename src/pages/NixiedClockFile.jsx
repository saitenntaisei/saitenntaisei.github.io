import React from "react";
import CodeShell from "../code/CodeShell.jsx";
import StickyHeader from "../code/StickyHeader.jsx";
import Line from "../code/Line.jsx";
import Token from "../code/Token.jsx";

export default function NixiedClockFile() {
  return (
    <CodeShell>
      <StickyHeader>
        <Token kind="kw">void</Token>{" "}
        <a href="#/home" className="hover:underline">
          <Token kind="fn">back_to_home</Token>
        </a>
        ();
      </StickyHeader>
      <div className="px-4 pb-4">
        <Line n={2}><Token kind="cm">{"// nixied_clock.cpp"}</Token></Line>
        <Line n={3} />
        <Line n={4}>
          <Token kind="kw">struct</Token>{" "}
          <Token kind="ty">Project</Token>{" {"}
        </Line>
        <Line n={5}>
          {"  "}<Token kind="ty">std::string</Token>{" "}
          <Token kind="nm">title</Token>{" = "}
          <Token kind="st">"Nixie Tube Clock"</Token>;
        </Line>
        <Line n={6}>
          {"  "}<Token kind="ty">std::string</Token>{" "}
          <Token kind="nm">stack</Token>{" = "}
          <Token kind="st">"Nixie Tube"</Token>;
        </Line>
        <Line n={7}>
          {"  "}<Token kind="cm">{"// I will write detail description later..."}</Token>
        </Line>
        <Line n={8}>{"};"}</Line>
        <Line n={9} />

        <div className="pl-12 py-2">
          <video
            src="/material/nixie.mp4"
            className="w-full max-w-md rounded-lg border border-[#30363d]"
            autoPlay
            loop
            muted
            playsInline
          />
        </div>

        <Line n={10}>
          <Token kind="kw">void</Token>{" "}
          <Token kind="fn">repos</Token>(){" {"}
        </Line>
        <Line n={11}>
          {"  "}<Token kind="fn">open</Token>(
          <a
            href="https://github.com/saitenntaisei/nixiecontrol"
            target="_blank"
            rel="noreferrer"
            className="hover:underline"
          >
            <Token kind="st">"https://github.com/saitenntaisei/nixiecontrol"</Token>
          </a>
          );{" "}<Token kind="cm">{"// software"}</Token>
        </Line>
        <Line n={12}>
          {"  "}<Token kind="fn">open</Token>(
          <a
            href="https://github.com/saitenntaisei/nixie9v"
            target="_blank"
            rel="noreferrer"
            className="hover:underline"
          >
            <Token kind="st">"https://github.com/saitenntaisei/nixie9v"</Token>
          </a>
          );{" "}<Token kind="cm">{"// hardware"}</Token>
        </Line>
        <Line n={13}>{"}"}</Line>
      </div>
    </CodeShell>
  );
}
