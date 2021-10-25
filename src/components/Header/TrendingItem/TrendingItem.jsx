import React from "react";

const TrendingItem = ({ name, priceUsd }) => {
  const priceShort = (price) => {
    return Math.round(price * 100) / 100;
  };

  return (
    <div className="header__item d-flex align-items-center justify-content-center">
      <div className="header__name me-3">{name}</div>
      <div className="header__price me-5">{`$ ${priceShort(priceUsd)}`}</div>
    </div>
  );
};
export default TrendingItem;
