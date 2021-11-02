import React from "react";
import "./CryptoItem.scss";
import ModallAddCrypto from "../../ModalAddCrypto/ModalAddCrypto";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import {
  getCurrentHistory,
  setCurrentCrypto,
  setLoader,
} from "../../../toolkitSlice/cryptoListSlice";

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
          <Button variant="primary" className="w-100" onClick={handleShow}>
            BUY
          </Button>
        </td>
        <td className="col-2 h5">{elem.name}</td>
        <td className="col-1 h5">{elem.symbol}</td>
        <td className="col-3 h4">{`$ ${shorterValue(elem.priceUsd)}`}</td>
        <td className="col-2 h5">{`${shorterValue(
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
      dispatch(setLoader(true));
      const response = await fetch(
        `https://powerful-eyrie-68033.herokuapp.com/https://api.coincap.io/v2/assets/${elem.id}/history?interval=d1`,
        {
          method: "GET",
          edirect: "follow",
          headers: {
            Authorization: "Bearer aa2bafd7-e4d7-45e7-aa55-208e683a85f9",
          },
        }
      );
      const json = await response.json();
      dispatch(setLoader(false));
      dispatch(getCurrentHistory(json.data));
    } catch (e) {
      console.log("Request error. Please try again", e);
    }
  };
};

export default CryptoItem;
