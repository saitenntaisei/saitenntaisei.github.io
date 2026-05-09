# Code-Themed UI Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** トップページを 1 つの C++ ソースファイル風 UI (GitHub Dark) に置き換え、`void` 宣言の 1 行 sticky ヘッダー (行番号 1) + 行番号 2 から始まる本体 + 同スタイルの Personal Project 詳細ページを構築する。

**Architecture:** `src/code/` に再利用可能なコードビュー・プリミティブ (`Token`, `Line`, `HeaderBar`, `CodeShell`) を作り、`src/pages/HomeFile.jsx` / `VfdGpsClockFile.jsx` / `NixiedClockFile.jsx` がそれらを組み立てる。`App.jsx` のハッシュルーティングを `{ name, params, anchor }` 形式に拡張し、`#L-xxx` アンカー検出で `scrollIntoView`。旧コンポーネント (`Header`, `Itroduction`, `Skills`, `WorkedList`, `Links`, `PersonalProject`, `Projects/*Page`) と旧ハンバーガーメニューは削除。

**Tech Stack:** React 18 (functional components only) + Vite 7 + Tailwind CSS 3 + Vitest 3 + @testing-library/react + @testing-library/jest-dom (jsdom). 言語は JSX (TypeScript なし)。シンタックスハイライトはハンドロールで token 別に CSS class を付与。

**Spec:** `specs/2026-05-07-code-themed-ui-design.md`

---

## File map

新規作成:

- `src/code/tokens.js` — `kind` → Tailwind/CSS class 文字列マップ + 配列 `KINDS`
- `src/code/Token.jsx` — `<Token kind="kw">struct</Token>` をレンダリングする小コンポーネント
- `src/code/Token.test.jsx` — 各 `kind` で期待される class が当たることを確認
- `src/code/Line.jsx` — `<Line n={2} id="L-about">...</Line>` で行番号 + 行コンテンツをレンダリング
- `src/code/Line.test.jsx` — 行番号表示・`id` 設定・空行を確認
- `src/code/HeaderBar.jsx` — sticky な 1 行ナビ。行番号 `1` + `void about(); void skills(); ...` リンク群
- `src/code/HeaderBar.test.jsx` — 5 リンクの存在 / `href` 値 / クリックでハッシュ更新
- `src/code/CodeShell.jsx` — ダーク背景・monospace フォントの外枠 (children を縦並びでラップ)
- `src/pages/HomeFile.jsx` — `portfolio.cpp` 単一ファイル相当のホーム
- `src/pages/HomeFile.test.jsx` — 主要 `id` (`L-about` 等) 存在・プロフィール文言の表示
- `src/pages/VfdGpsClockFile.jsx` — VFD GPS Clock 詳細をコード風に再構成
- `src/pages/NixiedClockFile.jsx` — Nixie Tube Clock 詳細をコード風に再構成
- `src/route.js` — `getRouteFromHash` を切り出した純粋関数。戻り値は `{ name, params, anchor }`
- `src/route.test.js` — `getRouteFromHash` のユニットテスト (8 ケース)

修正:

- `src/App.jsx` — `getRouteFromHash` は `./route.js` から import。ハンバーガーと旧ホームコンテンツを削除。`HomeFile` / プロジェクトページを描画。`#L-xxx` 検出時に `scrollIntoView` する `useEffect` を追加。
- `src/App.test.jsx` — 旧 "ハンバーガー経由ナビ" テストを削除し、`HomeFile` のヘッダー経由の挙動 / 新 route (`#/projects/vfd-gps-clock`, `#/projects/nixied-clock`) のレンダリング / `#L-projects` で対応 `id` が DOM に存在することを確認するテストへ置換。

削除:

- `src/Skills.jsx`
- `src/PersonalProject.jsx`
- `src/Projects/VFDGPSClockPage.jsx`
- `src/Projects/NixiedClockPage.jsx`
- (`src/Projects/` ディレクトリ自体も空になるので削除)

---

## Task 1: Token プリミティブ

**Files:**
- Create: `src/code/tokens.js`
- Create: `src/code/Token.jsx`
- Test:   `src/code/Token.test.jsx`

- [ ] **Step 1: 失敗するテストを書く**

`src/code/Token.test.jsx`:

```jsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Token from "./Token.jsx";
import { TOKEN_CLASS } from "./tokens.js";

describe("Token", () => {
  it("renders children with the keyword color class", () => {
    render(<Token kind="kw">struct</Token>);
    const el = screen.getByText("struct");
    expect(el).toHaveClass(TOKEN_CLASS.kw);
  });

  it.each([
    ["ty", "Profile"],
    ["fn", "about"],
    ["st", '"saiten"'],
    ["cm", "// hello"],
    ["nm", "name"],
    ["pp", "#include"],
  ])("applies %s color class", (kind, text) => {
    render(<Token kind={kind}>{text}</Token>);
    expect(screen.getByText(text)).toHaveClass(TOKEN_CLASS[kind]);
  });

  it("falls back to default class for unknown kind", () => {
    render(<Token kind="???">x</Token>);
    expect(screen.getByText("x")).toHaveClass(TOKEN_CLASS.default);
  });
});
```

