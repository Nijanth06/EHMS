import { useState, React, useEffect } from "react";
import img from "../assest/images/Logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  Col,
  Container,
  Row,
  Image,
  Form,
  Button,
  Spinner,
  Badge,
} from "react-bootstrap";
import colors from "../utils/colors/Colors";
import Swal from "sweetalert2";
import PatientServices from "../utils/services/PatientServices";
// import '../pages/Style.css';
import "../styels/home.css";

const PatientRegisteration = () => {
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  //react hook form validation
  const {
    register,
    unregister,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: "onTouched" });
  const password = watch("password");

  const [hasGurdian, setHasGurdian] = useState(false);
  const [age, setAge] = useState(null);
  const [birthDate, setBirthDate] = useState(new Date());
  const [date, setDate] = useState();

  const handleRadioButtonChange = (event) => {
    if (event.target.value === "yes") {
      setHasGurdian(true);
      register("createdBy");
    } else {
      setHasGurdian(false);
      unregister("guardianName");
      unregister("guardianMobileNumber");
    }
  };

  const formatDate = () => {
    var d = new Date(),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;
    setDate([year, month, day].join("-"));
  };
  //calculating age
  var calculate_age = (dob1) => {
    var today = new Date();
    var birthDate = new Date(dob1);
    var age_now = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age_now--;
    }
    if (age_now < 18) {
      setHasGurdian(true);
      unregister("nic");
    } else {
      setHasGurdian(false);
    }
    setAge(age_now);
    console.log(today.toString(), today);
    return age_now;
  };

  const handleChange_age = (event) => {
    setBirthDate({ dob1: event.target.value }, () => {});

    var age_latest = { age_latest: calculate_age(event.target.value) };
    console.log(age_latest);

    setBirthDate({ age1: age_latest }, () => {
      console.log("Age:", birthDate.age1);
    });
  };
  //backend api calling
  const registerPatient = async (data) => {
    try {
      setLoading(true);
      //http and apis functions in util/services folder
      const _data = await PatientServices.registerPatient(data);
      console.log(_data);
      Swal.fire({
        icon: "success",
        title: "Registration Successfull!",
      });
      setLoading(false);
      navigate("/login");
    } catch (error) {
      console.error("Error:", error.response.data.message);
      if (error) {
        Swal.fire({
          icon: "error",
          title: error.response.data.message,
        });
        setLoading(false);
      }
    }
  };
  useEffect(() => {
    formatDate();
  }, []);

  return (
    <>
      <section className="home">
        <div className="secContainer container">
          <Container>
            <Row className="justify-content-center mt-3">
              <Col
                md={4}
                sm={6}
                className="shadow-sm text-primary mt-5 p-4 text-center text-center"
                style={{ backgroundColor: colors.background }}
              >
                <Image src={img} className="img-fluid mt-5" />
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
                md={6}
                sm={12}
                className="shadow-sm text-dark mt-5 p-4 text-center text-center"
                style={{
                  height: "500px",
                  overflow: "auto",
                  backgroundColor: colors.white,
                  borderColor: colors.background,
                  borderStyle: "solid",
                }}
              >
                <p
                  style={{
                    fontSize: "40px",
                    fontFamily: "sans-serif",
                    fontWeight: "700",
                    color: colors.background,
                  }}
                >
                  Patient Registeration{" "}
                  <i className="fa-solid fa-address-card"></i>
                </p>
                <Form
                  className="text-start"
                  onSubmit={handleSubmit(registerPatient)}
                >
                  <Form.Group className="mb-4" controlId="formBasicPassword">
                    <Form.Label>
                      <b>Title</b>
                    </Form.Label>
                    <Form.Select
                      style={{ background: colors.txtBack }}
                      className={errors.title && "border-danger"}
                      {...register("title", {
                        required: "Required",
                      })}
                    >
                      <option value="">-----Select Title-----</option>
                      <option value="Mr">Mr</option>
                      <option value="Mrs">Mrs</option>
                      <option value="Miss">Miss</option>
                    </Form.Select>
                    {errors.title && (
                      <span style={{ color: colors.danger }}>
                        {errors.title.message}
                      </span>
                    )}
                  </Form.Group>
                  <Form.Group className="mb-4" controlId="formBasicName">
                    <Form.Label>
                      <b>First Name</b>
                    </Form.Label>
                    <Form.Control
                      style={{ background: colors.txtBack }}
                      className={errors.firstName && "border-danger"}
                      type="text"
                      placeholder="Enter your first name"
                      {...register("firstName", {
                        required: "Required",
                        pattern: {
                          value: /^[a-zA-Z]+$/,
                          message:
                            "Please enter valid name. Should not contain numbers",
                        },
                      })}
                    />
                    {errors.firstName && (
                      <span style={{ color: colors.danger }}>
                        {errors.firstName.message}
                      </span>
                    )}
                  </Form.Group>

                  {
                    <Form.Group className="mb-4" controlId="formBasicName">
                      <Form.Label>
                        <b>Last Name</b>
                      </Form.Label>
                      <Form.Control
                        style={{ background: colors.txtBack }}
                        className={errors.lastName && "border-danger"}
                        type="text"
                        placeholder="Enter your last name"
                        {...register("lastName", {
                          required: "Required",
                          pattern: {
                            value: /^[a-zA-Z]+$/,
                            message:
                              "Please enter valid name. Should not contain numbers",
                          },
                        })}
                      />
                      {errors.lastName && (
                        <span style={{ color: colors.danger }}>
                          {errors.lastName.message}
                        </span>
                      )}
                    </Form.Group>
                  }

                  {
                    <Form.Group className="mb-4" controlId="formBasicDob">
                      <Form.Label>
                        <b>Date Of birth</b>
                      </Form.Label>
                      <Form.Control
                        style={{ background: colors.txtBack }}
                        type="date"
                        max={date}
                        className={errors.dateOfBirth && "border-danger"}
                        placeholder="Enter your date of birth"
                        {...register("dateOfBirth", {
                          required: "Required",
                        })}
                        onChange={handleChange_age}
                      />
                      {errors.dateOfBirth && (
                        <span style={{ color: colors.danger }}>
                          {errors.dateOfBirth.message}
                        </span>
                      )}
                    </Form.Group>
                  }

                  <Form.Group className="mb-4" controlId="formBasicAddress">
                    <Form.Label>
                      <b>Address</b>
                    </Form.Label>
                    <Form.Control
                      style={{ background: colors.txtBack }}
                      type="text"
                      className={errors.address && "border-danger"}
                      placeholder="Enter your address"
                      {...register("address", {
                        required: "Required",
                      })}
                    />
                    {errors.address && (
                      <span style={{ color: colors.danger }}>
                        {errors.address.message}
                      </span>
                    )}
                  </Form.Group>

                  <Form.Group className="mb-4" controlId="formBasicPassword">
                    <Form.Label>
                      <b>Gender</b>
                    </Form.Label>
                    <Form.Select
                      style={{ background: colors.txtBack }}
                      className={errors.gender && "border-danger"}
                      {...register("gender", {
                        required: "Required",
                      })}
                    >
                      <option value="">-----Select gender-----</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </Form.Select>
                    {errors.gender && (
                      <span style={{ color: colors.danger }}>
                        {errors.gender.message}
                      </span>
                    )}
                  </Form.Group>

                  <Form.Group className="mb-4" controlId="formBasicContact">
                    <Form.Label>
                      <b>Contact Number</b>
                    </Form.Label>
                    <Form.Control
                      style={{ background: colors.txtBack }}
                      type="text"
                      placeholder="Enter your mobile number"
                      className={errors.mobileNumber && "border-danger"}
                      {...register("mobileNumber", {
                        required: "Required",
                        pattern: {
                          value: /^[0-9]{10}$/,
                          message: "Enter valid contact number",
                        },
                      })}
                    />
                    {errors.mobileNumber && (
                      <span style={{ color: colors.danger }}>
                        {errors.mobileNumber.message}
                      </span>
                    )}
                  </Form.Group>

                  {age > 18 || age == null ? (
                    <>
                      <Form.Group className="mb-4" controlId="formBasicNic">
                        <Form.Label>
                          <b>NIC Number</b>
                        </Form.Label>
                        <Form.Control
                          style={{ background: colors.txtBack }}
                          type="text"
                          placeholder="Enter your NIC number"
                          className={errors.nic && "border-danger"}
                          {...register("nic", {
                            required: "Required",
                            pattern: {
                              value: /^\d{12}$|\d{9}V$/,
                              message: "Enter valid nic",
                            },
                          })}
                        />
                        {errors.nic && (
                          <span style={{ color: colors.danger }}>
                            {errors.nic.message}
                          </span>
                        )}
                      </Form.Group>

                      <Form.Group
                        className="mb-4"
                        controlId="formBasicGaurdian"
                      >
                        <Form.Label>
                          <b>Account Created by</b>
                        </Form.Label>
                        <span>
                          <Form.Check
                            type="radio"
                            value="yes"
                            name="radio"
                            aria-label="radio 1"
                            onChange={handleRadioButtonChange}
                          />
                          Gurdian
                        </span>
                        <Form.Check
                          type="radio"
                          value="no"
                          name="radio"
                          aria-label="radio 1"
                          onChange={handleRadioButtonChange}
                          defaultChecked
                        />
                        Self
                      </Form.Group>
                    </>
                  ) : null}

                  {hasGurdian ? (
                    <>
                      <Form.Group
                        className="mb-4"
                        controlId="formBasicGaurdian"
                      >
                        <Form.Label>
                          <b>Guardian Name</b>
                        </Form.Label>
                        <Form.Control
                          style={{ background: colors.txtBack }}
                          type="text"
                          placeholder="Enter your guardian name"
                          className={errors.guardianName && "border-danger"}
                          {...register("guardianName", {
                            required: "Required",
                            pattern: {
                              value: /^[a-zA-Z]+$/,
                              message:
                                "Please enter valid name. Should not contain numbers",
                            },
                          })}
                        />
                        {errors.guardianName && (
                          <span style={{ color: colors.danger }}>
                            {errors.guardianName.message}
                          </span>
                        )}
                      </Form.Group>

                      <Form.Group
                        className="mb-5"
                        controlId="formBasicGuardianContact"
                      >
                        <Form.Label>
                          <b>Guardian Contact</b>
                        </Form.Label>
                        <Form.Control
                          style={{ background: colors.txtBack }}
                          type="text"
                          className={
                            errors.guardianMobileNumber && "border-danger"
                          }
                          placeholder="Enter your guardian mobile number"
                          {...register("guardianMobileNumber", {
                            required: "Required",
                            pattern: {
                              value: /^[0-9]{10}$/, //positive int = /^(0|[1-9]\d*)$/  negative & positive decimal= /^-?(0|[1-9]\d*)(\.\d+)?$/
                              message: "Enter valid contact number",
                            },
                          })}
                        />
                        {errors.guardianMobileNumber && (
                          <span style={{ color: colors.danger }}>
                            {errors.guardianMobileNumber.message}
                          </span>
                        )}
                      </Form.Group>
                    </>
                  ) : null}

                  <Form.Group className="mb-4" controlId="formBasicEmail">
                    <Form.Label>
                      <b>Email address</b>
                    </Form.Label>
                    <Form.Control
                      style={{ background: colors.txtBack }}
                      type="email"
                      className={errors.email && "border-danger"}
                      placeholder="Enter your email"
                      {...register("email", {
                        required: "Required",
                        pattern: {
                          value:
                            /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i,
                          message: "Enter valid e-mail",
                        },
                      })}
                    />
                    {/* <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text> */}
                    {errors.email && (
                      <span style={{ color: colors.danger }}>
                        {errors.email.message}
                      </span>
                    )}
                  </Form.Group>

                  <Form.Group className="mb-4" controlId="formBasicPassword">
                    <Form.Label>
                      <b>Password</b>
                    </Form.Label>
                    <Form.Control
                      style={{ background: colors.txtBack }}
                      type="password"
                      placeholder="password"
                      className={errors.password && "border-danger"}
                      {...register("password", {
                        required: "Required",
                        pattern: {
                          value: /^(?=.*[\W_])(?=.{8,10}$)[\w\W]*$/,
                          message:
                            "must include special characters.minimum 8 length",
                        },
                      })}
                    />
                    {errors.password && (
                      <span style={{ color: colors.danger }}>
                        {errors.password.message}
                      </span>
                    )}
                  </Form.Group>

                  <Form.Group className="mb-4" controlId="formBasicPassword">
                    <Form.Label>
                      <b>Confirm Password</b>
                    </Form.Label>
                    <Form.Control
                      style={{ background: colors.txtBack }}
                      type="password"
                      placeholder="password"
                      className={errors.Password2 && "border-danger"}
                      {...register("Password2", {
                        required: "Required",
                        validate: (value) =>
                          value === password || "password do no match",
                      })}
                    />
                    {errors.Password2 && (
                      <span style={{ color: colors.danger }}>
                        {errors.Password2.message}
                        <br />
                      </span>
                    )}
                  </Form.Group>
                  <div className="text-center">
                    {!isLoading ? (
                      <Button
                        type="submit"
                        className="mt-4 mb-4 w-100 btnSubmit"
                      >
                        <b>Submit </b> <i className="fa-solid fa-thumbs-up"></i>
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
                  </div>
                  <Link to="/login" style={{ color: colors.secondary }}>
                    <Form.Text
                      className="text-muted"
                      style={{
                        color: colors.dark,
                        fontSize: "14px",
                        fontWeight: "600",
                      }}
                    >
                      Already have an account?
                    </Form.Text>
                  </Link>
                </Form>
              </Col>
            </Row>
          </Container>
        </div>
      </section>
    </>
  );
};

export default PatientRegisteration;
