import React from "react";

function LogoTile({ label, src }) {
  return (
    <div className="flex flex-col items-center justify-center p-6 text-center">
      <img
        src={src}
        alt={`${label} logo`}
        className="w-48 h-48 sm:w-50 sm:h-50 object-contain mx-auto"
        loading="lazy"
      />
    </div>
  );
}

export default function Skills() {
  return (
    <div className="px-6 pb-12">
      <div className="mx-auto max-w-5xl grid grid-cols-2 md:grid-cols-4">
        <LogoTile label="C++" src="/logo/C++.png" />
        <LogoTile label="Python" src="/logo/Python.png" />
        <LogoTile label="Rust" src="/logo/Rust.png" />
        <LogoTile label="Golang" src="/logo/Golang.png" />
      </div>
    </div>
  );
}