- [ ] **Step 2: テスト失敗確認**

Run: `npm test -- --run src/code/Token.test.jsx`
Expected: FAIL — module `./Token.jsx` (and `./tokens.js`) not found.

- [ ] **Step 3: 最小実装**

`src/code/tokens.js`:

```js
// GitHub Dark token colors. Hex literals are used directly so consumers
// don't need a Tailwind config change for arbitrary colors.
export const TOKEN_CLASS = {
  kw: "text-[#ff7b72]",
  ty: "text-[#79c0ff]",
  fn: "text-[#d2a8ff]",
  st: "text-[#a5d6ff]",
  cm: "text-[#8b949e] italic",
  nm: "text-[#ffa657]",
  pp: "text-[#ff7b72]",
  default: "text-[#c9d1d9]",
};

export const KINDS = Object.keys(TOKEN_CLASS).filter((k) => k !== "default");
```

`src/code/Token.jsx`:

```jsx
import React from "react";
import { TOKEN_CLASS } from "./tokens.js";

export default function Token({ kind, children }) {
  const cls = TOKEN_CLASS[kind] ?? TOKEN_CLASS.default;
  return <span className={cls}>{children}</span>;
}
```

- [ ] **Step 4: テスト成功確認**

Run: `npm test -- --run src/code/Token.test.jsx`
Expected: PASS — 8 assertions across 3 tests.

- [ ] **Step 5: コミット**

```bash
git add src/code/tokens.js src/code/Token.jsx src/code/Token.test.jsx
git commit -m ":sparkles: Add Token primitive for code-themed UI"
```

---

## Task 2: Line プリミティブ

**Files:**
- Create: `src/code/Line.jsx`
- Test:   `src/code/Line.test.jsx`

- [ ] **Step 1: 失敗するテストを書く**

`src/code/Line.test.jsx`:

```jsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Line from "./Line.jsx";

describe("Line", () => {
  it("renders the line number and content", () => {
    render(<Line n={6}>hello</Line>);
    expect(screen.getByText("6")).toBeInTheDocument();
    expect(screen.getByText("hello")).toBeInTheDocument();
  });

  it("attaches the id when provided", () => {
    render(<Line n={27} id="L-about">body</Line>);
    expect(document.getElementById("L-about")).not.toBeNull();
  });

  it("renders an empty content when no children", () => {
    const { container } = render(<Line n={5} />);
    // Number gutter is present; content slot exists but is empty
    expect(screen.getByText("5")).toBeInTheDocument();
    expect(container.querySelector('[data-role="line-content"]').textContent).toBe("");
  });
});
```

- [ ] **Step 2: テスト失敗確認**

Run: `npm test -- --run src/code/Line.test.jsx`
Expected: FAIL — `./Line.jsx` not found.

- [ ] **Step 3: 最小実装**

`src/code/Line.jsx`:

```jsx
import React from "react";

export default function Line({ n, id, children }) {
  return (
    <div id={id} className="flex items-start font-mono text-[13px] leading-7">
      <span className="select-none text-[#6e7681] pr-3 text-right min-w-[2.5rem]">
        {n}
      </span>
      <span data-role="line-content" className="flex-1 whitespace-pre-wrap">
        {children}
      </span>
    </div>
  );
}
```

- [ ] **Step 4: テスト成功確認**

Run: `npm test -- --run src/code/Line.test.jsx`
Expected: PASS — 3 tests.

- [ ] **Step 5: コミット**

```bash
git add src/code/Line.jsx src/code/Line.test.jsx
git commit -m ":sparkles: Add Line primitive (gutter + content)"
```

---

## Task 3: HeaderBar (sticky 1 行ナビ)

**Files:**
- Create: `src/code/HeaderBar.jsx`
- Test:   `src/code/HeaderBar.test.jsx`

- [ ] **Step 1: 失敗するテストを書く**

`src/code/HeaderBar.test.jsx`:

```jsx
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import HeaderBar from "./HeaderBar.jsx";

describe("HeaderBar", () => {
  beforeEach(() => {
    window.location.hash = "";
  });

  it("renders the gutter line number 1", () => {
    render(<HeaderBar />);
    expect(screen.getByText("1")).toBeInTheDocument();
  });

  it("renders all five void declarations as links", () => {
    render(<HeaderBar />);
    const labels = ["about", "skills", "history", "projects", "links"];
    for (const label of labels) {
      const link = screen.getByRole("link", { name: new RegExp(`^${label}$`) });
      expect(link).toHaveAttribute("href", `#L-${label}`);
    }
  });

  it("updates location.hash when a link is clicked", () => {
    render(<HeaderBar />);
    const aboutLink = screen.getByRole("link", { name: /^about$/ });
    fireEvent.click(aboutLink);
    expect(window.location.hash).toBe("#L-about");
  });
});
```

- [ ] **Step 2: テスト失敗確認**

Run: `npm test -- --run src/code/HeaderBar.test.jsx`
Expected: FAIL — `./HeaderBar.jsx` not found.

- [ ] **Step 3: 最小実装**

`src/code/HeaderBar.jsx`:

```jsx
import React from "react";
import Token from "./Token.jsx";

const ITEMS = ["about", "skills", "history", "projects", "links"];

