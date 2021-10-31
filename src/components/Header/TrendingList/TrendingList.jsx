import React from "react";
import TrendingItem from "../TrendingItem/TrendingItem";
import { connect } from "react-redux";

const TrendingList = ({ data }) => {
  return data.map((elem, i) => {
    if (i < 3) {
      return (
        <TrendingItem key={elem.id} name={elem.name} priceUsd={elem.priceUsd} />
      );
    }
  });
};

const mapStateToProps = (state) => {
  return {
    data: state.cryptoList.assets,
  };
};

export default connect(mapStateToProps)(TrendingList);
