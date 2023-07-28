import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import colors from "../../utils/colors/Colors";
// import '../Style.css';
import Form from "react-bootstrap/Form";
import MovingComponent from "react-moving-text";
import Button from "react-bootstrap/Button";
import { useForm } from "react-hook-form";
import DoctorServices from "../../utils/services/DoctorServices";
import { useDispatch, useSelector } from "react-redux";
import { decrypt } from "../../utils/aes/AES";
import Swal from "sweetalert2";
import { Spinner } from "react-bootstrap";
import moment from "moment";

const DoctorTimeSchdule = () => {
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState();
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.auth);
  const accesstoken = decrypt(authUser.token);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: "onTouched" });
  const st = watch("startDate");
  const et = watch("endDate");
  const today = watch("date");

  const config = {
    headers: {
      Authorization: `Bearer ${accesstoken}`,
    },
    responseType: "json",
  };

  const validateTime = (value) => {
    if (et !== undefined && st !== undefined) {
      const date1 = new Date(`1970-01-01T${st}`);
      const date2 = new Date(`1970-01-01T${value}`);
      if (date1 > date2) {
        return "start time should be smaller than end time!";
      }

      if (
        date1.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }) ==
        date2.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })
      ) {
        return "Same time will not be accepted";
      }
    }

    return true;
  };
  const validateCurrecntTime = (value) => {
    const date1 = new Date(`1970-01-01T${st}`);
    const day2 = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    if (moment(new Date()).format("YYYY-MM-DD") === today) {
      if (
        new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }) > st
      ) {
        return "Can not add past time";
      }
    }

    return true;
  };

  const schedule = async (data) => {
    data.date = data.date;
    data.newDate = data.date;
    data.startDate = data.date + "T" + data.startDate;
    data.endDate = data.date + "T" + data.endDate;
    try {
      setLoading(true);
      const response = await DoctorServices.doctorTimeSchedule(data, config);
      setLoading(false);
      Swal.fire({
        icon: "success",
        title: "Successfully Schedule",
      });
    } catch (error) {
      console.error(error);
      //error message
      if (error.response.status === 502) {
        Swal.fire({
          icon: "error",
          title: "Already Scheduled",
        });
      } else if (error.response.status === 500) {
        Swal.fire({
          icon: "error",
          title: "Internal server error",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Please Check Time Range",
        });
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    // validateTime();
  }, []);

  return (
    <Container>
      <Row className="justify-content-center mt-2">
        <Col
          md={8}
          sm={12}
          className="shadow-sm text-primary mt-5 p-2 text-center text-center "
          style={{
            height: "620px",
            overflow: "auto",
            backgroundColor: colors.white,
            borderStyle: "solid",
            borderColor: colors.background,
          }}
        >
          <MovingComponent
            type="effect3D"
            duration="2000ms"
            delay="1s"
            direction="normal"
            timing="ease"
            fillMode="none"
            style={{ fontWeight: "bold", fontSize: "32px" }}
          >
            Schedule Your Channeling Date
            <i className="fa-solid fa-calendar-days"></i>
          </MovingComponent>

          <hr style={{ color: colors.background }} className="mt-3" />
          <Form
            onSubmit={handleSubmit(schedule)}
            className="text-start mt-3"
            style={{ paddingRight: "80px", paddingLeft: "80px" }}
          >
            <Form.Group className="mb-4 mt-4" controlId="selectedDate">
              <Form.Label
                style={{
                  color: colors.dark,
                  fontSize: "20px",
                  fontWeight: "500",
                }}
              >
                Select Date
              </Form.Label>
              <Form.Control
                style={{ background: colors.txtBack }}
                type="date"
                min={moment(new Date()).format("YYYY-MM-DD")}
                {...register("date", {
                  required: "Required",
                })}
                // className={}
              />
              {errors.date && (
                <span style={{ color: colors.danger }}>
                  {errors.date.message}
                </span>
              )}
            </Form.Group>

            <Form.Group className="mb-4 mt-4" controlId="selectedDate">
              <Form.Label
                style={{
                  color: colors.dark,
                  fontSize: "20px",
                  fontWeight: "500",
                }}
              >
                Start Time
              </Form.Label>
              <Form.Control
                style={{ background: colors.txtBack }}
                type="time"
                // id="timeFrom"
                {...register("startDate", {
                  required: "Required",
                  validate: validateCurrecntTime,
                })}
                // className={}
              />
              {errors.startDate && (
                <span style={{ color: colors.danger }}>
                  {errors.startDate.message}
                </span>
              )}
            </Form.Group>

            <Form.Group className="mb-4 mt-4" controlId="selectedDate">
              <Form.Label
                style={{
                  color: colors.dark,
                  fontSize: "20px",
                  fontWeight: "500",
                }}
              >
                End Time
              </Form.Label>
              <Form.Control
                style={{ background: colors.txtBack }}
                type="time"
                // id="timeTo"
                {...register("endDate", {
                  required: "Required",
                  validate: validateTime,
                })}
                // className={}
              />
              {errors.endDate && (
                <span style={{ color: colors.danger }}>
                  {errors.endDate.message}
                </span>
              )}
            </Form.Group>

            <hr style={{ color: colors.background }} className="mt-5 mb-4" />

            <div
              className="d-grid gap-2"
              style={{ paddingRight: "80px", paddingLeft: "80px" }}
            >
              {!loading ? (
                <Button
                  size="md"
                  type="submit"
                  style={{ backgroundColor: colors.primary }}
                >
                  <b>
                    Schedule <i className="fa-solid fa-circle-check"></i>
                  </b>
                </Button>
              ) : (
                <Button
                  variant="outline-info"
                  disabled
                  style={{ background: colors.background }}
                >
                  <Spinner animation="border" size="sm" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                  Loading
                </Button>
              )}
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

DoctorTimeSchdule.propTypes = {};

export default DoctorTimeSchdule;