export default function HeaderBar() {
  return (
    <div className="sticky top-0 z-30 bg-[#161b22] border-b border-[#30363d] font-mono text-[13px] leading-7 whitespace-nowrap overflow-x-auto">
      <div className="flex items-center px-4 py-3">
        <span className="select-none text-[#6e7681] pr-3 text-right min-w-[2.5rem]">
          1
        </span>
        <span className="flex-1">
          {ITEMS.map((name, i) => (
            <span key={name} className="mr-3">
              <Token kind="kw">void</Token>{" "}
              <a href={`#L-${name}`} className="hover:underline">
                <Token kind="fn">{name}</Token>
              </a>
              <Token kind="default">();</Token>
            </span>
          ))}
        </span>
      </div>
    </div>
  );
}
```

- [ ] **Step 4: テスト成功確認**

Run: `npm test -- --run src/code/HeaderBar.test.jsx`
Expected: PASS — 3 tests.

- [ ] **Step 5: コミット**

```bash
git add src/code/HeaderBar.jsx src/code/HeaderBar.test.jsx
git commit -m ":sparkles: Add HeaderBar sticky 1-line nav"
```

---

## Task 4: CodeShell 外枠

**Files:**
- Create: `src/code/CodeShell.jsx`

(専用テストは持たず、後段の `HomeFile.test.jsx` でレンダリング経路をカバーする。`CodeShell` は children を返す薄いラッパーなのでロジックなし。)

- [ ] **Step 1: 実装を書く**

`src/code/CodeShell.jsx`:

```jsx
import React from "react";

export default function CodeShell({ children }) {
  return (
    <div className="min-h-screen bg-[#0d1117] text-[#c9d1d9] font-mono">
      <div className="max-w-4xl mx-auto">{children}</div>
    </div>
  );
}
```

- [ ] **Step 2: smoke レンダーテスト** (既存 `Token.test.jsx` 流の最低限のチェック)

`src/code/CodeShell.jsx` のテストは作らず、Task 6 の `HomeFile.test.jsx` で間接的に確認する。`npm test` で全体が引き続きパスすることを保証する。

Run: `npm test -- --run src/code`
Expected: 既存 (Token, Line, HeaderBar) が引き続き全て PASS。

- [ ] **Step 3: コミット**

```bash
git add src/code/CodeShell.jsx
git commit -m ":sparkles: Add CodeShell outer container"
```

---

## Task 5: ルートパーサを別ファイルへ抽出

**Files:**
- Create: `src/route.js`
- Create: `src/route.test.js`

このタスクは `App.jsx` を**触らない**。`getRouteFromHash` を独立ファイルに切り出してユニットテストできる状態にし、Task 9 の App 全面書き換えで `import` するだけにする。中間状態を作らないことで認知負荷を下げる。

- [ ] **Step 1: 失敗するテストを書く**

`src/route.test.js`:

```js
import { describe, it, expect } from "vitest";
import { getRouteFromHash } from "./route.js";

