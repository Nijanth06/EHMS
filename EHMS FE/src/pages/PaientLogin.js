import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import colors from "../utils/colors/Colors";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Breadcrumb, Image } from "react-bootstrap";
import img from "../assest/images/Logo.png";
import PatientServices from "../utils/services/PatientServices";
import Swal from "sweetalert2";
import { encrypt } from "../utils/aes/AES";
import jwtDecode from "jwt-decode";
import { useDispatch } from "react-redux";
import { setCredentials } from "../app/features/authSlice";
import "../styels/home.css";

const PatientLogin = (props) => {


  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  //validation libarary
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onTouched" });

  const authLogin = async (data) => {
    try {
      console.log(data);
      setLoading(true);
      const _data = await PatientServices.authloginPatient(data);

      //decoding token and getting values
      const decode = jwtDecode(_data.data.token);
      console.log(_data.data.refreshToken.user.id);

      //set values in to redux
      let authUser = {
        user: encrypt(decode.sub),
        acessToken: encrypt(_data.data.token),
        role: encrypt(decode.role),
        refreshToken: encrypt(_data.data.refreshToken.token),
        userId: encrypt(_data.data.refreshToken.user.id),
      };
      dispatch(setCredentials(authUser));

      if (location.pathname === "/login") {
          navigate('/patient-dashboard');

      } else {
        <Navigate to="/patient-dashboard" state={{ from: location }} replace />;
      }
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
      if (error.response.status === 403) {
        Swal.fire({
          icon: "error",
          title: "Please Enter Valid Credential",
        });
      } else if (error.response.status === 404) {
        Swal.fire({
          icon: "error",
          title: "User not found",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "We are facing an issue",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="home">
      <div className="secContainer container">
        <Container>
          <Row className="justify-content-center mt-5">
            <Col
              md={4}
              sm={6}
              className="shadow-sm mt-5 p-4 text-center text-center rounded"
              style={{ backgroundColor: colors.background }}
            >
              <Image
                src={img}
                className="img-fluid mt-5"
                alt="Responsive Image"
              />

              <p
                style={{
                  fontStyle: "italic",
                  fontSize: "40px",
                  fontWeight: "400",
                  fontFamily: "sans-serif",
                  color: colors.white,
                  lineHeight: "1",
                }}
              >
                Welcome <br /> eHMS
              </p>
              <Row
                style={{
                  marginTop: "70px",
                  color: colors.white,
                  fontSize: "14px",
                  fontWeight: "400",
                }}
              >
                <Col md={4}>
                  <Link to="#" style={{ color: colors.white }}>
                    <Form.Text style={{ color: colors.white }} href="#">
                      Contact Us
                    </Form.Text>{" "}
                  </Link>
                </Col>
                <Col md={4}>
                  <Link to="#" style={{ color: colors.white }}>
                    <Form.Text style={{ color: colors.white }} href="#">
                      ┃ Privacy Policy
                    </Form.Text>
                  </Link>
                </Col>
                <Col md={4}>
                  <Link to="#" style={{ color: colors.white }}>
                    <Form.Text style={{ color: colors.white }} href="#">
                      ┃ About Us
                    </Form.Text>
                  </Link>
                </Col>
              </Row>
            </Col>
            <Col
              md={5}
              sm={12}
              className="shadow-sm text-primary mt-5 p-4 text-center text-center rounded"
              style={{
                height: "500px",
                overflow: "auto",
                backgroundColor: colors.white,
                borderStyle: "solid",
                borderColor: colors.background,
              }}
            >
              <b
                style={{
                  fontSize: "40px",
                  fontFamily: "sans-serif",
                  fontWeight: "700",
                  color: colors.background,
                }}
              >
                Sign In
              </b>
              <br />
              <br />
              <Form onSubmit={handleSubmit(authLogin)} className="text-start">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label
                    style={{
                      color: colors.dark,
                      fontSize: "17px",
                      fontWeight: "400",
                    }}
                  >
                    User Name
                  </Form.Label>
                  <Form.Control
                    style={{ background: colors.txtBack }}
                    type="text"
                    className={errors.username && "border-danger"}
                    placeholder="abc@ehms.lk"
                    {...register("username", {
                      required: "Required",
                      pattern: {
                        value:
                          /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i,
                        message: "Enter valid e-mail",
                      },
                    })}
                  />
                  <Form.Text className="text-muted"></Form.Text>
                  {errors.username && (
                    <span style={{ color: colors.danger }}>
                      {errors.username.message}
                    </span>
                  )}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label
                    style={{
                      color: colors.dark,
                      fontSize: "17px",
                      fontWeight: "400",
                    }}
                  >
                    Password
                  </Form.Label>
                  <Form.Control
                    style={{ background: colors.txtBack }}
                    type="password"
                    className={errors.password && "border-danger"}
                    placeholder="Password"
                    {...register("password", {
                      required: "Required",
                    })}
                  />
                  {errors.password && (
                    <span style={{ color: colors.danger }}>
                      {errors.password.message}
                    </span>
                  )}
                </Form.Group>
                <div style={{ textAlign: "right" }}>
                  <Link
                    style={{
                      color: colors.dark,
                      fontSize: "14px",
                      fontWeight: "600",
                    }}
                    to="/patient-registration"
                  >
                    <Form.Text href="/patient-registration">
                      Forgot Password ?
                    </Form.Text>
                  </Link>
                </div>
                <div>
                  {!isLoading ? (
                    <Button
                      type="submit"
                      className="mt-4 w-100"
                      style={{
                        background: colors.background,
                        borderColor: colors.background,
                      }}

                    >
                      Sign In
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
                  <br />
                  <Link
                    style={{
                      color: colors.dark,
                      fontSize: "14px",
                      fontWeight: "600",
                    }}
                    to="/patient-registration"
                  >
                    <br />
                    <Form.Text href="/patient-registration">
                      Create New Account ?
                    </Form.Text>
                  </Link>
                </div>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    </section>
  );
};

PatientLogin.propTypes = {};

export default PatientLogin;
