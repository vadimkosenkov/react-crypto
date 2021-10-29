import React from "react";
import { Button, Table } from "react-bootstrap";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import ModallAddCrypto from "../ModalAddCrypto/ModalAddCrypto";

const Details = ({ data, show, setShow, currentHistory }) => {
  const handleShow = () => setShow(true);
  let correctHistory = [];

  currentHistory.map((elem, i) => {
    if (i % 30 === 0) {
      correctHistory.push({
        name: elem.date,
        uv: elem.priceUsd,
      });
    }
  });

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
      <div className="d-flex justify-content-center">
        <AreaChart
          width={750}
          height={350}
          data={correctHistory}
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
          <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
        </AreaChart>
        <ModallAddCrypto elem={data} show={show} setShow={setShow} />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    data: state.cryptoList.currentCrypto,
    currentHistory: state.cryptoList.currentHistory,
  };
};

export default connect(mapStateToProps)(Details);
