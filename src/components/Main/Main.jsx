import React from "react";
import "./Main.scss";
import { Table } from "react-bootstrap";
import CryptoList from "./CryptoList/CryptoList";
import { NavLink } from "react-router-dom";

const Main = ({ show, setShow }) => {
  return (
    <main className="main">
      <NavLink to="/id" className="text-decoration-none">
        <Table striped bordered hover size="md">
          <tbody>
            <CryptoList show={show} setShow={setShow} />
          </tbody>
        </Table>
      </NavLink>
    </main>
  );
};

export default Main;
