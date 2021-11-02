import React from "react";
import "./Details.scss";
import ModallAddCrypto from "../ModalAddCrypto/ModalAddCrypto";
import { Button, Table, Spinner } from "react-bootstrap";
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

const Details = ({ data, show, setShow, currentHistory, loader }) => {
  const handleShow = () => setShow(true);
  let correctHistory = [];

  currentHistory.map((elem, i) => {
    if (i % 7 === 0) {
      correctHistory.push({
        name: elem.date,
        uv: elem.priceUsd,
      });
    }
  });

  return (
    <div className="details">
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
        <div className="preloader">
          {loader ? <Spinner animation="border" variant="primary" /> : ""}
        </div>
        {!loader ? (
          <AreaChart
            width={850}
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
        <ModallAddCrypto elem={data} show={show} setShow={setShow} />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    data: state.cryptoList.currentCrypto,
    currentHistory: state.cryptoList.currentHistory,
    loader: state.cryptoList.loader,
  };
};

export default connect(mapStateToProps)(Details);
