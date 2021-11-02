import React, { useEffect } from "react";
import CryptoItem from "../CryptoItem/CryptoItem";
import { setListToLocalStorage } from "../../../toolkitSlice/portfolioSlice";
import { connect, useDispatch } from "react-redux";

const CryptoList = ({ data, show, setShow }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    getDataFromLocalStorage();
  }, [data]);

  const getDataFromLocalStorage = () => {
    const list = localStorage.getItem("list");
    if (list) {
      dispatch(setListToLocalStorage(JSON.parse(list)));
    }
  };

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
