import React from "react";
import TrendingList from "./TrendingList/TrendingList";

const Header = ({ data }) => {
  return (
    <>
      <div className="header__title col-1">Crypto</div>
      <div className="header__trending col-8 d-flex align-items-center justify-content-center">
        <TrendingList data={data} />
      </div>
      <div className="header__portfolio col-3 d-flex justify-content-center align-items-center">
        Portfolio Tracker <br />
        134,32 USD +2,38 (1,80 %)
      </div>
    </>
  );
};
export default Header;
