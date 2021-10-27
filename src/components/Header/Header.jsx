import React, { useState } from "react";
import "./Header.scss";
import TrendingList from "./TrendingList/TrendingList";
import { useSelector } from "react-redux";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";

const Header = ({ data }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { totalCost, diffCost, diffPersent } = useSelector(
    (state) => state.crypto.portfolioSumm
  );

  return (
    <header className="row header">
      <div className="header__title col-1">Crypto</div>
      <div className="header__trending col-8 d-flex align-items-center justify-content-center">
        <TrendingList data={data} />
      </div>
      <div className="header__portfolio col-3 d-flex justify-content-around align-items-center">
        Portfolio Tracker <br />
        {totalCost} USD {diffCost} ({diffPersent}
        %)
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
          <div className="mb-2">
            <Button variant="primary" type="submit" className="me-2">
              Delete
            </Button>
            <span className="h4">биткоин 6шт на 360000,42$</span>
          </div>
          <div className="mb-2">
            <Button variant="primary" type="submit" className="me-2">
              Delete
            </Button>
            <span className="h4">киткоин 5шт на 250000,42$</span>
          </div>
          <div className="mb-2">
            <Button variant="primary" type="submit" className="me-2">
              Delete
            </Button>
            <span className="h4">фиткоин 4шт на 120000,42$</span>
          </div>
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
export default Header;
