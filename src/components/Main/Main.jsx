import React from "react";
import "./Main.scss";
import { Table } from "react-bootstrap";
import CryptoList from "./CryptoList/CryptoList";
import { NavLink } from "react-router-dom";

const Main = ({ show, setShow }) => {
  const pag = ["Prev", 1, 2, 3, "Next"];
  return (
    <main className="main">
      <NavLink to="/id" className="text-decoration-none">
        <Table striped bordered hover size="md">
          <tbody>
            <CryptoList show={show} setShow={setShow} />
          </tbody>
        </Table>
      </NavLink>
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          {pag.map((elem, i) => {
            return (
              <li className="page-item" key={i * Date.now()}>
                <a className="page-link" href="#">
                  {elem}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </main>
  );
};

export default Main;
