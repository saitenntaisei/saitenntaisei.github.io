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
      <img className="w-64 h-64  relative" src="saiten.png" alt="icon" />
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

function App() {
  return (
    <div className="App">
      <header className="">
        <Header />
      </header>
      <Section sectionTitle="About" />
      <Itroduction />
      <Section sectionTitle="Works" />
      <Section sectionTitle="Links" />
    </div>
  );
}

export default App;
