import React from "react";
import { Table } from "react-bootstrap";
import CryptoList from "./CryptoList/CryptoList";

const Main = ({ data }) => {
  return (
    <Table striped bordered hover size="md">
      <tbody>
        <CryptoList data={data} />
      </tbody>
    </Table>
  );
};

export default Main;