describe("getRouteFromHash", () => {
  const cases = [
    { hash: "",                            expect: { name: "home",    params: {},                          anchor: null     } },
    { hash: "#/",                          expect: { name: "home",    params: {},                          anchor: null     } },
    { hash: "#/home",                      expect: { name: "home",    params: {},                          anchor: null     } },
    { hash: "#/projects",                  expect: { name: "home",    params: {},                          anchor: "L-projects" } },
    { hash: "#/projects/vfd-gps-clock",    expect: { name: "project", params: { slug: "vfd-gps-clock" },   anchor: null     } },
    { hash: "#/projects/nixied-clock",     expect: { name: "project", params: { slug: "nixied-clock" },    anchor: null     } },
    { hash: "#L-about",                    expect: { name: "home",    params: {},                          anchor: "L-about" } },
    { hash: "#/garbage",                   expect: { name: "home",    params: {},                          anchor: null     } },
  ];
  it.each(cases)("parses $hash", ({ hash, expect: e }) => {
    expect(getRouteFromHash(hash)).toEqual(e);
  });
});
```

- [ ] **Step 2: テスト失敗確認**

Run: `npm test -- --run src/route.test.js`
Expected: FAIL — `./route.js` not found.

- [ ] **Step 3: 最小実装**

`src/route.js`:

```js
export function getRouteFromHash(hash = window.location.hash) {
  const raw = (hash || "").replace(/^#/, "");

  // Anchor-only form: "L-foo"
  if (raw.startsWith("L-")) {
    return { name: "home", params: {}, anchor: raw };
  }

  // Path form: "/projects/<slug>"
  const projectMatch = raw.match(/^\/projects\/([a-z0-9-]+)$/);
  if (projectMatch) {
    return { name: "project", params: { slug: projectMatch[1] }, anchor: null };
  }

  // Legacy "/projects" → home + scroll to projects function
  if (raw === "/projects") {
    return { name: "home", params: {}, anchor: "L-projects" };
  }

  return { name: "home", params: {}, anchor: null };
}
```

- [ ] **Step 4: テスト成功確認**

Run: `npm test -- --run src/route.test.js`
Expected: PASS — 8 cases.

- [ ] **Step 5: コミット**

```bash
git add src/route.js src/route.test.js
git commit -m ":sparkles: Add hash route parser ({name,params,anchor})"
```

---

## Task 6: HomeFile (portfolio.cpp 単一ファイル)

**Files:**
- Create: `src/pages/HomeFile.jsx`
- Test:   `src/pages/HomeFile.test.jsx`

- [ ] **Step 1: 失敗するテストを書く**

`src/pages/HomeFile.test.jsx`:

```jsx
import { render, screen, within } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import HomeFile from "./HomeFile.jsx";

describe("HomeFile", () => {
  it("renders the sticky header bar with five void links", () => {
    render(<HomeFile />);
    for (const name of ["about", "skills", "history", "projects", "links"]) {
      expect(
        screen.getByRole("link", { name: new RegExp(`^${name}$`) })
      ).toHaveAttribute("href", `#L-${name}`);
    }
  });

  it("renders profile struct fields", () => {
    render(<HomeFile />);
    expect(screen.getByText(/saiten/)).toBeInTheDocument();
    expect(screen.getByText(/Tokyo Institute of Technology/)).toBeInTheDocument();
    expect(screen.getByText(/traP/)).toBeInTheDocument();
    expect(screen.getByText(/Rogy/)).toBeInTheDocument();
  });

  it("provides scroll anchors for each header destination", () => {
    render(<HomeFile />);
    for (const id of ["L-about", "L-skills", "L-history", "L-projects", "L-links"]) {
      expect(document.getElementById(id)).not.toBeNull();
    }
  });

  it("links to each project detail page", () => {
    render(<HomeFile />);
    expect(
      screen.getByRole("link", { name: /vfd_gps_clock/ })
    ).toHaveAttribute("href", "#/projects/vfd-gps-clock");
    expect(
      screen.getByRole("link", { name: /nixied_clock/ })
    ).toHaveAttribute("href", "#/projects/nixied-clock");
  });

  it("links to external profiles (twitter / github / qiita)", () => {
    render(<HomeFile />);
    expect(screen.getByRole("link", { name: /twitter/i })).toHaveAttribute(
      "href",
      "https://twitter.com/saitenntaisei"
    );
    expect(screen.getByRole("link", { name: /github\.com\/saitenntaisei/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /qiita/i })).toHaveAttribute(
      "href",
      "https://qiita.com/saitenntaisei"
    );
  });
});
```

- [ ] **Step 2: テスト失敗確認**

Run: `npm test -- --run src/pages/HomeFile.test.jsx`
Expected: FAIL — `./HomeFile.jsx` not found.

- [ ] **Step 3: 最小実装**

`src/pages/HomeFile.jsx`:

```jsx
import React from "react";
import CodeShell from "../code/CodeShell.jsx";
import HeaderBar from "../code/HeaderBar.jsx";
import Line from "../code/Line.jsx";
import Token from "../code/Token.jsx";

const SKILL_LOGOS = [
  { label: "C++", src: "/logo/C++.png" },
  { label: "Python", src: "/logo/Python.png" },
  { label: "Rust", src: "/logo/Rust.png" },
  { label: "Go", src: "/logo/Golang.png" },
];

const HISTORY = [
  { company: "pixiv",    period: "2022.4 — 2022.10" },
  { company: "DeNA",     period: "2023.9 (3 days)"  },
  { company: "Wantedly", period: "2023.9 (3 weeks)" },
  { company: "FixStars", period: "2025.3 (3 weeks)" },
  { company: "M3",       period: "2025.8 (2 weeks)" },
];

export default function HomeFile() {
  return (
    <CodeShell>
      <HeaderBar />
      <div className="px-4 py-4">
        <Line n={2}><Token kind="cm">{"// portfolio.cpp"}</Token></Line>
        <Line n={3}><Token kind="pp">#pragma once</Token></Line>
        <Line n={4}>
          <Token kind="pp">#include</Token>{" "}
          <Token kind="st">{"<string>"}</Token>
        </Line>
        <Line n={5} />

        <Line n={6}>
          <Token kind="kw">struct</Token>{" "}
          <Token kind="ty">Profile</Token>{" {"}
        </Line>
        <Line n={7}>
          {"  "}<Token kind="ty">std::string</Token>{" "}
          <Token kind="nm">name</Token>{" = "}
          <Token kind="st">"saiten"</Token>;
        </Line>
        <Line n={8}>
          {"  "}<Token kind="ty">std::string</Token>{" "}
          <Token kind="nm">univ</Token>{" = "}
          <Token kind="st">"Tokyo Institute of Technology"</Token>;
        </Line>
        <Line n={9}>
          {"  "}<Token kind="ty">int</Token>{"         "}
          <Token kind="nm">grade</Token>{" = "}
          <Token kind="st">1</Token>;{" "}<Token kind="cm">{"// M1"}</Token>
        </Line>
        <Line n={10}>
          {"  "}<Token kind="ty">Affiliation</Token>{" "}
          <Token kind="nm">affiliations</Token>[] = {"{"}
        </Line>
        <Line n={11}>
          {"    "}<Token kind="st">"デジタル創作同好会 traP"</Token>,
        </Line>
        <Line n={12}>
          {"    "}<Token kind="st">"ロボット技術研究会 Rogy"</Token>,
        </Line>
        <Line n={13}>{"  "}{"};"}</Line>
        <Line n={14}>{"};"}</Line>
        <Line n={15} />

        <Line n={16}>
          <Token kind="kw">enum class</Token>{" "}
          <Token kind="ty">Skill</Token>{" { "}
          <Token kind="nm">Cpp</Token>, <Token kind="nm">Python</Token>,{" "}
          <Token kind="nm">Rust</Token>, <Token kind="nm">Go</Token>{" };"}
        </Line>
        <Line n={17} />

        <Line n={18}>
          <Token kind="kw">struct</Token>{" "}
          <Token kind="ty">Internship</Token>{" { "}
          <Token kind="ty">std::string</Token>{" "}
          <Token kind="nm">company</Token>;{" "}
          <Token kind="ty">std::string</Token>{" "}
          <Token kind="nm">period</Token>;{" };"}
        </Line>
        <Line n={19}>
          <Token kind="kw">static const</Token>{" "}
          <Token kind="ty">Internship</Token>{" "}
          <Token kind="nm">history</Token>[] = {"{"}
        </Line>
        {HISTORY.map((row, i) => (
          <Line key={row.company} n={20 + i}>
            {"  { "}
            <Token kind="st">"{row.company}"</Token>,{" "}
            <Token kind="st">"{row.period}"</Token>
            {" },"}
          </Line>
        ))}
        <Line n={25}>{"};"}</Line>
        <Line n={26} />

        {/* about */}
        <Line n={27} id="L-about">
          <Token kind="kw">void</Token>{" "}
          <Token kind="fn">about</Token>(){" {"}
        </Line>
        <Line n={28}>
          {"  "}<Token kind="ty">Profile</Token>{" "}
          <Token kind="nm">self</Token>;
        </Line>
        <Line n={29}>
          {"  "}<Token kind="cm">{"// (image: /saiten.png)"}</Token>
        </Line>
        <div className="pl-12 py-2">
          <img
            src="/saiten.png"
            alt="saiten"
            className="w-40 h-40 rounded-full object-cover"
          />
        </div>
        <Line n={30}>{"}"}</Line>
        <Line n={31} />

        {/* skills */}
        <Line n={32} id="L-skills">
          <Token kind="kw">void</Token>{" "}
          <Token kind="fn">skills</Token>(){" {"}
        </Line>
        <Line n={33}>
          {"  "}<Token kind="cm">{"// logos for enum class Skill"}</Token>
        </Line>
        <div className="pl-12 py-2 flex gap-4 flex-wrap">
          {SKILL_LOGOS.map((s) => (
            <img
              key={s.label}
              src={s.src}
              alt={`${s.label} logo`}
              className="w-20 h-20 object-contain"
              loading="lazy"
            />
          ))}
        </div>
        <Line n={34}>{"}"}</Line>
        <Line n={35} />

        {/* history */}
        <Line n={36} id="L-history">
          <Token kind="kw">void</Token>{" "}
          <Token kind="fn">history</Token>(){" {"}
        </Line>
        {HISTORY.map((row, i) => (
          <Line key={row.company} n={37 + i}>
            {"  "}
            <Token kind="cm">{`// ${row.company}: ${row.period}`}</Token>
          </Line>
        ))}
        <Line n={42}>{"}"}</Line>
        <Line n={43} />

        {/* projects */}
        <Line n={44} id="L-projects">
          <Token kind="kw">void</Token>{" "}
          <Token kind="fn">projects</Token>(){" {"}
        </Line>
        <Line n={45}>
          {"  "}
          <a href="#/projects/vfd-gps-clock" className="hover:underline">
            <Token kind="fn">vfd_gps_clock</Token>
          </a>
          ();{" "}<Token kind="cm">{"// → detail"}</Token>
        </Line>
        <Line n={46}>
          {"  "}
          <a href="#/projects/nixied-clock" className="hover:underline">
            <Token kind="fn">nixied_clock</Token>
          </a>
          ();{" "}<Token kind="cm">{"// → detail"}</Token>
        </Line>
        <Line n={47}>{"}"}</Line>
        <Line n={48} />

        {/* links */}
        <Line n={49} id="L-links">
          <Token kind="kw">void</Token>{" "}
          <Token kind="fn">links</Token>(){" {"}
        </Line>
        <Line n={50}>
          {"  "}<Token kind="fn">open</Token>(
          <a
            href="https://twitter.com/saitenntaisei"
            target="_blank"
            rel="noreferrer"
            className="hover:underline"
            aria-label="twitter"
          >
            <Token kind="st">"https://twitter.com/saitenntaisei"</Token>
          </a>
          );
        </Line>
        <Line n={51}>
          {"  "}<Token kind="fn">open</Token>(
          <a
            href="https://github.com/saitenntaisei"
            target="_blank"
            rel="noreferrer"
            className="hover:underline"
          >
            <Token kind="st">"https://github.com/saitenntaisei"</Token>
          </a>
          );
        </Line>
        <Line n={52}>
          {"  "}<Token kind="fn">open</Token>(
          <a
            href="https://qiita.com/saitenntaisei"
            target="_blank"
            rel="noreferrer"
            className="hover:underline"
            aria-label="qiita"
          >
            <Token kind="st">"https://qiita.com/saitenntaisei"</Token>
          </a>
          );
        </Line>
        <Line n={53}>{"}"}</Line>
      </div>
    </CodeShell>
  );
}
```

- [ ] **Step 4: テスト成功確認**

Run: `npm test -- --run src/pages/HomeFile.test.jsx`
Expected: PASS — 5 tests.

- [ ] **Step 5: コミット**

```bash
git add src/pages/HomeFile.jsx src/pages/HomeFile.test.jsx
git commit -m ":sparkles: Add HomeFile (portfolio.cpp single-file home)"
```

---

## Task 7: VfdGpsClockFile

**Files:**
- Create: `src/pages/VfdGpsClockFile.jsx`
- Test:   `src/pages/VfdGpsClockFile.test.jsx`

- [ ] **Step 1: 失敗するテストを書く**

`src/pages/VfdGpsClockFile.test.jsx`:

```jsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import VfdGpsClockFile from "./VfdGpsClockFile.jsx";

describe("VfdGpsClockFile", () => {
  it("renders a back-to-home link", () => {
    render(<VfdGpsClockFile />);
    expect(
      screen.getByRole("link", { name: /back_to_home/ })
    ).toHaveAttribute("href", "#/home");
  });

  it("renders the project title and key links", () => {
    render(<VfdGpsClockFile />);
    expect(screen.getByText(/VFD Tube GPS Clock/)).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /gps-clock(?!-pcb)/ })
    ).toHaveAttribute("href", "https://github.com/saitenntaisei/gps-clock");
    expect(
      screen.getByRole("link", { name: /gps-clock-pcb/ })
    ).toHaveAttribute("href", "https://github.com/saitenntaisei/gps-clock-pcb");
  });

  it("renders the preview image", () => {
    render(<VfdGpsClockFile />);
    expect(screen.getByAltText(/VFD Tube GPS Clock/i)).toHaveAttribute(
      "src",
      "/material/vfd.jpg"
    );
  });
});
```

- [ ] **Step 2: テスト失敗確認**

Run: `npm test -- --run src/pages/VfdGpsClockFile.test.jsx`
Expected: FAIL — module not found.

- [ ] **Step 3: 最小実装**

`src/pages/VfdGpsClockFile.jsx`:

```jsx
import React from "react";
import CodeShell from "../code/CodeShell.jsx";
import Line from "../code/Line.jsx";
import Token from "../code/Token.jsx";

