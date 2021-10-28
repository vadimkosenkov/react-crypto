import React, { useState, useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import ModallAddCrypto from "../ModalAddCrypto/ModalAddCrypto";
import getCurrentHistory from "./../../toolkitSlice/cryptoListSlice";
import { useDispatch } from "react-redux";

const Details = ({ data, show, setShow }) => {
  const dispatch = useDispatch();
  const handleShow = () => setShow(true);

  useEffect(() => {
    dispatch(updateHistory());
    console.log(data.id);
  }, [data.id]);

  return (
    <div style={{ textAlign: "center" }}>
      <h1 className="my-2">{data.name} details info</h1>
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
            <td>{data.rank}</td>
            <td>{data.name}</td>
            <td>{data.symbol}</td>
            <td>{`$ ${data.priceUsd}`}</td>
            <td>{`${data.changePercent24Hr} %`}</td>
            <td>{data.vwap24Hr}</td>
            <td>{`$ ${data.marketCapUsd}`}</td>
          </tr>
        </tbody>
      </Table>
      <NavLink to="/" className="text-decoration-none">
        <Button variant="secondary" size="lg">
          BACK
        </Button>
      </NavLink>
      <Button variant="primary" size="lg" className="mx-2" onClick={handleShow}>
        BUY
      </Button>
      <h3 className="my-3">Тут будет history</h3>
      <ModallAddCrypto elem={data} show={show} setShow={setShow} />
    </div>
  );
};

const updateHistory = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        "https://api.coincap.io/v2/assets/bitcoin/history?interval=d1",
        { method: "GET" }
      );
      const json = await response.json();
      dispatch(getCurrentHistory(json.data));
    } catch (e) {
      console.log("Request error. Please try again", e);
    }
  };
};

const mapStateToProps = (state) => {
  return {
    data: state.cryptoList.currentCrypto,
  };
};

export default connect(mapStateToProps)(Details);
