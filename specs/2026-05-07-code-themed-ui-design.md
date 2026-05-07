# Code-Themed UI Redesign — Design Spec

- **Date**: 2026-05-07
- **Author**: saiten + Claude
- **Status**: approved (brainstorming via visual companion)

## 1. Overview

トップページを、1 つの C++ ソースファイルを上から下へ読むような UI に置き換える。配色は GitHub Dark。最上部に 1 行の sticky ヘッダーを置き、そこにすべての `void` 宣言を並べてナビとして機能させる。Personal Projects 詳細ページ (VFD GPS Clock / Nixied Clock) も同じコード風スタイルに統一する。

## 2. Goals

- 既存の "ヘッダー + セクション + リスト" 構成のホームを、1 つの縦スクロール C++ ソースファイル風 UI に置き換える
- `void` 宣言を 1 行のスティッキーヘッダーに集約し、ナビゲーションを兼ねさせる
- プロジェクト詳細ページにも同じ配色・タイポ・レイアウトを適用する
- 現行ページの情報 (about / skills / internship history / projects / links) はすべて保持する

## 3. Non-Goals

- ライトモード対応 (コードビューは常時ダーク。エディタ画面の没入感優先)
- Shiki / Prism などのシンタックスハイライトライブラリ導入 (静的なのでハンドロール)
- コンテンツの大幅な再構成 (現行サイトの情報量を変えない)
- 複雑なアニメーションやインタラクション

## 4. 確定済みのデザイン決定 (visual companion 経由)

| 項目             | 決定                                                                 |
|------------------|----------------------------------------------------------------------|
| レイアウト       | 単一ソースファイル風 (1 ページ縦スクロール、行番号付き)              |
| 文法             | C++ (`struct`, `enum class`, `void`, `#pragma`, `#include`)          |
| 構成             | hybrid (1 行ヘッダー + 実装本体)                                     |
| ヘッダー         | 1 行扱い (行番号 `1`)。`void about(); void skills(); void history(); void projects(); void links();` を sticky に配置 |
| 本体行番号       | `2` から開始                                                         |
| プロジェクト詳細 | 残す。同じコード風スタイル                                           |
| テーマ           | GitHub Dark                                                          |
| ハンバーガー     | 削除 (ヘッダーバーがナビ)                                            |
| タブ chrome      | なし (saiten.cc でホストするため不要)                                |

## 5. カラーパレット

| トークン            | 用途                                                  | Hex       |
|---------------------|-------------------------------------------------------|-----------|
| `bg`                | ページ背景                                            | `#0d1117` |
| `header-bg`         | sticky ヘッダー背景                                   | `#161b22` |
| `border`            | ヘッダー下罫線・セパレータ                            | `#30363d` |
| `text`              | デフォルト文字色                                      | `#c9d1d9` |
| `gutter`            | 行番号                                                | `#6e7681` |
| `kw` (keyword)      | `void`, `struct`, `enum class`, `#pragma`, `#include`, `return` | `#ff7b72` |
| `ty` (type)         | `Profile`, `std::string`, `int`, `Skill`              | `#79c0ff` |
| `fn` (function)     | `about`, `skills`, `projects`, `vfd_gps_clock` ...    | `#d2a8ff` |
| `st` (string)       | `"saiten"`, `<string>`                                | `#a5d6ff` |
| `cm` (comment)      | `// ...`                                              | `#8b949e` (italic) |
| `nm` (identifier)   | フィールド名・enum メンバ                             | `#ffa657` |
| `pp` (preprocessor) | `#pragma`, `#include` の `#` プレフィックス含む       | `#ff7b72` (kw と同色) |

## 6. アーキテクチャ

```
src/
├── App.jsx                       # ハッシュルーティング (拡張)
├── code/                          # 新規: コード風 UI プリミティブ
│   ├── CodeShell.jsx              # ダーク背景の外枠 (max-width 中央寄せ)
│   ├── HeaderBar.jsx              # 1 行 sticky ナビ (行番号 1)
│   ├── Line.jsx                   # ガター行番号 + 行コンテンツ
│   ├── Token.jsx                  # <Token kind="kw|ty|fn|st|cm|nm|pp">
│   └── tokens.js                  # kind → CSS class マップ
├── pages/
│   ├── HomeFile.jsx               # portfolio.cpp 単一ファイル相当のホーム
│   ├── VfdGpsClockFile.jsx        # 旧 VFDGPSClockPage 置換
│   └── NixiedClockFile.jsx        # 旧 NixiedClockPage 置換
└── (削除) Skills.jsx, PersonalProject.jsx, Projects/VFDGPSClockPage.jsx, Projects/NixiedClockPage.jsx
```

