import React from "react";
import CryptoItem from "../CryptoItem/CryptoItem";

const CryptoList = ({ data }) => {
  return data.map((elem) => {
    return (
      <CryptoItem
        key={elem.id}
        name={elem.name}
        symbol={elem.symbol}
        priceUsd={elem.priceUsd}
        changePercent24Hr={elem.changePercent24Hr}
        marketCapUsd={elem.marketCapUsd}
      />
    );
  });
};

export default CryptoList;
