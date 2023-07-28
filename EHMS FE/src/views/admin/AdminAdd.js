import React from "react";
import { useState } from "react";
import { Row, Button, Modal, Form, Container, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import CustomCardAdd from "../../components/CustomCardAdd";
import { decrypt } from "../../utils/aes/AES";
import colors from "../../utils/colors/Colors";
import DoctorServices from "../../utils/services/DoctorServices";
import NurseServices from "../../utils/services/NurseServices";
import ReceptionistServices from "../../utils/services/ReceptionistServices";
import HospitalServices from "../../utils/services/HospitalServices";
import { useEffect } from "react";
import RecordPersonService from "../../utils/services/RecordPersonService";


const AdminAdd = () => {
  const [docShow, setDocShow] = useState(false);
  const [nurseShow, setNurseShow] = useState(false);
  const [hosShow, setHosShow] = useState(false);
  const [hospitals, setHospitals] = useState(null);
  const [recpShow, setRecpShow] = useState(false);
  const [rcPersonShow, setRcPersonShow] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleDocShow = () => setDocShow(true);
  const handleNurseShow = () => setNurseShow(true);
  const handleRecpShow = () => setRecpShow(true);
  const handleHosShow = () => setHosShow(true);
  const handleRcPersonShow = () => setRcPersonShow(true);

  const handleDocClose = () => {
    setDocShow(false);
    docReset();
  };
  const handleNurseClose = () => {
    setNurseShow(false);
    nurseReset();
  };
  const handleHosClose = () => {
    setHosShow(false);
    hosReset();
  };
  const handleRecpClose = () => {
    setRecpShow(false);
    recpReset();
  };

  const handleRcPersonClose = () => {
    setRcPersonShow(false);
    rcPersonReset();
  }

  //react hook form validation
  const {
    register: docRegister,
    handleSubmit: docHandleSubmit,
    reset: docReset,
    formState: { errors: docErrors },
  } = useForm({ mode: "onTouched" });

  const {
    register: nurseRegister,
    handleSubmit: nurseHandleSubmit,
    reset: nurseReset,
    formState: { errors: nurseErrors },
  } = useForm({ mode: "onTouched" });

  const {
    register: recpRegister,
    handleSubmit: recpHandleSubmit,
    reset: recpReset,
    formState: { errors: recpErrors },
  } = useForm({ mode: "onTouched" });

  const {
    register: hosRegister,
    handleSubmit: hosHandleSubmit,
    reset: hosReset,
    formState: { errors: hosErrors },
  } = useForm({ mode: "onTouched" });

  const {
    register: rcPersonRegister,
    handleSubmit: rcPersonSubmit,
    reset: rcPersonReset,
    formState: { errors: rcPersonErrors },
  } = useForm({ mode: "onTouched" });

  const authUser = useSelector((state) => state.auth);
  const accesstoken = decrypt(authUser.token);
  //console.log("accsessToken", accesstoken);

  //Config for backend call.
  const config = {
    headers: {
      Authorization: `Bearer ${accesstoken}`,
    },
    responseType: "json",
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

  //Doctor Registration
  const doctorRegistration = async (data) => {
    try {
      setLoading(true);
      //calling services
      await DoctorServices.registerDoctor(data, config);
      setLoading(false);
      handleDocClose();
      Swal.fire({
        icon: "success",
        title: "Successfully Registered",
      });
    } catch (error) {
      console.error("Error:", error);
      if (error.response.status === 400) {
        Swal.fire({
          icon: "error",
          title: "Email or NIC Already Exists",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Hmm Something wrong",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  //nurse registration
  const nurseRegistration = async (data) => {
    try {
      setLoading(true);
      //calling services
      await NurseServices.registerNurse(data, config);
      setLoading(false);
      handleNurseClose();
      Swal.fire({
        icon: "success",
        title: "Successfully Registered",
      });
    } catch (error) {
      console.error("Error:", error);
      if (error.response.status === 400) {
        Swal.fire({
          icon: "error",
          title: "Email or NIC Already Exists",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Hmm Something wrong",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  //Record Person Register
  const rcPersonRegisteration = async (data) => {
    try {
      setLoading(true);
      //calling services
      await RecordPersonService.registerRcPerson(data, config);
      setLoading(false);
      handleRcPersonClose();
      Swal.fire({
        icon: "success",
        title: "Successfully Registered",
      });
    } catch (error) {
      console.error("Error:", error);
      if (error.response.status === 400) {
        Swal.fire({
          icon: "error",
          title: "Email or NIC Already Exists",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Hmm Something wrong",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  //Receptionists registration
  const recpRegistration = async (data) => {
    try {
      setLoading(true);
      //calling services
      await ReceptionistServices.registerReceptionist(data, config);
      handleRecpClose();
      setLoading(false);
      Swal.fire({
        icon: "success",
        title: "Successfully Registered",
      });
    } catch (error) {
      console.error("Error:", error);
      if (error.response.status === 400) {
        Swal.fire({
          icon: "error",
          title: "Email or NIC Already Exists",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Hmm Something wrong",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  //Hospital registration
  const hosRegistration = async (data) => {
    try {
      setLoading(true);
      //calling services
      await HospitalServices.registerHospital(data, config);
      setLoading(false);
      handleHosClose();
      Swal.fire({
        icon: "success",
        title: "Suceessfully Registered",
      });
      setTimeout(window.location.reload(), 5000);
    } catch (error) {
      console.error("Error:", error);
      if (error.response.status === 400) {
        Swal.fire({
          icon: "error",
          title: "Already Exists",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Hmm Something wrong",
        });
      }
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getAllHospitals();
  }, []);
  return (
    <>

      <Container className="text-center">
        <div style={{ textAlign: "center" }}>
          {hospitals === null ? null : (
            <>
              {" "}
              <h2
                className="text-secondary"
                style={{ marginTop: "0px", marginBottom: "40px" }}
              >
                Add Employees
              </h2>
              <Row style={{ marginBottom: "15px" }}>
                <CustomCardAdd
                  title={"Add Receptionists"}
                  button={
                    <Button variant="light" onClick={handleRecpShow}>
                      <b>Add</b>
                    </Button>
                  }
                />
                <CustomCardAdd
                  title={"Add Doctors"}
                  button={
                    <Button variant="light" variant="outline-dark" onClick={handleDocShow}>
                      <b>Add</b>
                    </Button>
                  }
                />
                <CustomCardAdd
                  title={"Add Nurses"}
                  button={
                    <Button variant="light" onClick={handleNurseShow}>
                      <b>Add</b>
                    </Button>
                  }
                />
                <CustomCardAdd
                  title={"Add Record Person"}
                  button={
                    <Button variant="light" onClick={handleRcPersonShow}>
                      <b>Add</b>
                    </Button>
                  }
                />
              </Row>
            </>
          )}
          <h2
            className="text-secondary"
            style={{ marginTop: "50px", marginBottom: "40px" }}
          >
            Add Hospitals
          </h2>
          <Row style={{ marginBottom: "15px" }}>
            <CustomCardAdd
              style={{ width: "50%" }}
              title={"Add Hospitals"}
              button={
                <Button variant="light" onClick={handleHosShow}>
                  <b>Add</b>
                </Button>
              }
            />
          </Row>

          {/*----------------------------------- modals ---------------------------------------------*/}
          {hospitals ? (
            <>
              {/* doctor */}
              <Modal show={docShow} onHide={handleDocClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Add Doctor</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form onSubmit={docHandleSubmit(doctorRegistration)}>
                    <Form.Group className="mb-3" controlId="formBasicTitle">
                      <Form.Label>Title</Form.Label>
                      <Form.Label style={{ color: colors.required }}>
                        *
                      </Form.Label>
                      <Form.Select
                        className={docErrors.title && "border-danger"}
                        {...docRegister("title", {
                          required: "Required",
                        })}
                      >
                        <option value="">Select Title</option>
                        <option value="Mr">Mr</option>
                        <option value="Mrs">Mrs</option>
                        <option value="Ms">Ms</option>
                      </Form.Select>
                      {docErrors.title && (
                        <span style={{ color: colors.required }}>
                          {docErrors.title.message}
                        </span>
                      )}
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicFirstName">
                      <Form.Label>First Name</Form.Label>
                      <Form.Label style={{ color: colors.required }}>
                        *
                      </Form.Label>
                      <Form.Control
                        type="text"
                        className={docErrors.firstName && "border-danger"}
                        placeholder="Enter First Name"
                        {...docRegister("firstName", {
                          required: "Required",
                          pattern: {
                            value: /^[a-zA-Z]+$/,
                            message:
                              "Please enter valid name. Should not contain numbers",
                          },
                        })}
                      />
                      {docErrors.firstName && (
                        <span style={{ color: colors.required }}>
                          {docErrors.firstName.message}
                        </span>
                      )}
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicLastName">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Label style={{ color: colors.required }}>
                        *
                      </Form.Label>

                      <Form.Control
                        type="text"
                        placeholder="Enter Last Name"
                        className={docErrors.lastName && "border-danger"}
                        {...docRegister("lastName", {
                          required: "Required",
                          pattern: {
                            value: /^[a-zA-Z]+$/,
                            message:
                              "Please enter valid name. Should not contain numbers",
                          },
                        })}
                      />
                      {docErrors.lastName && (
                        <span style={{ color: colors.required }}>
                          {docErrors.lastName.message}
                        </span>
                      )}
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicLastName">
                      <Form.Label>Address</Form.Label>
                      <Form.Label style={{ color: colors.required }}>
                        *
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter address"
                        className={docErrors.address && "border-danger"}
                        {...docRegister("address", {
                          required: "Required",
                        })}
                      />
                      {docErrors.address && (
                        <span style={{ color: colors.required }}>
                          {docErrors.address.message}
                        </span>
                      )}
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicNIC">
                      <Form.Label>National Identity Card Number</Form.Label>
                      <Form.Label style={{ color: colors.required }}>
                        *
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter NIC"
                        className={docErrors.nic && "border-danger"}
                        {...docRegister("nic", {
                          required: "Required",
                          pattern: {
                            value: /^([0-9]{9}[x|X|v|V]|[0-9]{12})$/,
                            message: "Enter valid nic",
                          },
                        })}
                      />
                      {docErrors.nic && (
                        <span style={{ color: colors.required }}>
                          {docErrors.nic.message}
                        </span>
                      )}
                    </Form.Group>

                    <Form.Group
                      className="mb-3"
                      controlId="formBasicSpecialzation"
                    >
                      <Form.Label>Specialization</Form.Label>
                      <Form.Label style={{ color: colors.required }}>
                        *
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter specialization"
                        className={docErrors.specialization && "border-danger"}
                        {...docRegister("specialization", {
                          required: "Required",
                          pattern: {
                            value: /^[a-zA-Z ]+$/,
                            message: "Letters only",
                          },
                        })}
                      />
                      {docErrors.specialization && (
                        <span style={{ color: colors.required }}>
                          {docErrors.specialization.message}
                        </span>
                      )}
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Email Address</Form.Label>
                      <Form.Label style={{ color: colors.required }}>
                        *
                      </Form.Label>
                      <Form.Control
                        type="email"
                        className={docErrors.email && "border-danger"}
                        placeholder="Enter email"
                        {...docRegister("email", {
                          required: "Required",
                          pattern: {
                            value:
                              /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.]{3,}[a-zA-Z]{3,}([a-zA-Z]{2,2})?$/,
                            message: "Enter valid e-mail",
                          },
                        })}
                      />
                      {/* <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text> */}
                      {docErrors.email && (
                        <span style={{ color: colors.required }}>
                          {docErrors.email.message}
                        </span>
                      )}
                    </Form.Group>

                    <Form.Group
                      className="mb-3"
                      controlId="formBasicExperience"
                    >
                      <Form.Label>Years of Experience</Form.Label>
                      <Form.Label style={{ color: colors.required }}>
                        *
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Years of Experience"
                        className={docErrors.yearOfExp && "border-danger"}
                        {...docRegister("yearOfExp", {
                          required: "Required",
                          pattern: {
                            value: /^([1-9]|[1-4][0-9])$/,
                            message: "Enter valid year",
                          },
                        })}
                      />
                      {docErrors.yearOfExp && (
                        <span style={{ color: colors.required }}>
                          {docErrors.yearOfExp.message}
                        </span>
                      )}
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicHospital">
                      <Form.Label>Hospital</Form.Label>
                      <Form.Label style={{ color: colors.required }}>
                        *
                      </Form.Label>
                      <Form.Select
                        className={docErrors.hospitalId && "border-danger"}
                        {...docRegister("hospitalId", {
                          required: "Required",
                        })}
                      >
                        <option value="">Select Hospital</option>
                        {hospitals?.map((hos, id) => {
                          <option key={id} value={hos.id}>
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
                      {docErrors.hospitalId && (
                        <span style={{ color: colors.required }}>
                          {docErrors.hospitalId.message}
                        </span>
                      )}
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicContact">
                      <Form.Label>Contact Number</Form.Label>
                      <Form.Label style={{ color: colors.required }}>
                        *
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Contact Number"
                        className={docErrors.mobileNumber && "border-danger"}
                        {...docRegister("mobileNumber", {
                          required: "Required",
                          pattern: {
                            value: /^[0-9]{10}$/,
                            message: "Enter valid contact number",
                          },
                        })}
                      />
                      {docErrors.mobileNumber && (
                        <span style={{ color: colors.required }}>
                          {docErrors.mobileNumber.message}
                        </span>
                      )}
                    </Form.Group>
                    {loading ? <Button
                      className="mt-4 w-100"
                      disabled
                      style={{ background: colors.background }}
                    >
                      <Spinner animation="border" size="sm" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </Spinner>
                      Loading
                    </Button> : <Button variant="primary" type="submit">
                      Submit
                    </Button>}
                  </Form>
                </Modal.Body>
              </Modal>
            </>
          ) : null}
          {/* Nurse  */}
          <Modal show={nurseShow} onHide={handleNurseClose}>
            <Modal.Header closeButton>
              <Modal.Title>Add Nurse</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={nurseHandleSubmit(nurseRegistration)}>
                <Form.Group className="mb-3" controlId="formBasicTitle">
                  <Form.Label>Title</Form.Label>
                  <Form.Label style={{ color: colors.required }}>*</Form.Label>
                  <Form.Select
                    className={nurseErrors.title && "border-danger"}
                    {...nurseRegister("title", {
                      required: "Required",
                    })}
                  >
                    <option value="">Select Title</option>
                    <option value="Mr">Mr</option>
                    <option value="Mrs">Mrs</option>
                    <option value="Ms">Ms</option>
                  </Form.Select>
                  {nurseErrors.title && (
                    <span style={{ color: colors.required }}>
                      {nurseErrors.title.message}
                    </span>
                  )}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicFirstName">
                  <Form.Label>First Name</Form.Label>
                  <Form.Label style={{ color: colors.required }}>*</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter First Name"
                    className={nurseErrors.firstName && "border-danger"}
                    {...nurseRegister("firstName", {
                      required: "Required",
                      pattern: {
                        value: /^[a-zA-Z]+$/,
                        message:
                          "Please enter valid name. Should not contain numbers",
                      },
                    })}
                  />
                  {nurseErrors.firstName && (
                    <span style={{ color: colors.required }}>
                      {nurseErrors.firstName.message}
                    </span>
                  )}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicLastName">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Label style={{ color: colors.required }}>*</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Last Name"
                    className={nurseErrors.lastName && "border-danger"}
                    {...nurseRegister("lastName", {
                      required: "Required",
                      pattern: {
                        value: /^[a-zA-Z]+$/,
                        message:
                          "Please enter valid name. Should not contain numbers",
                      },
                    })}
                  />
                  {nurseErrors.lastName && (
                    <span style={{ color: colors.required }}>
                      {nurseErrors.lastName.message}
                    </span>
                  )}
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicLastName">
                  <Form.Label>Address</Form.Label>
                  <Form.Label style={{ color: colors.required }}>*</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter address"
                    className={nurseErrors.address && "border-danger"}
                    {...nurseRegister("address", {
                      required: "Required",
                    })}
                  />
                  {nurseErrors.address && (
                    <span style={{ color: colors.required }}>
                      {nurseErrors.address.message}
                    </span>
                  )}
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Label style={{ color: colors.required }}>*</Form.Label>
                  <Form.Control
                    type="email"
                    className={nurseErrors.email && "border-danger"}
                    placeholder="Enter email"
                    {...nurseRegister("email", {
                      required: "Required",
                      pattern: {
                        value:
                          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.]{3,}[a-zA-Z]{3,}([a-zA-Z]{2,2})?$/,
                        message: "Enter valid e-mail",
                      },
                    })}
                  />
                  {/* <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text> */}
                  {nurseErrors.email && (
                    <span style={{ color: colors.required }}>
                      {nurseErrors.email.message}
                    </span>
                  )}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicNIC">
                  <Form.Label>National Identity Card Number</Form.Label>
                  <Form.Label style={{ color: colors.required }}>*</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter NIC"
                    className={nurseErrors.nic && "border-danger"}
                    {...nurseRegister("nic", {
                      required: "Required",
                      pattern: {
                        value: /^\d{12}$|\d{9}V$/,
                        message: "Enter valid nic",
                      },
                    })}
                  />
                  {nurseErrors.nic && (
                    <span style={{ color: colors.required }}>
                      {nurseErrors.nic.message}
                    </span>
                  )}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicHospital">
                  <Form.Label>Hospital</Form.Label>
                  <Form.Label style={{ color: colors.required }}>*</Form.Label>
                  <Form.Select
                    className={nurseErrors.hospitalId && "border-danger"}
                    {...nurseRegister("hospitalId", {
                      required: "Required",
                    })}
                  >
                    <option value="">Select Hospital</option>
                    {hospitals?.map((hos, id) => {
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
                  {nurseErrors.hospitalId && (
                    <span style={{ color: colors.required }}>
                      {nurseErrors.hospitalId.message}
                    </span>
                  )}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicContact">
                  <Form.Label>Contact Number</Form.Label>
                  <Form.Label style={{ color: colors.required }}>*</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Contact Number"
                    className={nurseErrors.mobileNumber && "border-danger"}
                    {...nurseRegister("mobileNumber", {
                      required: "Required",
                      pattern: {
                        value: /^[0-9]{10}$/,
                        message: "Enter valid contact number",
                      },
                    })}
                  />
                  {nurseErrors.mobileNumber && (
                    <span style={{ color: colors.required }}>
                      {nurseErrors.mobileNumber.message}
                    </span>
                  )}
                </Form.Group>
                {loading ? <Button
                  className="mt-4 w-100"
                  disabled
                  style={{ background: colors.background }}
                >
                  <Spinner animation="border" size="sm" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                  Loading
                </Button> : <Button variant="primary" type="submit">
                  Submit
                </Button>}
              </Form>
            </Modal.Body>
          </Modal>

          {/* Record Person  */}
          <Modal show={rcPersonShow} onHide={handleRcPersonClose}>
            <Modal.Header closeButton>
              <Modal.Title>Add Record Person</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={rcPersonSubmit(rcPersonRegisteration)}>
                <Form.Group className="mb-3" controlId="formBasicTitle">
                  <Form.Label>Title</Form.Label>
                  <Form.Label style={{ color: colors.required }}>*</Form.Label>
                  <Form.Select
                    className={rcPersonErrors.title && "border-danger"}
                    {...rcPersonRegister("title", {
                      required: "Required",
                    })}
                  >
                    <option value="">Select Title</option>
                    <option value="Mr">Mr</option>
                    <option value="Mrs">Mrs</option>
                    <option value="Ms">Ms</option>
                  </Form.Select>
                  {rcPersonErrors.title && (
                    <span style={{ color: colors.required }}>
                      {rcPersonErrors.title.message}
                    </span>
                  )}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicFirstName">
                  <Form.Label>First Name</Form.Label>
                  <Form.Label style={{ color: colors.required }}>*</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter First Name"
                    className={rcPersonErrors.firstName && "border-danger"}
                    {...rcPersonRegister("firstName", {
                      required: "Required",
                      pattern: {
                        value: /^[a-zA-Z]+$/,
                        message:
                          "Please enter valid name. Should not contain numbers",
                      },
                    })}
                  />
                  {rcPersonErrors.firstName && (
                    <span style={{ color: colors.required }}>
                      {rcPersonErrors.firstName.message}
                    </span>
                  )}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicLastName">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Label style={{ color: colors.required }}>*</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Last Name"
                    className={rcPersonErrors.lastName && "border-danger"}
                    {...rcPersonRegister("lastName", {
                      required: "Required",
                      pattern: {
                        value: /^[a-zA-Z]+$/,
                        message:
                          "Please enter valid name. Should not contain numbers",
                      },
                    })}
                  />
                  {rcPersonErrors.lastName && (
                    <span style={{ color: colors.required }}>
                      {rcPersonErrors.lastName.message}
                    </span>
                  )}
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicLastName">
                  <Form.Label>Address</Form.Label>
                  <Form.Label style={{ color: colors.required }}>*</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter address"
                    className={rcPersonErrors.address && "border-danger"}
                    {...rcPersonRegister("address", {
                      required: "Required",
                    })}
                  />
                  {rcPersonErrors.address && (
                    <span style={{ color: colors.required }}>
                      {rcPersonErrors.address.message}
                    </span>
                  )}
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Label style={{ color: colors.required }}>*</Form.Label>
                  <Form.Control
                    type="email"
                    className={rcPersonErrors.email && "border-danger"}
                    placeholder="Enter email"
                    {...rcPersonRegister("email", {
                      required: "Required",
                      pattern: {
                        value:
                          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.]{3,}[a-zA-Z]{3,}([a-zA-Z]{2,2})?$/,
                        message: "Enter valid e-mail",
                      },
                    })}
                  />
                  {/* <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text> */}
                  {rcPersonErrors.email && (
                    <span style={{ color: colors.required }}>
                      {rcPersonErrors.email.message}
                    </span>
                  )}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicNIC">
                  <Form.Label>National Identity Card Number</Form.Label>
                  <Form.Label style={{ color: colors.required }}>*</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter NIC"
                    className={rcPersonErrors.nic && "border-danger"}
                    {...rcPersonRegister("nic", {
                      required: "Required",
                      pattern: {
                        value: /^\d{12}$|\d{9}V$/,
                        message: "Enter valid nic",
                      },
                    })}
                  />
                  {rcPersonErrors.nic && (
                    <span style={{ color: colors.required }}>
                      {rcPersonErrors.nic.message}
                    </span>
                  )}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicHospital">
                  <Form.Label>Hospital</Form.Label>
                  <Form.Label style={{ color: colors.required }}>*</Form.Label>
                  <Form.Select
                    className={nurseErrors.hospitalId && "border-danger"}
                    {...rcPersonRegister("hospitalId", {
                      required: "Required",
                    })}
                  >
                    <option value="">Select Hospital</option>
                    {hospitals?.map((hos, id) => {
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
                  {rcPersonErrors.hospitalId && (
                    <span style={{ color: colors.required }}>
                      {rcPersonErrors.hospitalId.message}
                    </span>
                  )}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicContact">
                  <Form.Label>Contact Number</Form.Label>
                  <Form.Label style={{ color: colors.required }}>*</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Contact Number"
                    className={rcPersonErrors.mobileNumber && "border-danger"}
                    {...rcPersonRegister("mobileNumber", {
                      required: "Required",
                      pattern: {
                        value: /^[0-9]{10}$/,
                        message: "Enter valid contact number",
                      },
                    })}
                  />
                  {rcPersonErrors.mobileNumber && (
                    <span style={{ color: colors.required }}>
                      {rcPersonErrors.mobileNumber.message}
                    </span>
                  )}
                </Form.Group>
                {loading ? <Button
                  className="mt-4 w-100"
                  disabled
                  style={{ background: colors.background }}
                >
                  <Spinner animation="border" size="sm" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                  Loading
                </Button> : <Button variant="primary" type="submit">
                  Submit
                </Button>}
              </Form>
            </Modal.Body>
          </Modal>


          {/* Receptionists */}
          <Modal show={recpShow} onHide={handleRecpClose}>
            <Modal.Header closeButton>
              <Modal.Title>Add Receptionists</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={recpHandleSubmit(recpRegistration)}>
                <Form.Group className="mb-3" controlId="formBasicTitle">
                  <Form.Label>Title</Form.Label>
                  <Form.Label style={{ color: colors.required }}>*</Form.Label>
                  <Form.Select
                    className={recpErrors.title && "border-danger"}
                    {...recpRegister("title", {
                      required: "Required",
                    })}
                  >
                    <option value="">Select Title</option>
                    <option value="1">Mr</option>
                    <option value="2">Mrs</option>
                    <option value="3">Ms</option>
                  </Form.Select>
                  {recpErrors.title && (
                    <span style={{ color: colors.required }}>
                      {recpErrors.title.message}
                    </span>
                  )}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicFirstName">
                  <Form.Label>First Name</Form.Label>
                  <Form.Label style={{ color: colors.required }}>*</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter First Name"
                    className={recpErrors.firstName && "border-danger"}
                    {...recpRegister("firstName", {
                      required: "Required",
                      pattern: {
                        value: /^[a-zA-Z]+$/,
                        message:
                          "Please enter valid name. Should not contain numbers",
                      },
                    })}
                  />
                  {recpErrors.firstName && (
                    <span style={{ color: colors.required }}>
                      {recpErrors.firstName.message}
                    </span>
                  )}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicLastName">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Label style={{ color: colors.required }}>*</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Last Name"
                    className={recpErrors.lastName && "border-danger"}
                    {...recpRegister("lastName", {
                      required: "Required",
                      pattern: {
                        value: /^[a-zA-Z]+$/,
                        message:
                          "Please enter valid name. Should not contain numbers",
                      },
                    })}
                  />
                  {recpErrors.lastName && (
                    <span style={{ color: colors.required }}>
                      {recpErrors.lastName.message}
                    </span>
                  )}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicNIC">
                  <Form.Label>National Identity Card Number</Form.Label>
                  <Form.Label style={{ color: colors.required }}>*</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter NIC"
                    className={recpErrors.nic && "border-danger"}
                    {...recpRegister("nic", {
                      required: "Required",
                      pattern: {
                        value: /^\d{12}$|\d{9}V$/,
                        message: "Enter valid nic",
                      },
                    })}
                  />
                  {recpErrors.nic && (
                    <span style={{ color: colors.required }}>
                      {recpErrors.nic.message}
                    </span>
                  )}
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicLastName">
                  <Form.Label>Address</Form.Label>
                  <Form.Label style={{ color: colors.required }}>*</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter address"
                    className={recpErrors.address && "border-danger"}
                    {...recpRegister("address", {
                      required: "Required",
                    })}
                  />
                  {recpErrors.address && (
                    <span style={{ color: colors.required }}>
                      {recpErrors.address.message}
                    </span>
                  )}
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmpNo">
                  <Form.Label>Employee Email</Form.Label>
                  <Form.Label style={{ color: colors.required }}>*</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Employee Email"
                    className={recpErrors.email && "border-danger"}
                    {...recpRegister("email", { 
                      required: "Required",
                      pattern: {
                        value:
                          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.]{3,}[a-zA-Z]{3,}([a-zA-Z]{2,2})?$/,
                        message: "Enter valid e-mail",
                      },
                    })}
                  />
                  {recpErrors.email && (
                    <span style={{ color: colors.required }}>
                      {recpErrors.email.message}
                    </span>
                  )}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicHospital">
                  <Form.Label>Hospital</Form.Label>
                  <Form.Label style={{ color: colors.required }}>*</Form.Label>
                  <Form.Select
                    className={recpErrors.hospitalId && "border-danger"}
                    {...recpRegister("hospitalId", {
                      required: "Required",
                    })}
                  >
                    <option value="">Select Hospital</option>
                    {hospitals?.map((hos, id) => {
                      <option key={id} value={hos.id}>
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
                  {recpErrors.hospitalId && (
                    <span style={{ color: colors.required }}>
                      {recpErrors.hospitalId.message}
                    </span>
                  )}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicContact">
                  <Form.Label>Contact Number</Form.Label>
                  <Form.Label style={{ color: colors.required }}>*</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Contact Number"
                    className={recpErrors.mobileNumber && "border-danger"}
                    {...recpRegister("mobileNumber", {
                      required: "Required",
                      pattern: {
                        value: /^[0-9]{10}$/,
                        message: "Enter valid contact number",
                      },
                    })}
                  />
                  {recpErrors.mobileNumber && (
                    <span style={{ color: colors.required }}>
                      {recpErrors.mobileNumber.message}
                    </span>
                  )}
                </Form.Group>

                {loading ? <Button
                  className="mt-4 w-100"
                  disabled
                  style={{ background: colors.background }}
                >
                  <Spinner animation="border" size="sm" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                  Loading
                </Button> : <Button variant="primary" type="submit">
                  Submit
                </Button>}              </Form>
            </Modal.Body>
          </Modal>

          {/* Hospital  */}
          <Modal show={hosShow} onHide={handleHosClose}>
            <Modal.Header closeButton>
              <Modal.Title>Add Hospital</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={hosHandleSubmit(hosRegistration)}>
                <Form.Group className="mb-3" controlId="formBasicHospitalName">
                  <Form.Label>Hospital Name</Form.Label>
                  <Form.Label style={{ color: colors.required }}>*</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Hospital Name"
                    className={hosErrors.name && "border-danger"}
                    {...hosRegister("name", {
                      required: "Required",
                      pattern: {
                        value: /^[a-zA-Z]+$/,
                        message:
                          "Please enter valid name. Should not contain numbers",
                      },
                    })}
                  />
                  {hosErrors.name && (
                    <span style={{ color: colors.required }}>
                      {hosErrors.name.message}
                    </span>
                  )}
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="formBasicHospitalBranch"
                >
                  <Form.Label>Hospital Branch</Form.Label>
                  <Form.Label style={{ color: colors.required }}>*</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Hospital Branch"
                    className={hosErrors.branch && "border-danger"}
                    {...hosRegister("branch", {
                      required: "Required",
                      pattern: {
                        value: /^[a-zA-Z]+$/,
                        message:
                          "Please enter valid name. Should not contain numbers",
                      },
                    })}
                  />

                  {hosErrors.branch && (
                    <span style={{ color: colors.required }}>
                      {hosErrors.branch.message}
                    </span>
                  )}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicContact">
                  <Form.Label>Contact Number</Form.Label>
                  <Form.Label style={{ color: colors.required }}>*</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Contact Number"
                    className={hosErrors.mobileNumber && "border-danger"}
                    {...hosRegister("mobileNumber", {
                      required: "Required",
                      pattern: {
                        value: /^[0-9]{10}$/,
                        message: "Enter valid contact number",
                      },
                    })}
                  />
                  {hosErrors.mobileNumber && (
                    <span style={{ color: colors.required }}>
                      {hosErrors.mobileNumber.message}
                    </span>
                  )}
                </Form.Group>
                {loading ? <Button
                  className="mt-4 w-100"
                  disabled
                  style={{ background: colors.background }}
                >
                  <Spinner animation="border" size="sm" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                  Loading
                </Button> : <Button variant="primary" type="submit">
                  Submit
                </Button>}
              </Form>
            </Modal.Body>
          </Modal>
        </div>
      </Container>
    </>
  );
};

export default AdminAdd;
