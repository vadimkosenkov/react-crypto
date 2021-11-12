import React from "react";
import "./CryptoItem.scss";
import ModallAddCrypto from "../../ModalAddCrypto/ModalAddCrypto";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const CryptoItem = ({ elem, show, setShow }) => {
  const history = useHistory();
  const handleShow = () => setShow(true);

  const routeChange = (elem) => {
    const path = `./details/${elem.id}`;
    history.push(path);
  };

  const shorterValue = (value) => {
    value = +value;
    return value.toFixed(6);
  };

  return (
    <>
      <tr
        className="table__items"
        onClick={() => {
          routeChange(elem);
        }}
      >
        <td className="col-1">
          <Button variant="primary" className="w-100" onClick={handleShow}>
            BUY
          </Button>
        </td>
        <td className="col-2 h5 table__item ">{elem.name}</td>
        <td className="col-1 h5 table__item table__item_color_dg">
          {elem.symbol}
        </td>
        <td className="col-3 h4 table__item">{`$ ${shorterValue(
          elem.priceUsd
        )}`}</td>
        <td
          className={
            elem.changePercent24Hr >= 0
              ? "col-2 h5 table__item table__item_color_green"
              : "col-2 h5 table__item table__item_color_red"
          }
        >{`${shorterValue(elem.changePercent24Hr)} %`}</td>
        <td className="col-3 h5 table__item">{`$ ${shorterValue(
          elem.marketCapUsd
        )}`}</td>
      </tr>
      <ModallAddCrypto elem={elem} show={show} setShow={setShow} />
    </>
  );
};

export default CryptoItem;
