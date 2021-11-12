import React from "react";

const PortfolioItem = ({ result }) => {
  return (
    <div>
      <span className="header__portfolio-item">{result?.totalCost} USD</span>
      <span
        className={
          result?.diffCost >= 0
            ? "header__portfolio-item header__portfolio-item_color_green"
            : "header__portfolio-item header__portfolio-item_color_red"
        }
      >
        {" " + result?.diffCost}
      </span>
      <span className="header__portfolio-item">
        {" " + result?.diffPersent}%
      </span>
    </div>
  );
};

export default PortfolioItem;
