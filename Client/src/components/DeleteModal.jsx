import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";

function DeleteModal(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <button className="btn btn-danger mx-1 shiny w-100" onClick={handleShow}>
        <i className="fa-solid fa-trash"></i> Delete
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          This Product will be deleted permanently, are you sure?
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary shiny" onClick={handleClose}>
            <i className="fa-solid fa-xmark"></i> Close
          </button>
          <button
            className="btn btn-danger shiny"
            onClick={() => props.handleDeleteProduct(props.product)}
          >
            <i className="fa-solid fa-trash-can"></i> Delete Anyway
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteModal;
