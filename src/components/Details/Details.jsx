import React, { useEffect, useState } from "react";
import "./Details.scss";
import ModallAddCrypto from "../ModalAddCrypto/ModalAddCrypto";
import { Button, Table, Spinner } from "react-bootstrap";
import { connect, useDispatch } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import {
  setLoader,
  setCurrentHistory,
  setCurrentElem,
} from "../../toolkitSlice/cryptoListSlice";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const Details = ({ show, setShow, loader, currentHistory, currentElem }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const handleShow = () => setShow(true);
  const correctedHistory = [];
  const currentId = location.pathname.split("/")[2];

  useEffect(() => {
    dispatch(getCurrentElem(currentId));
    dispatch(getCurrentHistory(currentId));
  }, [location]);

  currentHistory.map((elem, i) => {
    if (i % 7 === 0) {
      correctedHistory.push({
        name: elem.date,
        uv: elem.priceUsd,
      });
    }
  });

  return (
    <div className="details">
      <h1 className="my-2">Details info</h1>
      <div className="details__table">
        {!loader ? (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Rank</th>
                <th>Name</th>
                <th>Symbol</th>
                <th>Price USD</th>
                <th>Change Percent 24Hr</th>
                <th>Vwap 24Hr</th>
                <th>Market Cap Usd</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{currentElem.rank}</td>
                <td>{currentElem.name}</td>
                <td>{currentElem.symbol}</td>
                <td>{`$ ${currentElem.priceUsd}`}</td>
                <td>{`${currentElem.changePercent24Hr} %`}</td>
                <td>{currentElem.vwap24Hr}</td>
                <td>{`$ ${currentElem.marketCapUsd}`}</td>
              </tr>
            </tbody>
          </Table>
        ) : (
          ""
        )}
      </div>

      <NavLink to="/" className="text-decoration-none">
        <Button variant="secondary" size="lg">
          BACK
        </Button>
      </NavLink>
      <Button variant="primary" size="lg" className="mx-2" onClick={handleShow}>
        BUY
      </Button>
      <div className="d-flex justify-content-center">
        <div className="preloader">
          {loader ? <Spinner animation="border" variant="primary" /> : ""}
        </div>
        {!loader ? (
          <AreaChart
            width={850}
            height={340}
            data={correctedHistory}
            margin={{
              top: 10,
              right: 0,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="uv"
              stroke="#8884d8"
              fill="#8884d8"
            />
          </AreaChart>
        ) : (
          ""
        )}
      </div>
      <ModallAddCrypto elem={currentElem} show={show} setShow={setShow} />
    </div>
  );
};

const getCurrentElem = (id) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `https://powerful-eyrie-68033.herokuapp.com/https://api.coincap.io/v2/assets/${id}`,
        {
          method: "GET",
          edirect: "follow",
          headers: {
            Authorization: "Bearer aa2bafd7-e4d7-45e7-aa55-208e683a85f9",
          },
        }
      );
      const json = await response.json();
      dispatch(setCurrentElem(json.data));
    } catch (e) {
      console.log("Request error. Please try again", e);
    }
  };
};

const getCurrentHistory = (id) => {
  return async (dispatch) => {
    try {
      dispatch(setLoader(true));
      const response = await fetch(
        `https://powerful-eyrie-68033.herokuapp.com/https://api.coincap.io/v2/assets/${id}/history?interval=d1`,
        {
          method: "GET",
          edirect: "follow",
          headers: {
            Authorization: "Bearer aa2bafd7-e4d7-45e7-aa55-208e683a85f9",
          },
        }
      );
      const json = await response.json();
      dispatch(setCurrentHistory(json.data));
      dispatch(setLoader(false));
    } catch (e) {
      console.log("Request error. Please try again", e);
    }
  };
};

const mapStateToProps = (state) => {
  return {
    loader: state.cryptoList.loader,
    currentHistory: state.cryptoList.currentHistory,
    currentElem: state.cryptoList.currentElem,
  };
};

export default connect(mapStateToProps)(Details);
