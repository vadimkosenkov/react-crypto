import React, { useEffect, useState } from "react";
import "./App.scss";
import Main from "./components/Main/Main";
import Header from "./components/Header/Header";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://api.coincap.io/v2/assets?limit=11", { method: "GET" })
      .then((response) => response.json())
      .then((result) => {
        setData([...result.data]);
      })
      .catch((error) => console.log("error", error));
  }, []);

  return (
    <div className="app">
      <div className="wrap">
        <header className="header row">
          <Header data={data} />
        </header>
        <main className="main">
          <Main data={data} />
        </main>
      </div>
    </div>
  );
}

export default App;
