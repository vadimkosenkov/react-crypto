import React, { useEffect, useState } from "react";
import "./Header.scss";
import TrendingList from "./TrendingList/TrendingList";
import { Button, Modal } from "react-bootstrap";
import { connect, useDispatch } from "react-redux";
import { addResult, deleteItem } from "../../toolkitSlice/portfolioSlice";

const Header = ({ data = "", dataAll = "" }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addResult(portfolioTotal(data, dataAll)));
  }, [data.list]);

  const portfolioTotal = (data, dataAll) => {
    const activeId = data.list?.map((elem) => elem.id);
    //массив id крипты в портфеле
    const filterData = dataAll.assets.filter(
      (elem) => activeId.indexOf(elem.id) !== -1
    ); // отфильтрованный массив всей крипты по наличию в портфеле
    const totalArr = data.list?.map((elem) => elem.amount * elem.priceUsd);
    // массив стоимостей активов портфеля
    const totalCost = totalArr.reduce((sum, current) => sum + current, 0);
    // сумма активов портфеля
    const totalShort = totalCost.toFixed(2);
    // сокращённая сумма активов портфеля
    const totalArrNew = filterData.map((elem) => {
      const amount = data.list?.find((item) => item.id === elem.id).amount;
      return amount * elem.priceUsd;
    }); // массив стоимостей активов портфеля NEW
    const totalCostNew = totalArrNew?.reduce(
      (sum, current) => sum + current,
      0
    ); // сумма активов портфеля NEW
    let diffCost = totalCostNew - totalCost;
    // разница активов в валюте
    const diffPersent = (diffCost / totalCost) * 100;
    // разница активов в процентах

    return {
      totalCost: totalShort,
      diffCost: diffCost > 0 ? `+${diffCost.toFixed(2)}` : diffCost.toFixed(2),
      diffPersent: diffPersent ? diffPersent.toFixed(2) : 0,
    };
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
              const list = data.list.filter((item) => item.id !== elem.id);
              return (
                <div className="mb-2 d-flex align-items-center" key={elem.id}>
                  <Button
                    variant="primary"
                    className="me-2"
                    onClick={() => {
                      dispatch(deleteItem(elem));
                      localStorage.setItem("list", JSON.stringify(list));
                    }}
                  >
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
          <Button
            variant="secondary"
            size="lg"
            form="buyForm"
            type="submit"
            onClick={handleClose}
          >
            Close
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
