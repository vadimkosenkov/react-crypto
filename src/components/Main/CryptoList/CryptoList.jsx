import React from "react";
import CryptoItem from "../CryptoItem/CryptoItem";
import { connect } from "react-redux";

const CryptoList = ({ data, show, setShow }) => {
  return data.map((elem) => {
    return (
      <CryptoItem elem={elem} key={elem.id} show={show} setShow={setShow} />
    );
  });
};

const mapStateToProps = (state) => {
  return {
    data: state.cryptoList.assets,
  };
};

export default connect(mapStateToProps)(CryptoList);
