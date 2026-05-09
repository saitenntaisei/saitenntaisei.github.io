import React from "react";
import CodeShell from "../code/CodeShell.jsx";
import Line from "../code/Line.jsx";
import Token from "../code/Token.jsx";
import Footer from "../code/Footer.jsx";

export default function NixiedClockFile() {
  return (
    <CodeShell
      footer={<Footer />}
      hero={
        <div className="px-4 py-6 flex justify-center">
          <video
            src="/material/nixie.mp4"
            className="w-full max-w-md rounded-lg border border-[#30363d]"
            autoPlay
            loop
            muted
            playsInline
          />
        </div>
      }
    >
      <div className="px-4 py-4">
        <Line n={1}>
          <Token kind="ty">PersonalProject</Token>{" "}
          <Token kind="nm">nixied_clock</Token>{" = {};"}
        </Line>
        <Line n={2}>
          <Token kind="nm">nixied_clock</Token>.<Token kind="nm">title</Token>
          {"    = "}
          <Token kind="st">"Nixie Tube Clock"</Token>;
        </Line>
        <Line n={3}>
          <Token kind="nm">nixied_clock</Token>.<Token kind="nm">stack</Token>
          {"    = "}
          <Token kind="st">"Nixie Tube"</Token>;
        </Line>
        <Line n={4}>
          <Token kind="nm">nixied_clock</Token>.<Token kind="nm">software</Token>
          {" = "}
          <a
            href="https://github.com/saitenntaisei/nixiecontrol"
            target="_blank"
            rel="noreferrer"
            className="hover:underline"
          >
            <Token kind="st">"https://github.com/saitenntaisei/nixiecontrol"</Token>
          </a>
          ;
        </Line>
        <Line n={5}>
          <Token kind="nm">nixied_clock</Token>.<Token kind="nm">hardware</Token>
          {" = "}
          <a
            href="https://github.com/saitenntaisei/nixie9v"
            target="_blank"
            rel="noreferrer"
            className="hover:underline"
          >
            <Token kind="st">"https://github.com/saitenntaisei/nixie9v"</Token>
          </a>
          ;
        </Line>
      </div>
    </CodeShell>
  );
}
