import React from "react";
import TrendingItem from "../TrendingItem/TrendingItem";

const TrendingList = ({ data }) => {
  return data.map((elem) => {
    return elem.rank < 4 ? (
      <TrendingItem key={elem.id} name={elem.name} priceUsd={elem.priceUsd} />
    ) : (
      ""
    );
  });
};
export default TrendingList;
