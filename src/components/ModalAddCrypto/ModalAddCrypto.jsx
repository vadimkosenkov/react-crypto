import React, { useState } from "react";
import {
  Button,
  Form,
  FormControl,
  FormLabel,
  FormText,
} from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import { addCrypto } from "../../toolkitSlice/portfolioSlice";

const ModallAddCrypto = ({ elem, show, setShow }) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState();
  const handleClose = () => setShow(false);
  const onChange = ({ target: { value } }) => setValue(value);

  const onFormSubmit = () => {
    dispatch(addCrypto({ ...elem, amount: value }));
    setValue();
  };
  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      onClick={(e) => e.preventDefault()}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          <h2>Portfolio Tracker</h2>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <FormLabel>
            <h4>How much {elem.name} do you want to buy?</h4>
          </FormLabel>
          <FormControl
            type="number"
            placeholder="Enter the value"
            className="mb-2"
            onChange={onChange}
          ></FormControl>
          <FormText>You can only enter a number</FormText>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" size="lg" onClick={handleClose}>
          Close
        </Button>
        <Button
          variant="primary"
          size="lg"
          onClick={(e) => {
            onFormSubmit();
            handleClose();
          }}
        >
          Сonfirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default ModallAddCrypto;