export default function VfdGpsClockFile() {
  return (
    <CodeShell>
      <div className="sticky top-0 z-30 bg-[#161b22] border-b border-[#30363d] font-mono text-[13px] leading-7 px-4 py-3">
        <span className="select-none text-[#6e7681] pr-3 text-right min-w-[2.5rem]">
          1
        </span>
        <Token kind="kw">void</Token>{" "}
        <a href="#/home" className="hover:underline">
          <Token kind="fn">back_to_home</Token>
        </a>
        ();
      </div>
      <div className="px-4 py-4">
        <Line n={2}><Token kind="cm">{"// vfd_gps_clock.cpp"}</Token></Line>
        <Line n={3} />
        <Line n={4}>
          <Token kind="kw">struct</Token>{" "}
          <Token kind="ty">Project</Token>{" {"}
        </Line>
        <Line n={5}>
          {"  "}<Token kind="ty">std::string</Token>{" "}
          <Token kind="nm">title</Token>{" = "}
          <Token kind="st">"VFD Tube GPS Clock"</Token>;
        </Line>
        <Line n={6}>
          {"  "}<Token kind="ty">std::string</Token>{" "}
          <Token kind="nm">stack</Token>{" = "}
          <Token kind="st">"VFD TUBE, RP2040, GPS"</Token>;
        </Line>
        <Line n={7}>
          {"  "}<Token kind="cm">{"// I will write detail description later..."}</Token>
        </Line>
        <Line n={8}>{"};"}</Line>
        <Line n={9} />

        <div className="pl-12 py-2">
          <img
            src="/material/vfd.jpg"
            alt="VFD Tube GPS Clock"
            className="w-full max-w-xl rounded-lg border border-[#30363d]"
          />
        </div>

        <Line n={10}>
          <Token kind="kw">void</Token>{" "}
          <Token kind="fn">repos</Token>(){" {"}
        </Line>
        <Line n={11}>
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
        <Line n={12}>
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
        <Line n={13}>{"}"}</Line>
      </div>
    </CodeShell>
  );
}
```

- [ ] **Step 4: テスト成功確認**

Run: `npm test -- --run src/pages/VfdGpsClockFile.test.jsx`
Expected: PASS — 3 tests.

- [ ] **Step 5: コミット**

```bash
git add src/pages/VfdGpsClockFile.jsx src/pages/VfdGpsClockFile.test.jsx
git commit -m ":sparkles: Add VfdGpsClockFile (code-themed detail page)"
```

---

## Task 8: NixiedClockFile

**Files:**
- Create: `src/pages/NixiedClockFile.jsx`
- Test:   `src/pages/NixiedClockFile.test.jsx`

- [ ] **Step 1: 失敗するテストを書く**

`src/pages/NixiedClockFile.test.jsx`:

```jsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import NixiedClockFile from "./NixiedClockFile.jsx";

