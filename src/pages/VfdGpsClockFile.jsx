import React from "react";
import CodeShell from "../code/CodeShell.jsx";
import Line from "../code/Line.jsx";
import Token from "../code/Token.jsx";
import Footer from "../code/Footer.jsx";

export default function VfdGpsClockFile() {
  return (
    <CodeShell
      footer={<Footer />}
      hero={
        <div className="px-4 pb-6 flex justify-center">
          <img
            src="/material/vfd.jpg"
            alt="VFD Tube GPS Clock"
            className="w-full max-w-2xl rounded-lg border border-[#30363d]"
          />
        </div>
      }
    >
      <div className="px-4 py-4">
        <Line n={1}>
          <Token kind="ty">PersonalProject</Token>{" "}
          <Token kind="nm">vfd_gps_clock</Token>{" = {};"}
        </Line>
        <Line n={2}>
          <Token kind="nm">vfd_gps_clock</Token>.<Token kind="nm">title</Token>
          {"    = "}
          <Token kind="st">"VFD Tube GPS Clock"</Token>;
        </Line>
        <Line n={3}>
          <Token kind="nm">vfd_gps_clock</Token>.<Token kind="nm">stack</Token>
          {"    = {"}
          <Token kind="ty">Hardware</Token>::<Token kind="nm">VFD_TUBE</Token>{", "}
          <Token kind="ty">Hardware</Token>::<Token kind="nm">RP2040</Token>{", "}
          <Token kind="ty">Hardware</Token>::<Token kind="nm">GPS</Token>{", "}
          <Token kind="ty">Lang</Token>::<Token kind="nm">Rust</Token>
          {"};"}
        </Line>
        <Line n={4}>
          <Token kind="nm">vfd_gps_clock</Token>.<Token kind="nm">software</Token>
          {" = "}
          <a
            href="https://github.com/saitenntaisei/gps-clock"
            target="_blank"
            rel="noreferrer"
            className="hover:underline"
          >
            <Token kind="st">"https://github.com/saitenntaisei/gps-clock"</Token>
          </a>
          ;
        </Line>
        <Line n={5}>
          <Token kind="nm">vfd_gps_clock</Token>.<Token kind="nm">hardware</Token>
          {" = "}
          <a
            href="https://github.com/saitenntaisei/gps-clock-pcb"
            target="_blank"
            rel="noreferrer"
            className="hover:underline"
          >
            <Token kind="st">"https://github.com/saitenntaisei/gps-clock-pcb"</Token>
          </a>
          ;
        </Line>
      </div>
    </CodeShell>
  );
}
