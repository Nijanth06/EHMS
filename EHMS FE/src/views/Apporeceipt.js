import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import "../../styels/appoinment.css";

function Apporeceipt(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>

      <Modal
        className="form"
        show={show}
        onHide={handleClose}
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton className="fill">
          <Modal.Title id="contained-modal-title-vcenter">
            {" "}
            <b />
            Channelling Details Receipt
          </Modal.Title>
        </Modal.Header>

        <Modal.Body className="show-grid">
          <Container>
            <Row>
              <Col className="square border" xs={6} md={3}>
                <h6 className="h6">Reference No:</h6>
                0989098777
              </Col>
              <Col className="square border" xs={6} md={3}>
                <h6 className="h6">Appoinment No:</h6>
                55
              </Col>
              <Col className="square border" xs={6} md={3}>
                <h6 className="h6">Appoinment Date:</h6>
                08/05/23
              </Col>
              <Col className="square border" xs={6} md={3}>
                <h6 className="h6">Appoinment Time:</h6>
                08.40 PM
              </Col>
            </Row>

            <br />
            <Row>
              <Col xs={12} md={6}>
                <h5 className="font">Hospital Details</h5>{" "}
              </Col>
              <Col xs={12} md={6}>
                {" "}
                <h5 className="font">Personal Details</h5>
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={6} className="square border">
                <h6>Hospital:</h6>
                Asiri Hospital
                <h6>Address:</h6> Asiri Hospital-galle
                <h6>Phone No:</h6> 0912278965
                <h6>Hospital Reference No:</h6> vj098776655
              </Col>

              <Col xs={12} md={6} className="square border">
                <h6>Patient Name:</h6> amila <br />
                <h6>Phone No:</h6> 0771543548
                <h6>NIC:</h6> 0912278965v
                <h6>Email:</h6> amila@gmail.com
              </Col>
            </Row>
            <br />
            <h5 className="font">Appoinment Details</h5>
            <Row>
              <Col className="square border" xs={6} md={6}>
                <h6>Doctor Name:</h6> DR KR KASUN
              </Col>
              <Col className="square border" xs={6} md={3}>
                <h6>Transaction Date:</h6> 07/05/23
              </Col>
              <Col className="square border" xs={6} md={3}>
                <h6>Transaction Time:</h6> 07.20 AM
              </Col>
            </Row>

            <br />
            <h5 className="font">Payment Details</h5>
            <Row className="square border">
              <Col xs={6} md={4}>
                <h6>Doctor Fee:</h6>
                <h6>Hospital Fee:</h6>
                <h6>Channel Fee:</h6>

                <h6 className="square border-top">
                  <b />
                  Total Fee:
                </h6>
              </Col>
              <Col className="price" xs={6} md={2}>
                1000LKR 800LKR 400LKR
                <h6 className="square border-top">
                  <b />
                  2200LKR
                </h6>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <h6>Wishing you Good Health !</h6>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

function App() {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <Button variant="primary" onClick={() => setModalShow(true)}>
        Launch modal with grid
      </Button>

      <Apporeceipt show={modalShow} onHide={() => setModalShow(false)} />
    </>
  );
}

export default Apporeceipt;
