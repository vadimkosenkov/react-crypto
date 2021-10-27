import React from "react";
import { Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const Details = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <h1>Details info</h1>
      <NavLink to="/" className="text-decoration-none">
        <Button variant="primary">Home</Button>
      </NavLink>
    </div>
  );
};

export default Details;
