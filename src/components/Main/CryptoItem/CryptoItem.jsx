import React from "react";
import "./CryptoItem.scss";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { setCurrentCrypto } from "../../../toolkitSlice/cryptoListSlice";
import ModallAddCrypto from "../../ModalAddCrypto/ModalAddCrypto";

const CryptoItem = ({ elem, show, setShow }) => {
  const dispatch = useDispatch();
  const handleShow = () => setShow(true);

  const shorterValue = (value) => {
    return Math.round(value * 100) / 100;
  };

  return (
    <>
      <tr
        className="align-middle"
        onClick={(e) => {
          dispatch(setCurrentCrypto(elem));
        }}
      >
        <td className="col-1">
          <Button
            variant="primary"
            className="w-100"
            onClick={(e) => {
              // e.preventDefault();
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

export default CryptoItem;
