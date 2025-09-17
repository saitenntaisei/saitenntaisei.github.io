import React from "react";

function LogoTile({ label, src }) {
  return (
    <div className="flex flex-col items-center justify-center text-center">
      <img
        src={src}
        alt={`${label} logo`}
        className="w-32 h-32 sm:w-36 sm:h-36 object-contain"
        loading="lazy"
      />
    </div>
  );
}

export default function Skills() {
  return (
    <div className="px-6 pb-12">
      <div className="mx-auto max-w-3xl grid grid-cols-2 md:grid-cols-4 gap-0">
        <LogoTile label="C++" src="/logo/C++.png" />
        <LogoTile label="Python" src="/logo/Python.png" />
        <LogoTile label="Rust" src="/logo/Rust.png" />
        <LogoTile label="Golang" src="/logo/Golang.png" />
      </div>
    </div>
  );
}
