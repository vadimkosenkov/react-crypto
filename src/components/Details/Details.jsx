import React, { useEffect, useState } from "react";
import "./Details.scss";
import ModallAddCrypto from "../ModalAddCrypto/ModalAddCrypto";
import { Button, Table, Spinner } from "react-bootstrap";
import { connect, useDispatch } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import { fetchHistory, fetchElem } from "../../utils/createAsyncThunk";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const Details = ({
  show,
  setShow,
  currentHistory,
  currentElem,
  status,
  error,
}) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const handleShow = () => setShow(true);
  const correctedHistory = [];
  const currentId = location.pathname.split("/")[2];

  useEffect(() => {
    dispatch(fetchElem(currentId));
    dispatch(fetchHistory(currentId));
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
      {status === "loading" ? (
        <div className="preloader">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <>
          {error ? (
            <div className="preloader">
              <h2>Request error. Please try again</h2>
              <br />
              <h3>{error}</h3>
            </div>
          ) : (
            <>
              <h1 className="my-2"> {currentElem.name} details info</h1>
              <div className="details__table">
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
                <NavLink to="/" className="text-decoration-none">
                  <Button variant="secondary" size="lg">
                    BACK
                  </Button>
                </NavLink>
                <Button
                  variant="primary"
                  size="lg"
                  className="mx-2"
                  onClick={handleShow}
                >
                  BUY
                </Button>
              </div>
              <div className="d-flex justify-content-center">
                <AreaChart
                  width={1200}
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
              </div>
            </>
          )}
        </>
      )}
      <ModallAddCrypto elem={currentElem} show={show} setShow={setShow} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    currentHistory: state.cryptoList.currentHistory,
    currentElem: state.cryptoList.currentElem,
    status: state.cryptoList.status,
    error: state.cryptoList.error,
  };
};

export default connect(mapStateToProps)(Details);
