import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row, Spinner } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Form from "react-bootstrap/Form";
import CustomCardBooking from "../../components/CustomCardBooking";
import colors from "../../utils/colors/Colors";
import HospitalServices from "../../utils/services/HospitalServices";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { decrypt } from "../../utils/aes/AES";
import Search from "../../utils/services/Search";
import moment from "moment";

const Docbook = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [date, setDate] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [hospitals, setHospitals] = useState(null);
  const [name, setName] = useState(null);
  const [response, setResponse] = useState(null);
  const [hospitalId, setHospitalId] = useState(null);
  const navigate = useNavigate();

  const authUser = useSelector((state) => state.auth);
  const accesstoken = decrypt(authUser.token);

  //Config for backend call.
  const config = {
    headers: {
      Authorization: `Bearer ${accesstoken}`,
    },
    responseType: "json",
  };
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
      setResponse(response.data);
      console.log(response.data);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };
  const getAllHospitals = async () => {
    try {
      setLoading(true);
      await HospitalServices.getHospitalDetail(config).then((response) => {
        if (response.data.length > 0) setHospitals(response.data);
        console.log(response.data);
      });
      setLoading(false);
      console.log(hospitals);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getAllHospitals();
  }, []);
  return (
    <>
      <Container className="text-center">
        <div style={{ textAlign: "center" }}>
          <br />
          <h3 className="text-primary">Booking Appointments</h3>
          <Row className="justify-content-center my-5">
            <Col md={4} sm={6} className="shadow-sm mt-6 p-4 rounded">
              <Form className="text-start">
                {/* <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label
                    style={{
                      color: colors.dark,
                      fontSize: "17px",
                      fontWeight: "400",
                    }}
                  >
                    Doctor Name
                  </Form.Label>
                  <Form.Control
                    style={{ background: colors.txtBack }}
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Form.Group> */}
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
                    // type="submit"
                    onClick={() => {
                      searchData();
                    }}
                    className="mt-4 w-100"
                    style={{
                      background: colors.primary,
                    }}
                  >
                    Search
                  </Button>
                ) : (
                  <Button
                    className="mt-4 w-100"
                    disabled
                    style={{ background: colors.background }}
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
        </div>
        <br />
        {response !== null ? (
          response.length > 0 ? (
            <section>
              {response.map((data, i) => (
                <>
                  <Col>
                    <CustomCardBooking data={{ data }} />
                  </Col>
                  <br />
                </>
              ))}
            </section>
          ) : (
            "No data found"
          )
        ) : null}
      </Container>
    </>
  );
};

export default Docbook;