describe("NixiedClockFile", () => {
  it("renders a back-to-home link", () => {
    render(<NixiedClockFile />);
    expect(
      screen.getByRole("link", { name: /back_to_home/ })
    ).toHaveAttribute("href", "#/home");
  });

  it("renders the project title and repo links", () => {
    render(<NixiedClockFile />);
    expect(screen.getByText(/Nixie Tube Clock/)).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /nixiecontrol/ })
    ).toHaveAttribute("href", "https://github.com/saitenntaisei/nixiecontrol");
    expect(
      screen.getByRole("link", { name: /nixie9v/ })
    ).toHaveAttribute("href", "https://github.com/saitenntaisei/nixie9v");
  });

  it("renders the preview video", () => {
    const { container } = render(<NixiedClockFile />);
    const video = container.querySelector("video");
    expect(video).not.toBeNull();
    expect(video.querySelector("source")?.src ?? video.src).toMatch(/nixie\.mp4$/);
  });
});
```

- [ ] **Step 2: テスト失敗確認**

Run: `npm test -- --run src/pages/NixiedClockFile.test.jsx`
Expected: FAIL — module not found.

- [ ] **Step 3: 最小実装**

`src/pages/NixiedClockFile.jsx`:

```jsx
import React from "react";
import CodeShell from "../code/CodeShell.jsx";
import Line from "../code/Line.jsx";
import Token from "../code/Token.jsx";

