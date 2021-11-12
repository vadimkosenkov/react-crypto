import React, { useEffect, useState } from "react";
import "./Header.scss";
import portfolio from "./../../assets/portfolio.png";
import monitorManager from "./../../assets/monitor_manager.png";
import TrendingList from "./TrendingList/TrendingList";
import { Button, Modal } from "react-bootstrap";
import { connect, useDispatch } from "react-redux";
import { fetchList } from "../../utils/createAsyncThunk";
import {
  addResult,
  deleteItem,
  setListFromLocalStorage,
} from "../../toolkitSlice/portfolioSlice";
import PortfolioItem from "./PortfolioItem/PortfolioItem";

const Header = ({ list, updatedList, result, assets, currentHistory }) => {
  const [show, setShow] = useState(false);
  const [ids, setIds] = useState();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const dispatch = useDispatch();

  useEffect(() => {
    getDataFromLocalStorage();
  }, [assets]);

  useEffect(() => {
    setIds(list?.map((elem) => elem.id).join(","));
  }, [list]);

  useEffect(() => {
    if (ids) {
      dispatch(fetchList(ids));
    }
  }, [assets, currentHistory]);

  useEffect(() => {
    if (list?.length && updatedList?.length) {
      dispatch(addResult(portfolioTotal(list, updatedList)));
    }
  }, [updatedList]);

  const setDataToLocalStorage = (list) => {
    localStorage.setItem("list", JSON.stringify(list));
  };

  const getDataFromLocalStorage = () => {
    const list = localStorage.getItem("list");
    if (list) {
      dispatch(setListFromLocalStorage(JSON.parse(list)));
    }
  };

  const portfolioTotal = (list, updatedList) => {
    const myTotalArr = list?.map((elem) => elem.amount * elem.priceUsd);
    const myTotalCost = myTotalArr.reduce((sum, current) => sum + current, 0);

    const totalArr = updatedList?.map((elem) => {
      const amount = list?.find((item) => item.id === elem.id).amount;
      return amount * elem.priceUsd;
    });
    const totalCost = totalArr.reduce((sum, current) => sum + current, 0);

    let diffCost = totalCost - myTotalCost;
    const diffPersent = (diffCost / totalCost) * 100;

    return {
      totalCost: myTotalCost.toFixed(2),
      diffCost: diffCost > 0 ? `+${diffCost.toFixed(2)}` : diffCost.toFixed(2),
      diffPersent: diffPersent ? diffPersent.toFixed(2) : 0,
    };
  };

  return (
    <header className="row header header_bg-color_g">
      <div className="header__title col-1">
        <img
          className="header__img"
          src={monitorManager}
          alt="logo:portfolio"
        />
      </div>
      <div className="header__trending col-8 d-flex align-items-center justify-content-center">
        <TrendingList />
      </div>
      <div className="header__portfolio col-3 d-flex justify-content-around align-items-center">
        <div>
          <div className="header__portfolio-items d-flex flex-column"></div>
          <div className="header__portfolio-item">Portfolio Tracker</div>
          {result === undefined ? <PortfolioItem result={result} /> : ""}
        </div>
        <img
          className="header__img header__img_animated"
          src={portfolio}
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
          {list.length ? (
            list.map((elem) => {
              const updList = list.filter((item) => item.id !== elem.id);
              return (
                <div className="mb-2 d-flex align-items-center" key={elem.id}>
                  <Button
                    variant="primary"
                    className="me-2"
                    onClick={() => {
                      dispatch(deleteItem(elem));
                      setDataToLocalStorage(updList);
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
    list: state.portfolio.list,
    updatedList: state.portfolio.updatedList,
    result: state.portfolio.result,
    assets: state.cryptoList.assets,
    currentHistory: state.cryptoList.currentHistory,
  };
};

export default connect(mapStateToProps)(Header);
