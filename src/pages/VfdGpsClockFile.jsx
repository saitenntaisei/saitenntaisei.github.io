import React from "react";
import CodeShell from "../code/CodeShell.jsx";
import StickyHeader from "../code/StickyHeader.jsx";
import Line from "../code/Line.jsx";
import Token from "../code/Token.jsx";

export default function VfdGpsClockFile() {
  return (
    <CodeShell>
      <StickyHeader>
        <Token kind="kw">void</Token>{" "}
        <a href="#/home" className="hover:underline">
          <Token kind="fn">back_to_home</Token>
        </a>
        ();
      </StickyHeader>
      <div className="px-4 py-4">
        <Line n={3}><Token kind="cm">{"// vfd_gps_clock.cpp"}</Token></Line>
        <Line n={4} />
        <Line n={5}>
          <Token kind="kw">struct</Token>{" "}
          <Token kind="ty">Project</Token>{" {"}
        </Line>
        <Line n={6}>
          {"  "}<Token kind="ty">std::string</Token>{" "}
          <Token kind="nm">title</Token>{" = "}
          <Token kind="st">"VFD Tube GPS Clock"</Token>;
        </Line>
        <Line n={7}>
          {"  "}<Token kind="ty">std::string</Token>{" "}
          <Token kind="nm">stack</Token>{" = "}
          <Token kind="st">"VFD TUBE, RP2040, GPS"</Token>;
        </Line>
        <Line n={8}>
          {"  "}<Token kind="cm">{"// I will write detail description later..."}</Token>
        </Line>
        <Line n={9}>{"};"}</Line>
        <Line n={10} />

        <div className="pl-12 py-2">
          <img
            src="/material/vfd.jpg"
            alt="VFD Tube GPS Clock"
            className="w-full max-w-xl rounded-lg border border-[#30363d]"
          />
        </div>

        <Line n={11}>
          <Token kind="kw">void</Token>{" "}
          <Token kind="fn">repos</Token>(){" {"}
        </Line>
        <Line n={12}>
          {"  "}<Token kind="fn">open</Token>(
          <a
            href="https://github.com/saitenntaisei/gps-clock"
            target="_blank"
            rel="noreferrer"
            className="hover:underline"
          >
            <Token kind="st">"https://github.com/saitenntaisei/gps-clock"</Token>
          </a>
          );{" "}<Token kind="cm">{"// software"}</Token>
        </Line>
        <Line n={13}>
          {"  "}<Token kind="fn">open</Token>(
          <a
            href="https://github.com/saitenntaisei/gps-clock-pcb"
            target="_blank"
            rel="noreferrer"
            className="hover:underline"
          >
            <Token kind="st">"https://github.com/saitenntaisei/gps-clock-pcb"</Token>
          </a>
          );{" "}<Token kind="cm">{"// hardware"}</Token>
        </Line>
        <Line n={14}>{"}"}</Line>
      </div>
    </CodeShell>
  );
}
