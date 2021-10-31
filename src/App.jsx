import React, { useState } from "react";
import "./App.scss";
import Main from "./components/Main/Main";
import Header from "./components/Header/Header";
import Details from "./components/Details/Details";
import { BrowserRouter, Route } from "react-router-dom";

function App() {
  const [show, setShow] = useState(false);

  return (
    <BrowserRouter>
      <div className="app">
        <div className="wrap">
          <Header />
          <Route
            exact
            path="/"
            render={() => <Main show={show} setShow={setShow} />}
          />
          <Route
            path="/id"
            render={() => <Details show={show} setShow={setShow} />}
          />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
