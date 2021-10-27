import React, { useEffect, useState } from "react";
import "./App.scss";
import Main from "./components/Main/Main";
import Header from "./components/Header/Header";
import Details from "./components/Details/Details";
import { BrowserRouter, Route } from "react-router-dom";

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
    <BrowserRouter>
      <div className="app">
        <div className="wrap">
          <Header data={data} />
          <Route exact path="/" render={() => <Main data={data} />} />
          <Route path="/id" component={Details} />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
