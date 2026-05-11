import React from "react";
import CodeShell from "../code/CodeShell.jsx";
import Line from "../code/Line.jsx";
import Token from "../code/Token.jsx";
import Footer from "../code/Footer.jsx";

export default function NixieClockFile() {
  return (
    <CodeShell
      footer={<Footer />}
      hero={
        <div className="px-4 pb-6 flex justify-center">
          <div className="relative w-72 h-96 sm:w-96 sm:h-[32rem]">
            <video
              src="/material/nixie.mp4"
              aria-label="Nixie tube clock demo"
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-90 h-full max-w-none rounded-lg border border-[#30363d]"
              autoPlay
              loop
              muted
              playsInline
            />
          </div>
        </div>
      }
    >
      <div className="px-4 py-4">
        <Line n={1}>
          <Token kind="ty">PersonalProject</Token>{" "}
          <Token kind="nm">nixie_clock</Token>{" = {};"}
        </Line>
        <Line n={2}>
          <Token kind="nm">nixie_clock</Token>.<Token kind="nm">title</Token>
          {"    = "}
          <Token kind="st">"Nixie Tube Clock"</Token>;
        </Line>
        <Line n={3}>
          <Token kind="nm">nixie_clock</Token>.<Token kind="nm">stack</Token>
          {"    = {"}
          <Token kind="ty">Hardware</Token>::<Token kind="nm">NIXIE_TUBE</Token>{", "}
          <Token kind="ty">Lang</Token>::<Token kind="nm">{"C++"}</Token>
          {"};"}
        </Line>
        <Line n={4}>
          <Token kind="nm">nixie_clock</Token>.<Token kind="nm">software</Token>
          {" = "}
          <a
            href="https://github.com/saitenntaisei/nixiecontrol"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            <Token kind="st">"https://github.com/saitenntaisei/nixiecontrol"</Token>
          </a>
          ;
        </Line>
        <Line n={5}>
          <Token kind="nm">nixie_clock</Token>.<Token kind="nm">hardware</Token>
          {" = "}
          <a
            href="https://github.com/saitenntaisei/nixie9v"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            <Token kind="st">"https://github.com/saitenntaisei/nixie9v"</Token>
          </a>
          ;
        </Line>
      </div>
    </CodeShell>
  );
}
