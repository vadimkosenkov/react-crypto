import React, { useEffect, useState } from "react";
import "./Main.scss";
import CryptoList from "./CryptoList/CryptoList";
import { Spinner, Table, Pagination } from "react-bootstrap";
import { connect, useDispatch } from "react-redux";
import { fetchAssets } from "../../utils/createAsyncThunk";

const Main = ({ show, setShow, status, error }) => {
  const dispatch = useDispatch();
  const [offset, setOffset] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [pagesCount, setPagesCount] = useState(5);
  const limit = 11;
  const items = [];

  useEffect(() => {
    setOffset(limit * pageNumber - limit);
  }, [dispatch, pageNumber, pagesCount]);

  useEffect(() => {
    dispatch(fetchAssets([limit, offset]));
  }, [dispatch, offset]);

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

  return (
    <>
      <main className="main">
        <div className="preloader">
          {status === "loading" && (
            <Spinner animation="border" variant="primary" />
          )}
          {error && (
            <>
              <h2>Request error. Please try again</h2>
              <br />
              <h3>{error}</h3>
            </>
          )}
        </div>
        <Table striped bordered hover size="md" className="table">
          <tbody>
            <CryptoList show={show} setShow={setShow} />
          </tbody>
        </Table>
      </main>
      <Pagination>
        <Pagination.Prev disabled={pageNumber === 1} onClick={prevClick} />
        {items}
        <Pagination.Ellipsis
          onClick={ellipsisClick}
          disabled={pagesCount === 20}
        />
        <Pagination.Next disabled={pageNumber === 20} onClick={nextClick} />
      </Pagination>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    status: state.cryptoList.status,
    error: state.cryptoList.error,
  };
};

export default connect(mapStateToProps)(Main);
