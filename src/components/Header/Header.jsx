import React, { useEffect, useState } from "react";
import "./Header.scss";
import { Button } from "react-bootstrap";
import { connect } from "react-redux";
import { addResult } from "../../toolkitSlice/portfolioSlice";
import Modal from "react-bootstrap/Modal";
import TrendingList from "./TrendingList/TrendingList";
import { useDispatch } from "react-redux";

const Header = ({ data = "", dataAll = "" }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addResult(portfolioTotal(data, dataAll)));
  }, [data.list]);

  const portfolioTotal = (data, dataAll) => {
    // totalCost = количество * цена / округлить
    // newTotalCost = количество * Новая цена dataAll / округлить
    // diffCost = newtotalCost - totalCost
    // diffPersent = diffCost / totalCost * 100

    const totalCostArr = data.list?.map((elem) => elem.amount * elem.priceUsd);
    const totalCostSumm = totalCostArr.reduce(
      (sum, current) => sum + current,
      0
    );
    const totalCostSummShort = Math.round(totalCostSumm * 100) / 100;

    return {
      totalCost: totalCostSummShort,
      newtotalCost: "0",
      diffCost: "0",
      diffPersent: "0",
    };
    // TODO;
  };

  return (
    <header className="row header">
      <div className="header__title col-1">Crypto</div>
      <div className="header__trending col-8 d-flex align-items-center justify-content-center">
        <TrendingList />
      </div>
      <div className="header__portfolio col-3 d-flex justify-content-around align-items-center">
        Portfolio Tracker <br />
        {data.result?.totalCost} USD {data.result?.diffCost} (
        {data.result?.diffPersent}%)
        <img
          className="header__img"
          src="./portfolio.png"
          alt="logo:portfolio"
          onClick={handleShow}
        />
      </div>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            <h2>Portfolio Currency List</h2>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {data.list.length ? (
            data.list.map((elem) => {
              return (
                <div className="mb-2 d-flex align-items-center" key={elem.id}>
                  <Button variant="primary" type="submit" className="me-2">
                    Delete
                  </Button>
                  <span className="h4 me-0">
                    {`${elem.name} ${elem.symbol} | ${elem.amount} $${
                      Math.round(elem.priceUsd * elem.amount * 100) / 100
                    }`}
                  </span>
                </div>
              );
            })
          ) : (
            <div className="text-muted"> This list is empty :(</div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" size="lg" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            size="lg"
            form="buyForm"
            type="submit"
            onClick={handleClose}
          >
            Save changes
          </Button>
        </Modal.Footer>
      </Modal>
    </header>
  );
};

const mapStateToProps = (state) => {
  return {
    data: state.portfolio,
    dataAll: state.cryptoList,
  };
};

export default connect(mapStateToProps)(Header);