`src/App.css` / `src/index.css` は最小限維持。コード風スタイルは `code/` 内のコンポーネントが自前で持つ (Tailwind 中心、必要最小限のカスタム CSS)。

## 7. ルーティング

ハッシュルーティングは継続。`getRouteFromHash` を switch から正規表現マッチに置き換え、戻り値を `{ name, params }` 形式に。

| route                          | 表示                                                  |
|--------------------------------|--------------------------------------------------------|
| `#/` または `#/home` または空  | `HomeFile`                                            |
| `#/projects/vfd-gps-clock`     | `VfdGpsClockFile`                                     |
| `#/projects/nixied-clock`      | `NixiedClockFile`                                     |
| `#/projects` (後方互換)        | `HomeFile` を表示し `void projects()` 行へスクロール |

不明な route はホームへフォールバック。

**ルートとアンカーの共存**: `#L-about` のような `#L-xxx` 形式はページ遷移ではなくページ内アンカーとして扱う。`getRouteFromHash` は `#L-` プレフィックスを検出した場合、現在の `route` を維持しつつ別途 `anchor` を返す。`App` は `route` 変化と `anchor` 変化をそれぞれ別の `useEffect` で処理する (route → コンポーネント切替、anchor → `scrollIntoView`)。

## 8. ヘッダーバーの動作

- 表示は 1 行: `1  void about(); void skills(); void history(); void projects(); void links();`
- 各 `void xxx()` リンクは内部アンカー `#L-xxx` (例: `#L-about`) を href に持つ
- `App` 側で `hashchange` を捕捉し、`#L-xxx` 形式なら該当 `id` 要素へ `scrollIntoView({behavior:'smooth', block:'start'})`
- `<h1>` 系の従来ヘッダーやハンバーガーメニューは削除

## 9. HomeFile の中身 (代表例)

```cpp
2   // portfolio.cpp
3   #pragma once
4   #include <string>
5
6   struct Profile {
7     std::string name = "saiten";
8     std::string univ = "Tokyo Institute of Technology";
9     int         grade = 1;  // M1
10    Affiliation affiliations[] = {
11      "デジタル創作同好会 traP",
12      "ロボット技術研究会 Rogy",
13    };
14  };
15
16  enum class Skill { Cpp, Python, Rust, Go };
17
18  struct Internship { std::string company; std::string period; };
19  static const Internship history[] = {
20    { "pixiv",    "2022.4 — 2022.10" },
21    { "DeNA",     "2023.9 (3 days)"  },
22    { "Wantedly", "2023.9 (3 weeks)" },
23    { "FixStars", "2025.3 (3 weeks)" },
24    { "M3",       "2025.8 (2 weeks)" },
25  };
26
27  void about() {           // id="L-about"
28    Profile self;
29    // (image: /saiten.png)  ← 実画像を comment 隣にレンダリング
30  }
31
32  void skills() {          // id="L-skills"
33    // logos: C++, Python, Rust, Go
34  }
35
36  void history() {         // id="L-history"
37    for (auto& e : history) print(e);
38  }
39
40  void projects() {        // id="L-projects"
41    vfd_gps_clock();   // → 詳細ページへ遷移
42    nixied_clock();    // → 詳細ページへ遷移
43  }
44
45  void links() {           // id="L-links"
46    open("https://twitter.com/saitenntaisei");
47    open("https://github.com/saitenntaisei");
48    open("https://qiita.com/saitenntaisei");
49  }
```

実装イメージは上記通り。実画像 (saiten.png / スキルロゴ / X / GitHub / Qiita のロゴ) は対応するコメント or 関数本体内にインライン挿入する。

## 10. プロジェクト詳細ページ

`VfdGpsClockFile` / `NixiedClockFile` は `CodeShell` を再利用し、ヘッダーは「ホームへ戻る」相当の単純な構造に置き換える。`back_to_home()` リンクの `href` は `#/home` (route) を指す:

```
1   void back_to_home();   // href="#/home"
2   // vfd_gps_clock.cpp
3
4   struct Project {
5     std::string title = "VFD GPS Clock";
6     std::string url   = "https://...";
7     // 既存の説明文を std::string description に格納
8   };
9
10  void detail() { /* 既存の本文 + 画像 */ }
```

旧 `VFDGPSClockPage.jsx` / `NixiedClockPage.jsx` の本文 (テキスト・画像) はそのまま `void detail()` 相当のブロックに移植する。情報量は減らさない。

## 11. データフロー

- 状態は `route` のみ (現行と同様)
- ハッシュは `hashchange` listener で監視、`{name, params}` を導出
- 内部アンカースクロールはハッシュ変更時に副作用として実行 (`useEffect`)

## 12. レスポンシブ

- ヘッダーバー: `white-space: nowrap; overflow-x: auto;` で狭幅は横スクロール許容
- 本体: 各 `Line` は `overflow` させず、外枠 `CodeShell` にスクロールを持たせる必要があれば後で追加
- タップターゲット: ヘッダー内リンクは padding 最低 6px 確保
- 確認幅: 375px (iPhone SE)、768px (タブレット)、1280px (デスクトップ)

## 13. テスト方針

- `App.test.jsx` 拡張:
  - `#/projects/vfd-gps-clock` で `VfdGpsClockFile` がレンダリングされる
  - `#/projects/nixied-clock` で `NixiedClockFile` がレンダリングされる
  - ヘッダーの 5 リンクが存在する
  - ヘッダーリンククリックで `location.hash` が `#L-xxx` に更新される
- 新規 `Token.test.jsx`: 各 kind に対して期待される class が当たる (1 ファイル, スナップショットでも可)
- 新規 `HomeFile.test.jsx`: ヘッダー 5 リンクの可視性、`#L-projects` の anchor が DOM 上に存在
- パターン: `HashChangeEvent` ディスパッチ (既存 `App.test.jsx` 踏襲)
- 削除コンポーネントの旧テスト (もしあれば) は新コンポーネントのテストへ統合

## 14. ビルド順 (高レベル)

1. `code/` プリミティブ (`Token`, `Line`, `CodeShell`, `HeaderBar`) と `tokens.js`、対応するテスト
2. `HomeFile.jsx` を新規作成、現行 `Header / Itroduction / Skills / WorkedList / Links` の情報を移植
3. `App.jsx` のルーティングを正規表現化、`{name, params}` 形式に変更、ハンバーガー削除
4. `VfdGpsClockFile.jsx` / `NixiedClockFile.jsx` を新規、既存ページ本文を移植
5. 旧ファイル (`Skills.jsx`, `PersonalProject.jsx`, `Projects/VFDGPSClockPage.jsx`, `Projects/NixiedClockPage.jsx`) を削除し import を整理
6. ヘッダーアンカースクロール (`useEffect` で `#L-xxx` 検出 → `scrollIntoView`) を実装
7. テストを更新・追加し `npm test` パス
8. `npm run dev` で 375 / 768 / 1280px の表示を目視確認
9. `npm run build` で `docs/` に出力できることを確認

デプロイ (`npm run deploy`) は今回行わない。`master` 分岐との差異は CLAUDE.md に記載通りユーザー確認が必要。

## 15. リスクと緩和

| リスク                                                      | 緩和                                                              |
|-------------------------------------------------------------|--------------------------------------------------------------------|
| C++ 文法が強すぎ、技術者以外に "コーディング試験" に見える | コメントを多めに書き分かりやすくする / 画像は通常表示で残す       |
| Sticky ヘッダーがモバイルで横にあふれる                     | `overflow-x: auto` + 375px で実機確認                              |
| テストが行番号で壊れる                                      | テストはテキスト・role・href ベース。行番号には依存させない       |
| 旧 PersonalProject の URL を踏んだ訪問者が迷子になる        | `#/projects` を `HomeFile` + `#L-projects` スクロールへフォールバック |
| `npm run deploy` が `master` push 前提のまま                | 今回は実行しない。CLAUDE.md 記載の通り別途確認                    |

## 16. オープンクエスチョン

(なし — 主要なデザイン決定は確定済み。実装中に細部の判断が必要になれば実装プランへ繰り越す)