export default function NixiedClockFile() {
  return (
    <CodeShell>
      <div className="sticky top-0 z-30 bg-[#161b22] border-b border-[#30363d] font-mono text-[13px] leading-7 px-4 py-3">
        <span className="select-none text-[#6e7681] pr-3 text-right min-w-[2.5rem]">
          1
        </span>
        <Token kind="kw">void</Token>{" "}
        <a href="#/home" className="hover:underline">
          <Token kind="fn">back_to_home</Token>
        </a>
        ();
      </div>
      <div className="px-4 py-4">
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
```

- [ ] **Step 4: テスト成功確認**

Run: `npm test -- --run src/pages/NixiedClockFile.test.jsx`
Expected: PASS — 3 tests.

- [ ] **Step 5: コミット**

```bash
git add src/pages/NixiedClockFile.jsx src/pages/NixiedClockFile.test.jsx
git commit -m ":sparkles: Add NixiedClockFile (code-themed detail page)"
```

---

## Task 9: App.jsx を新ページに切り替え + ハンバーガー削除 + アンカースクロール

**Files:**
- Modify: `src/App.jsx`
- Modify: `src/App.test.jsx`

- [ ] **Step 1: テストを書き換える (失敗状態にする)**

`src/App.test.jsx` 内の `describe("App", ...)` を以下に置換:

```jsx
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import App from "./App.jsx";

describe("App", () => {
  beforeEach(() => {
    window.location.hash = "";
    window.dispatchEvent(new HashChangeEvent("hashchange"));
  });

  it("renders HomeFile by default with all five header links", () => {
    render(<App />);
    for (const name of ["about", "skills", "history", "projects", "links"]) {
      expect(
        screen.getByRole("link", { name: new RegExp(`^${name}$`) })
      ).toBeInTheDocument();
    }
  });

  it("renders VfdGpsClockFile when hash points to it", async () => {
    render(<App />);
    window.location.hash = "#/projects/vfd-gps-clock";
    window.dispatchEvent(new HashChangeEvent("hashchange"));
    expect(await screen.findByText(/VFD Tube GPS Clock/)).toBeInTheDocument();
  });

  it("renders NixiedClockFile when hash points to it", async () => {
    render(<App />);
    window.location.hash = "#/projects/nixied-clock";
    window.dispatchEvent(new HashChangeEvent("hashchange"));
    expect(await screen.findByText(/Nixie Tube Clock/)).toBeInTheDocument();
  });

  it("clicking a header link updates the hash to its anchor", () => {
    render(<App />);
    const aboutLink = screen.getByRole("link", { name: /^about$/ });
    fireEvent.click(aboutLink);
    expect(window.location.hash).toBe("#L-about");
  });

  it("legacy #/projects scrolls to the projects function on the home page", async () => {
    render(<App />);
    window.location.hash = "#/projects";
    window.dispatchEvent(new HashChangeEvent("hashchange"));
    // L-projects anchor must exist on the home page
    expect(document.getElementById("L-projects")).not.toBeNull();
  });
});
```

(旧 "renders portfolio header" / "navigates to Personal Project via hamburger menu" は削除。`getRouteFromHash` のユニットテストは `src/route.test.js` にあり、ここでは触らない。)

- [ ] **Step 2: テスト失敗確認**

Run: `npm test -- --run src/App.test.jsx`
Expected: FAIL — `App` is still rendering the old layout / hamburger.

- [ ] **Step 3: App.jsx を全面書き換える**

`src/App.jsx` を以下で完全置換 (旧ヘッダー / 旧セクション / ハンバーガーは削除):

```jsx
import "./App.css";
import React, { useEffect, useState } from "react";
import { getRouteFromHash } from "./route.js";
import HomeFile from "./pages/HomeFile.jsx";
import VfdGpsClockFile from "./pages/VfdGpsClockFile.jsx";
import NixiedClockFile from "./pages/NixiedClockFile.jsx";

const PROJECT_PAGES = {
  "vfd-gps-clock": VfdGpsClockFile,
  "nixied-clock":  NixiedClockFile,
};

function ProjectByName({ slug }) {
  const Comp = PROJECT_PAGES[slug];
  return Comp ? <Comp /> : <HomeFile />;
}

export default function App() {
  const [route, setRoute] = useState(() => getRouteFromHash());

  useEffect(() => {
    const onHashChange = () => setRoute(getRouteFromHash());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  useEffect(() => {
    if (route.name === "home" && route.anchor) {
      const el = document.getElementById(route.anchor);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [route]);

  if (route.name === "project") {
    return <ProjectByName slug={route.params.slug} />;
  }
  return <HomeFile />;
}
```

- [ ] **Step 4: テスト成功確認**

Run: `npm test -- --run src/App.test.jsx`
Expected: PASS — `App` の 5 tests がすべて成功。`route.test.js` の 8 cases も既に Task 5 でパスしている。

- [ ] **Step 5: コミット**

```bash
git add src/App.jsx src/App.test.jsx
git commit -m ":recycle: Replace App with code-themed routes (drop hamburger)"
```

---

## Task 10: 旧コンポーネントを削除

**Files:**
- Delete: `src/Skills.jsx`
- Delete: `src/PersonalProject.jsx`
- Delete: `src/Projects/VFDGPSClockPage.jsx`
- Delete: `src/Projects/NixiedClockPage.jsx`
- Delete (空になったら): `src/Projects/`

- [ ] **Step 1: 削除前にどこからも import されていないことを確認**

Run: `grep -RIn -E "Skills\\.jsx|PersonalProject\\.jsx|VFDGPSClockPage\\.jsx|NixiedClockPage\\.jsx" src` の結果に対し、想定外の import が無いことを確認 (Task 9 完了後は無いはず)。

参考コマンド (本物の grep ではなく Grep ツールを使う前提):

```
Grep pattern: "from \"\\./(Skills|PersonalProject|Projects/[A-Za-z]+Page)" path: "src"
```

Expected: マッチ 0 件。残っていれば消し忘れ。

- [ ] **Step 2: ファイル削除**

```bash
git rm src/Skills.jsx src/PersonalProject.jsx src/Projects/VFDGPSClockPage.jsx src/Projects/NixiedClockPage.jsx
rmdir src/Projects 2>/dev/null || true
```

- [ ] **Step 3: 全テスト走らせる**

Run: `npm test -- --run`
Expected: PASS — 全件パス (Token / Line / HeaderBar / HomeFile / VfdGpsClockFile / NixiedClockFile / App / getRouteFromHash)。

- [ ] **Step 4: ビルドが通ることを確認**

Run: `npm run build`
Expected: 成功し `docs/` に出力される。エラーや未解決 import がないこと。

- [ ] **Step 5: コミット**

```bash
git add -A
git commit -m ":fire: Remove legacy non-code-themed components"
```

---

## Task 11: 目視スモーク (375 / 768 / 1280 px)

**Files:** none (実行確認のみ)

- [ ] **Step 1: dev サーバーを起動**

Run: `npm run dev`
URL: `http://localhost:5173`

- [ ] **Step 2: 表示確認**

ブラウザの DevTools で 375 / 768 / 1280px の 3 幅を切り替え、以下を確認:

1. ヘッダーが行番号 `1` + `void about(); void skills(); void history(); void projects(); void links();` を 1 行で表示している (狭幅では横スクロール可)。
2. 本体が `2` から始まる行番号で表示されている。
3. ヘッダーの各リンククリックで該当 `void xxx() {` 行までスムーススクロールする。
4. `void projects()` 内の `vfd_gps_clock()` / `nixied_clock()` をクリックで詳細ページに遷移し、`back_to_home()` で戻れる。
5. `saiten.png`, スキルロゴ, VFD 写真, Nixie 動画が表示されている。
6. 旧ハンバーガーメニューが消えている。
7. 配色が GitHub Dark (`#0d1117` 背景、紫の関数名、赤の `void` / `struct`) になっている。

- [ ] **Step 3: 観察結果をテスト or 修正で潰す**

問題があれば該当タスクへ戻り修正。問題なし → `Ctrl-C` で dev を止める。

- [ ] **Step 4: コミットは不要 (実行確認のみ)**

`Ctrl-C` で dev サーバー停止。

---

## Done criteria

- [ ] `npm test -- --run` 全件 PASS
- [ ] `npm run build` 成功
- [ ] 375 / 768 / 1280px 全てで目視チェック完了
- [ ] 旧コンポーネント 4 点 + `Projects/` ディレクトリが削除済み
- [ ] `npm run deploy` は **実行しない** (CLAUDE.md の deploy 注意点 — `master` ブランチ前提のため別途確認が必要)
