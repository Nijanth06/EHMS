import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../styels/home.css";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Modal,
  Row,
  Spinner,
} from "react-bootstrap";
import colors from "../utils/colors/Colors";
import moment from "moment";
import { useEffect } from "react";
import HospitalServices from "../utils/services/HospitalServices";
import { decrypt } from "../utils/aes/AES";
import { useSelector } from "react-redux";
import Search from "../utils/services/Search";
import CustomCardBooking from "../components/CustomCardBooking";
import Swal from "sweetalert2";

const Home = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [date, setDate] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [hospitals, setHospitals] = useState(null);
  const [name, setName] = useState(null);
  const [hospitalId, setHospitalId] = useState(null);
  const authUser = useSelector((state) => state.auth);
  const accesstoken = decrypt(authUser.token);
  const [show, setShow] = React.useState(false);
  // const dispatch = useDispatch();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  //Config for backend call.
  const config = {
    headers: {
      Authorization: `Bearer ${accesstoken}`,
    },
    responseType: "json",
  };
  const [response, setResponse] = useState(null);
  console.log(hospitals);
  const searchData = async () => {
    let data = {
      name: name,
      hospitalId: hospitalId,
      date: date !== null ? moment(new Date(date)).format("YYYY-MM-DD") : null,
    };
    console.log(data);

    try {
      setLoading(true);
      const response = await Search.SearchAvailableDoctor(data);
      setLoading(false);
      handleShow();
      setResponse(response.data);
      console.log(response.data);
    } catch (error) {
      setLoading(false);
      Swal.fire({
        icon: "error",
        title: "Hmm We are facing an issue",
      });
      console.error(error);
    }
  };
  const getAllHospitals = async () => {
    try {
      setLoading(true);
      await HospitalServices.getHospitalDetail(config).then((response) => {
        if (response.data.length > 0) setHospitals(response.data);
      });
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getAllHospitals();
  }, []);
  return (
    <section className="home">
      <div className="secContainer container">
        <div className="homeText">
          <h1 className="title">Plan Your Appointment</h1>

          <p className="subTitle">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </p>

          <button className="btn">
            <a href="#">Make Appointmnent</a>
          </button>
          <Container style={{ marginTop: "4rem" }} className="d-flex justify-content-center">
            <Row>
              <Col xs={12}>
                <Form className="text-start">
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label
                      style={{
                        color: colors.dark,
                        fontSize: "17px",
                        fontWeight: "400",
                      }}
                    >
                      Hospital Name
                    </Form.Label>
                    <Form.Select
                      style={{ background: colors.txtBack }}
                      type="text"
                      onChange={(e) => setHospitalId(e.target.value)}
                    >
                      <option value="">Select Hospital</option>
                      {hospitals?.map((hos, id) => {
                        <option
                          key={id}
                          value={hos.id}
                          onChange={(e) => setName(e.target.value)}
                        >
                          {hos.name + hos.branch}
                        </option>;
                        return (
                          <>
                            <option key={id} value={hos.id}>
                              {hos.name + " " + hos.branch}
                            </option>
                            ;
                          </>
                        );
                      })}
                    </Form.Select>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label htmlFor="date">Select Date</Form.Label>
                    <DatePicker
                      selected={date}
                      minDate={startDate}
                      onChange={(date) => setDate(date)}
                      className="form-control"
                      dateFormat="yyyy-MM-dd"
                    />
                  </Form.Group>
                  {!isLoading ? (
                    <Button
                      onClick={() => {
                        searchData();
                      }}
                      className="mt-4 w-100"
                    >
                      Search
                    </Button>
                  ) : (
                    <Button
                      className="mt-4 w-100"
                      disabled
                    >
                      <Spinner animation="border" size="sm" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </Spinner>
                      Loading
                    </Button>
                  )}
                </Form>
              </Col>
            </Row>
          </Container>
        </div>
        <Modal
          show={show}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Body>
            <>
              {response !== null ? (
                response.length > 0 ? (
                  <section>
                    {response.map((data, i) => (
                      <>
                        <CustomCardBooking data={{ data }} />
                        <br />
                      </>
                    ))}
                  </section>
                ) : (
                  "No data found"
                )
              ) : null}

              <br />
            </>
          </Modal.Body>
          <Modal.Footer>
            <Button
              onClick={() => {
                handleClose();
              }}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </section>
  );
};

export default Home;
