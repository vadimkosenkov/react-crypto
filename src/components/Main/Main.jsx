import React, { useEffect, useState } from "react";
import "./Main.scss";
import { Table } from "react-bootstrap";
import CryptoList from "./CryptoList/CryptoList";
import { NavLink } from "react-router-dom";
import { Pagination } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { getAssets } from "../../toolkitSlice/cryptoListSlice";

const Main = ({ show, setShow }) => {
  const dispatch = useDispatch();
  const [offset, setOffset] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [pagesCount, setPagesCount] = useState(5);
  const limit = 11;
  const items = [];

  useEffect(() => {
    setOffset(limit * pageNumber - limit);
  }, [pageNumber, pagesCount]);

  useEffect(() => {
    dispatch(updateAssets(limit, offset));
  }, [offset]);

  for (let i = 1; i <= pagesCount; i++) {
    items.push(
      <Pagination.Item
        key={i * Date.now()}
        active={i === pageNumber}
        onClick={() => {
          setPageNumber(i);
        }}
      >
        {i}
      </Pagination.Item>
    );
  }

  const prevClick = () => {
    if (pageNumber !== 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  const nextClick = () => {
    if (pageNumber !== 20) {
      if (pageNumber === 5 && pagesCount !== 10 && pagesCount !== 15) {
        ellipsisClick();
      } else if (pageNumber === 10 && pagesCount !== 15) {
        ellipsisClick();
      } else if (pageNumber === 15) {
        ellipsisClick();
      }
      setPageNumber(pageNumber + 1);
    }
  };

  const ellipsisClick = () => {
    if (pagesCount < 20) {
      setPagesCount(pagesCount + 5);
    }
  };

  const updateAssets = (limit, offset) => {
    return async (dispatch) => {
      try {
        const response = await fetch(
          `https://api.coincap.io/v2/assets?limit=${limit}&offset=${offset}`,
          {
            method: "GET",
            redirect: "follow",
          }
        );
        const json = await response.json();
        dispatch(getAssets(json.data));
      } catch (e) {
        console.log("Request error. Please try again", e);
      }
    };
  };

  return (
    <main className="main">
      <NavLink to="/id" className="text-decoration-none">
        <Table striped bordered hover size="md">
          <tbody>
            <CryptoList show={show} setShow={setShow} />
          </tbody>
        </Table>
      </NavLink>
      <Pagination>
        <Pagination.Prev disabled={pageNumber === 1} onClick={prevClick} />
        {items}
        <Pagination.Ellipsis
          onClick={ellipsisClick}
          disabled={pagesCount === 20}
        />
        <Pagination.Next disabled={pageNumber === 20} onClick={nextClick} />
      </Pagination>
    </main>
  );
};

export default Main;
