import React from "react";
import { TOKEN_CLASS } from "./tokens.js";

export default function Token({ kind, children }) {
  const cls = TOKEN_CLASS[kind] ?? TOKEN_CLASS.default;
  return <span className={cls}>{children}</span>;
}
