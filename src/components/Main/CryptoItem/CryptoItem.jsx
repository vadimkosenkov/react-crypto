import React, { useState } from "react";
import "./CryptoItem.scss";
import {
  Button,
  Form,
  FormControl,
  FormLabel,
  FormText,
} from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import { addCrypto } from "../../../toolkitSlice/cryptoSlice";

const CryptoItem = ({
  name,
  symbol,
  priceUsd,
  changePercent24Hr,
  marketCapUsd,
}) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [value, setValue] = useState();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const onChange = ({ target: { value } }) => setValue(value);
  const onFormSubmit = (e) => {
    e.preventDefault();
    dispatch(addCrypto(value)); //TODO
    setValue();
  };

  const shorterValue = (value) => {
    return Math.round(value * 100) / 100;
  };

  return (
    <>
      <tr className="align-middle">
        <td className="col-1">
          <Button
            variant="primary"
            size="md"
            className="w-100"
            onClick={(e) => {
              e.preventDefault();
              handleShow();
            }}
          >
            BUY
          </Button>
        </td>

        <td className="col-1 h5">{name}</td>
        <td className="col-1 h5">{symbol}</td>
        <td className="col-3 h4">{`$ ${shorterValue(priceUsd)}`}</td>
        <td className="col-3 h5">{`${shorterValue(changePercent24Hr)} %`}</td>
        <td className="col-3">{`$ ${marketCapUsd}`}</td>
      </tr>

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
          <Form onSubmit={onFormSubmit} id="buyForm">
            <FormLabel>
              <h4>How much {name} do you want to buy?</h4>
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
            form="buyForm"
            type="submit"
            onClick={handleClose}
          >
            Сonfirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CryptoItem;
