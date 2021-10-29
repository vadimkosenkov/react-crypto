import React from "react";
import "./CryptoItem.scss";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import {
  getCurrentHistory,
  setCurrentCrypto,
} from "../../../toolkitSlice/cryptoListSlice";
import ModallAddCrypto from "../../ModalAddCrypto/ModalAddCrypto";

const CryptoItem = ({ elem, show, setShow }) => {
  const dispatch = useDispatch();
  const handleShow = () => setShow(true);

  const shorterValue = (value) => {
    value = +value;
    return value.toFixed(6);
  };

  return (
    <>
      <tr
        className="align-middle"
        onClick={() => {
          dispatch(setCurrentCrypto(elem));
          dispatch(updateHistory(elem));
        }}
      >
        <td className="col-1">
          <Button
            variant="primary"
            className="w-100"
            onClick={(e) => {
              handleShow();
            }}
          >
            BUY
          </Button>
        </td>
        <td className="col-1 h5">{elem.name}</td>
        <td className="col-1 h5">{elem.symbol}</td>
        <td className="col-3 h4">{`$ ${shorterValue(elem.priceUsd)}`}</td>
        <td className="col-3 h5">{`${shorterValue(
          elem.changePercent24Hr
        )} %`}</td>
        <td className="col-3">{`$ ${shorterValue(elem.marketCapUsd)}`}</td>
      </tr>
      <ModallAddCrypto elem={elem} show={show} setShow={setShow} />
    </>
  );
};

const updateHistory = (elem) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `https://api.coincap.io/v2/assets/${elem.id}/history?interval=d1`,
        { method: "GET" }
      );
      const json = await response.json();
      dispatch(getCurrentHistory(json.data));
    } catch (e) {
      console.log("Request error. Please try again", e);
    }
  };
};

export default CryptoItem;
