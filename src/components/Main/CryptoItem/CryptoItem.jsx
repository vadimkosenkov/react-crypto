import React from "react";
import { Button } from "react-bootstrap";

const CryptoItem = ({
  name,
  symbol,
  priceUsd,
  changePercent24Hr,
  marketCapUsd,
}) => {
  return (
    <tr className="align-middle">
      <td className="col-1">
        <Button variant="primary" size="md" className="w-100">
          BUE
        </Button>
      </td>
      <td className="col-1 ">{name}</td>
      <td className="col-1">{symbol}</td>
      <td className="col-3">{`$ ${priceUsd}`}</td>
      <td className="col-3">{`${changePercent24Hr} %`}</td>
      <td className="col-3">{`$ ${marketCapUsd}`}</td>
    </tr>
  );
};

export default CryptoItem;
