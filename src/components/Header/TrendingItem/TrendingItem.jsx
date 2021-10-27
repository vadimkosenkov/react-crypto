import React from "react";
import "./TrendingItem.scss";

const TrendingItem = ({ name, priceUsd }) => {
  const shorterValue = (value) => {
    return Math.round(value * 100) / 100;
  };

  return (
    <div className="header__item d-flex align-items-center justify-content-center">
      <div className="header__name me-3">{name}</div>
      <div className="header__price me-5">{`$ ${shorterValue(priceUsd)}`}</div>
    </div>
  );
};
export default TrendingItem;
