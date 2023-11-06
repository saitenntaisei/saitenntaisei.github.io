import "./App.css";

function Header() {
  return (
    <div className="shadow-md  flex justify-center">
      <h1 className="text-black	 text-5xl	 font-mono	 m-7">
        <span>saiten's Portfolio</span>
      </h1>
    </div>
  );
}
function Section({ sectionTitle }) {
  return (
    <div>
      <h1 className="text-black text-center text-4xl font-medium font-mono underline m-7 ">
        <span>{sectionTitle}</span>
      </h1>
    </div>
  );
}
function Itroduction() {
  return (
    <div className="flex justify-center items-center">
      <img
        className="object-contain w-64 h-64  relative"
        src="saiten.png"
        alt="icon"
      />
      <div className="text-black text-2xl font-semibold font-mono text-left shadow-md border border-gray-200	 rounded">
        <ul className="list-disc list-inside m-5">
          <li>saiten</li>
          <li>
            Status
            <ul className="list-disc list-inside ml-7">
              <li>Tokyo Institute of Technology</li>
              <li>B3</li>
            </ul>
          </li>
          <li>
            Affiliation
            <ul className="list-disc list-inside ml-7">
              <li>デジタル創作同好会traP</li>
              <li>ロボット技術研究会Rogy </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
}

function WorkedList() {
  return (
    <div className="flex justify-center items-center">
      <div className="text-black text-2xl font-semibold font-mono text-left shadow-inner border	 rounded">
        <ul className="mx-20 my-7 list-disc list-inside">
          <li> pixiv 2022.4-2022.10</li>
          <li>DeNA 2023.9 (3 days)</li>
          <li>Wantedly 2023.9 (3 weeks)</li>
        </ul>
      </div>
    </div>
  );
}
function Links() {
  return (
    <div className="flex justify-center items-center space-x-10">
      <a href="https://twitter.com/sort_reverse">
        <img
          className="object-contain w-10 h-10  relative"
          src="x.png"
          alt="Twitter"
        />
      </a>
      <a href="https://github.com/saitenntaisei">
        <img
          className="object-contain w-10 h-10  relative"
          src="github.png"
          alt="github"
        />
      </a>
      <a href="https://qiita.com/saitenntaisei">
        <img
          className="object-contain w-10 h-10  relative"
          src="qiita.png"
          alt="qiita"
        />
      </a>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <header className="">
        <Header />
      </header>
      <Section sectionTitle="About" />
      <Itroduction />
      <Section sectionTitle="Works" />
      <WorkedList />
      <Section sectionTitle="Links" />
      <Links />
    </div>
  );
}

export default App;
