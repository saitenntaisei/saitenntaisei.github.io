import React from "react";

const SOCIALS = [
  { href: "https://twitter.com/saitenntaisei", label: "X / Twitter", src: "/x.png",      invert: true },
  { href: "https://github.com/saitenntaisei",  label: "GitHub",      src: "/github.png", invert: true },
  { href: "https://qiita.com/saitenntaisei",   label: "Qiita",       src: "/qiita.png",  invert: false },
];

export default function Footer() {
  return (
    <footer className="border-t border-[#30363d] py-8 px-4 flex flex-col items-center gap-3 font-mono text-[12px] text-[#6e7681]">
      <div className="flex items-center gap-5">
        {SOCIALS.map((s) => (
          <a
            key={s.href}
            href={s.href}
            target="_blank"
            rel="noreferrer"
            aria-label={s.label}
            className="opacity-80 hover:opacity-100 transition-opacity"
          >
            <img
              src={s.src}
              alt=""
              className={`w-6 h-6 object-contain ${s.invert ? "invert" : ""}`}
            />
          </a>
        ))}
      </div>
      <div>© 2026 @saitenntaisei. All rights reserved.</div>
    </footer>
  );
}
