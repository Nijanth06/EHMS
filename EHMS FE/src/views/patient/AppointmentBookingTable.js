import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import DoctorServices from "../../utils/services/DoctorServices";
import { useEffect } from "react";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { decrypt } from "../../utils/aes/AES";
import Loader from "../../components/Loader";
import AppointmentServices from "../../utils/services/Appointment";
import PatientServices from "../../utils/services/PatientServices";
import { Badge, Col, Container, Row } from "react-bootstrap";

import { Navigate, useNavigate, useParams } from "react-router-dom";
const AppointmentBooking = () => {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState(null);
  const [response, setResponse] = useState(null);
  const [responseData, setResponseData] = useState(null);
  const [auth, setAuth] = useState(null);
  const [app, setApp] = useState(null);
  const navigate = useNavigate();
  const handleClose = () => setShow(false);
  const handleShow = (data) => {
    setApp({
      data,
    });
    setShow(true);
  };
  const { id, date } = useParams();

  const authUser = useSelector((state) => state.auth);
  const currentPatient = useSelector((state) => state.currentUser);
  const accesstoken = decrypt(authUser.token);
  const role = decrypt(authUser.role);
  const username = decrypt(authUser.user);
  const requestedUserId = decrypt(authUser.userId);
  console.log(requestedUserId);
  const config = {
    headers: {
      Authorization: `Bearer ${accesstoken}`,
    },
    responseType: "json",
  };

  const getShedule = async () => {
    try {
      let responseAuth;
      if (role === "Receptionist") {
        if (currentPatient.email === null) {
          navigate("/receptionist-dashboard");
        } else {
          responseAuth = await PatientServices.authRecPatient(
            config,
            currentPatient.email
          );
          setAuth(responseAuth.data[0]);
        }
      } else {
        responseAuth = await PatientServices.authPatient(config);
        setAuth(responseAuth.data);
      }
      const param = { id, date };
      setLoading(true);
      const response = await DoctorServices.getShedule(param, config);
      //const responseAuth = await PatientServices.authPatient(config);
      setLoading(false);
      setResponse(response.data);
    } catch (error) {
      console.error(error);
      //error message
      setLoading(false);
      Swal.fire({
        icon: "error",
        title: "Server error",
      });
    }
  };
  const saveAppintment = async () => {
    let data = {
      sheduleId: app.data[0],
      patientId: auth.id,
      requestedUserId: requestedUserId,
      doctorId: app.data[1],
      hospitalId: app.data[10],
      paymentStatus: "pending",
      cashType: "cash",
      hospitalCharges: 2000,
      doctorCharges: 200,
      date: app.data[5],
      paymentType: "cash",
    };
    try {
      setLoading(true);
      const response = await AppointmentServices.makeAppointment(data, config);
      setLoading(false);
      handleClose();
      setResponseData(response);
      Swal.fire({
        icon: "success",
        title: "Your Appointmnent Booked",
      });
    } catch (error) {
      console.error(error);
      // error message
      setLoading(false);
      if (error.response.status === 409) {
        Swal.fire({
          icon: "error",
          title: "Can not have multiple bookings",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Unknown error occured",
        });
      }
    }
  };
  useEffect(() => {
    getShedule();
  }, [responseData]);
  return (
    <>
      <Container className="text-center">
        <div style={{ textAlign: "center" }}>
          {!loading && response !== null ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                textAlign: "center",
                lineHeight: "3.3",
                marginTop: "2rem",
              }}
            >
              <div style={{ lineHeight: "0.50" }}>
                <h3>Appointment Details</h3>
                <p>
                  {response[0][8] +
                    " " +
                    "Dr " +
                    response[0][6] +
                    " " +
                    response[0][7]}
                </p>
                <p>Years of experiance {" " + response[0][9]}</p>
              </div>
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Day</th>
                      <th>Appoinment Time</th>
                      <th>Status</th>
                      <th>Book Appointment</th>
                    </tr>
                  </thead>
                  <tbody>
                    {response.reverse().map((day, id) => (
                      <tr key={day}>
                        <td>{id + 1}</td>
                        <td>{response[id][5]}</td>
                        <td>{response[id][4]}</td>
                        <td>
                          {response[id][11] === "Available" ? (
                            <Badge bg="success">{response[id][11]}</Badge>
                          ) : (
                            <Badge bg="danger">{response[id][11]}</Badge>
                          )}
                        </td>
                        <td>
                          <Button
                            variant="primary"
                            onClick={() => handleShow(response[id])}
                            disabled={
                              response[id][11] !== "Available" ? true : false
                            }
                          >
                            Book
                          </Button>

                          <Modal
                            className="form"
                            show={show}
                            onHide={handleClose}
                            size="lg"
                            aria-labelledby="contained-modal-title-vcenter"
                            centered
                          >
                            <Modal.Header closeButton className="fill">
                              <Modal.Title id="contained-modal-title-vcenter">
                                <b />
                                Channelling Details Receipt
                              </Modal.Title>
                            </Modal.Header>

                            {app !== null ? (
                              <Modal.Body className="show-grid">
                                <Container>
                                  <Row>
                                    <Col
                                      className="square border"
                                      xs={6}
                                      md={3}
                                    >
                                      <h6 className="h6">Reference No:</h6>
                                      {app.data[0]}
                                    </Col>
                                    <Col
                                      className="square border"
                                      xs={6}
                                      md={3}
                                    >
                                      <h6 className="h6">Appoinment Time:</h6>
                                      {app.data[4]}
                                    </Col>
                                    <Col
                                      className="square border"
                                      xs={6}
                                      md={3}
                                    >
                                      <h6 className="h6">Appoinment Date:</h6>
                                      {app.data[5]}
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
                                    <Col
                                      xs={12}
                                      md={6}
                                      className="square border"
                                    >
                                      <h6>Hospital:</h6>
                                      {app.data[12]}
                                      <h6>Branch:</h6> {app.data[14]}
                                      <h6>Phone No:</h6> {app.data[13]}
                                    </Col>

                                    <Col
                                      xs={12}
                                      md={6}
                                      className="square border"
                                    >
                                      <h6>Patient Name:</h6>{" "}
                                      {auth.title +
                                        " " +
                                        auth.firstName +
                                        " " +
                                        auth.lastName}
                                      <br />
                                      <h6>Phone No:</h6> {auth.mobileNumber}
                                      <h6>NIC:</h6> {auth.nic}
                                      <h6>Email:</h6> {auth.email}
                                    </Col>
                                  </Row>
                                  <br />
                                  <h5 className="font">Appoinment Details</h5>
                                  <Row>
                                    <Col
                                      className="square border"
                                      xs={6}
                                      md={6}
                                    >
                                      <h6>Doctor Name:</h6> Dr. {app.data[6]}{" "}
                                      {app.data[7]}
                                    </Col>
                                    <Col
                                      className="square border"
                                      xs={6}
                                      md={3}
                                    >
                                      <h6>Transaction Date:</h6> coming soon
                                    </Col>
                                    <Col
                                      className="square border"
                                      xs={6}
                                      md={3}
                                    >
                                      <h6>Transaction Time:</h6> coming soon
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
                                        Next sprint
                                      </h6>
                                    </Col>
                                  </Row>
                                </Container>
                              </Modal.Body>
                            ) : (
                              <Loader />
                            )}
                            <Modal.Footer>
                              <h6>Wishing you Good Health !</h6>

                              <Button
                                variant="primary"
                                onClick={saveAppintment}
                              >
                                Confirm
                              </Button>
                              <Button variant="secondary" onClick={handleClose}>
                                Cancel
                              </Button>
                            </Modal.Footer>
                          </Modal>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <Loader />
          )}
        </div>
      </Container>
    </>
  );
};

export default AppointmentBooking;
