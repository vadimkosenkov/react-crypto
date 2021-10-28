import React, { useEffect, useState } from "react";
import "./App.scss";
import Main from "./components/Main/Main";
import Header from "./components/Header/Header";
import Details from "./components/Details/Details";
import { BrowserRouter, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getAssets } from "./toolkitSlice/cryptoListSlice";

function App() {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  useEffect(() => {
    dispatch(updateAssets());
  }, []);

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

const updateAssets = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        "https://api.coincap.io/v2/assets?limit=11",
        { method: "GET" }
      );
      const json = await response.json();
      dispatch(getAssets(json.data));
    } catch (e) {
      console.log("Request error. Please try again", e);
    }
  };
};

export default App;
