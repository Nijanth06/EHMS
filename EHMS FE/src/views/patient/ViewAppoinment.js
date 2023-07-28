import React from "react";
import Carousel from "react-bootstrap/Carousel";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { CardGroup, Container } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import Pagination from "react-bootstrap/Pagination";
import { useSelector } from "react-redux";
import { decrypt } from "../../utils/aes/AES";
import { useState } from "react";
import AppointmentServices from "../../utils/services/Appointment";
import { useEffect } from "react";
import Swal from "sweetalert2";

//data.appData[0]
function ViewAppoinment() {
  const [currentAppointment, setCurrentAppointment] = useState();
  const [patientAppointmentList, setAppointmentList] = useState([{}]);
  const [isLoading, setIsLoading] = useState(false);

  const authUser = useSelector((state) => state.auth);
  const patientId = decrypt(authUser.userId);

  const accesstoken = decrypt(authUser.token);
  const config = {
    headers: {
      Authorization: `Bearer ${accesstoken}`,
    },
    responseType: "json",
  };

  const getAppoinment = async () => {
    setIsLoading(true);
    try {
      const response = await AppointmentServices.getCurrentAppointment(
        patientId,
        config
      );
      setCurrentAppointment(response.data.appData[0]);
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
      setIsLoading(false);
    }
  };

  const getAppointmentHistory = async () => {
    setIsLoading(true);
    try {
      const response = await AppointmentServices.getAppointmentHistory(
        patientId,
        config
      );
      setAppointmentList(response.data.appData);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const cancelAppoinment = async (id) => {
    const data = { patientId: patientId };
    try {
      const response = await AppointmentServices.cancelAppointment(
        id,
        data,
        config
      );
      setCurrentAppointment();
      Swal.fire({
        icon: "success",
        title: "Appoinment Canceled",
      });
    } catch (error) {
      Swal.fire({
        icon: "warning",
        title: "Error Occured",
      });
    }
  };

  useEffect(() => {
    getAppoinment();
    getAppointmentHistory();
  }, []);

  return (
    <Container className="text-center">
      <div style={{ textAlign: "center" }}>
        {/* <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="holder.js/800x400?text=First slide&bg=373940"
              alt="First slide"
            />
            <Carousel.Caption>
              <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="holder.js/800x400?text=Second slide&bg=282c34"
              alt="Second slide"
            />

            <Carousel.Caption>
              <h3>Second slide label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="holder.js/800x400?text=Third slide&bg=20232a"
              alt="Third slide"
            />

            <Carousel.Caption>
              <h3>Third slide label</h3>
              <p>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel> */}

        <br />

        <Row>
          {isLoading ? (
            <Col>
              <Card
                className="text-center"
                border="danger"
                style={{ width: "40rem" }}
              >
                <Card.Header>
                  <Card.Title>Current Appoinment</Card.Title>
                </Card.Header>
                <Card.Body>
                  <Card.Text>Loading...</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ) : currentAppointment ? (
            <Col>
              <Card
                className="text-center"
                border="danger"
                style={{ width: "40rem" }}
              >
                <Card.Header>
                  <Card.Title>Current Appoinment</Card.Title>
                </Card.Header>
                <Card.Body>
                  <Card.Text>
                    <b>Doctor : {currentAppointment.doctor.name}</b>
                  </Card.Text>
                  <Card.Text>
                    Date : {currentAppointment.otherData.date}
                  </Card.Text>
                  <Card.Text>
                    Hospital : {currentAppointment.hospital.name}
                  </Card.Text>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() =>
                      cancelAppoinment(currentAppointment.otherData.id)
                    }
                  >
                    Cancel Appoinment
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ) : (
            <Col>
              <Card
                className="text-center"
                border="danger"
                style={{ width: "40rem" }}
              >
                <Card.Header>
                  <Card.Title>Current Appoinment</Card.Title>
                </Card.Header>
                <Card.Body>
                  <Card.Text>No Current Appoinments</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          )}
        </Row>

        <br />
        <Row>
          <Col>
            <Card
              className="text-center"
              border="success"
              style={{ width: "40rem" }}
            >
              <Card.Header>
                <Card.Title>Recent Appoinment</Card.Title>
              </Card.Header>
              <Card.Body>
                <Card.Text>No Appoinments OR</Card.Text>
                <Card.Text>
                  <b>Doctor Name</b>
                </Card.Text>
                <Card.Text>Appoinment Date</Card.Text>
                <Card.Text>Hospital Name</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <br />
        <br />
        <br />

        {/* Appointment Card */}
        <Row>
          <Col>
            <Card
              className="text-center"
              border="primary"
              style={{ width: "40rem" }}
            >
              <Card.Header>
                <Card.Title> Appoinment History</Card.Title>
              </Card.Header>
              {Object.keys(patientAppointmentList).map((key) => {
                const value = patientAppointmentList[key];
                const dateTime = new Date(value.date);
                const time = dateTime.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                });
                const date = dateTime.toLocaleDateString();
                return (
                  <Card.Body>
                    <Card.Text>{value.status}</Card.Text>
                    <Card.Text>
                      <b>{value.doctorName}</b>
                    </Card.Text>
                    <Card.Text>{date + " - " + time}</Card.Text>
                    <Card.Text>{value.hospitalName}</Card.Text>
                  </Card.Body>
                );
                <hr />;
              })}
              {/* <Card.Footer center>
                <Pagination>
                  <Pagination.First />
                  <Pagination.Prev />
                  <Pagination.Item>{1}</Pagination.Item>
                  <Pagination.Ellipsis />

                  <Pagination.Item>{10}</Pagination.Item>
                  <Pagination.Item>{11}</Pagination.Item>
                  <Pagination.Item active>{12}</Pagination.Item>
                  <Pagination.Item>{13}</Pagination.Item>
                  <Pagination.Item disabled>{14}</Pagination.Item>

                  <Pagination.Ellipsis />
                  <Pagination.Item>{20}</Pagination.Item>
                  <Pagination.Next />
                  <Pagination.Last />
                </Pagination>
              </Card.Footer> */}
            </Card>
          </Col>
          {/* <Col>
            <Image
              src="https://t3.ftcdn.net/jpg/02/60/79/70/240_F_260797051_YKfZOTIhG9xWGaJKDAD0km5EhyPa4YCS.jpg"
              width="800"
            />
          </Col> */}
        </Row>
      </div>
    </Container>
  );
}

export default ViewAppoinment;
