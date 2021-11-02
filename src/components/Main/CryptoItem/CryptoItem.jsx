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
        className="table__item"
        onClick={() => {
          routeChange(elem);
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

export default CryptoItem;
