import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import colors from "../../utils/colors/Colors";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { decrypt } from "../../utils/aes/AES";
import { useEffect } from "react";
import StaffServices from "../../utils/services/StaffServices";
import { useNavigate } from "react-router-dom";
import { logOut } from "../../app/features/authSlice";
import DoctorServices from "../../utils/services/DoctorServices";
import "../../styels/profile.css";
import { Grid } from "@mui/material";
import { Image } from "react-bootstrap";
import tumbnail from "../../assest/images/tumbnail.png";
import Loader from "../../components/Loader";

function Profile() {
  const [showProfile, setShowProfile] = useState(false);
  const [showReset, setShowReset] = useState(false);
  const [isDisabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [editable, setEditable] = useState(false);
  const [response, setResponse] = useState();
  const [imageFile, setImageFile] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClosePasswordReset = () => {
    setShowReset(false);
    passwordResetReset();
  };
  const handleCloseProfile = () => {
    setShowProfile(false);
  };
  const handleShowResetPassword = () => {
    setShowReset(true);
  };
  const handleShowProfileUpdate = () => {
    setShowProfile(true);
  };

  const {
    register: profileRegister,
    handleSubmit: handleProfileSubmit,
    formState: { errors: profileErrors },
    reset: ProfileReset,
  } = useForm({ mode: "onTouched" });

  const {
    register: passwordResetRegister,
    handleSubmit: resetHandleSubmit,
    watch: watchReset,
    reset: passwordResetReset,
    formState: { errors: passwordResetErrors },
  } = useForm({ mode: "onTouched" });

  const password = watchReset("newPassword");
  const authUser = useSelector((state) => state.auth);
  const accesstoken = decrypt(authUser.token);

  //image
  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setImageFile(base64);
  };

  //converting to base64
  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const config = {
    headers: {
      Authorization: `Bearer ${accesstoken}`,
    },
    responseType: "json",
  };

  const resetPassword = async (data) => {
    try {
      setLoading(true);
      const _data = await StaffServices.passwordReset(data, config);
      setLoading(false);
      Swal.fire({
        icon: "success",
        title: "Successfully Changed",
      });
      setTimeout(() => {
        dispatch(logOut());
        navigate("/");
      }, 2000);
    } catch (error) {
      console.error("Error:", error);
      if (error.response.status === 400) {
        Swal.fire({
          icon: "error",
          title: error.response.data.message,
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

  const updateProfile = async (data) => {
    data["imageFile"] = imageFile;

    try {
      if (editable === true) {
        setLoading(true);
        const _data = await DoctorServices.getDoctorProfileUpdate(data, config);
        setLoading(false);
        Swal.fire({
          icon: "success",
          title: "Successfully Update",
        });
        setDisabled(!isDisabled);
        setEditable(!editable);
      }
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
  useEffect(() => {
    const loadProfile = async () => {
      try {
        setLoading(true);
        const _data = await DoctorServices.getDoctorProfile(config);
        setResponse(_data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error hi:", error);

        Swal.fire({
          icon: "error",
          title: "We are facing an issue",
        });
      } finally {
        setLoading(false);
      }
    };
    loadProfile();
  }, []);
  useEffect(() => {
    ProfileReset(response);
  }, [response]);
  return (
    <>
      {response === undefined ? (
        <Loader />
      ) : (
        <div className="center">
          <h1>
            {" "}
            <b>My Profile </b>{" "}
          </h1>
          <br />
          <h5>Personal Details</h5>
          <br />

          {!loading ? (
            <>
              <Form onSubmit={handleProfileSubmit(updateProfile)}>
                <Grid>
                  <Row>
                    <Col xs={6} md={4}>
                      <Image
                        className="img"
                        src={
                          imageFile !== null
                            ? imageFile
                            : response.imageFile
                            ? response.imageFile
                            : tumbnail
                        }
                        circle
                        alt="171x180"
                      />
                    </Col>
                  </Row>
                </Grid>
                <br />
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formPlaintextName"
                >
                  <Form.Label column sm="2">
                    First Name
                  </Form.Label>
                  <Col sm="10">
                    <Form.Control
                      type="text"
                      placeholder="Enter first name"
                      disabled={isDisabled}
                      {...profileRegister("firstName", {
                        required: "Required",
                        pattern: {
                          value: /^[a-zA-Z]+$/,
                          message:
                            "Please enter valid name! Should not contain numbers.",
                        },
                      })}
                    />
                    {profileErrors.firstName && (
                      <span style={{ color: colors.danger }}>
                        {profileErrors.firstName.message}
                      </span>
                    )}
                  </Col>
                </Form.Group>
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formPlaintextName"
                >
                  <Form.Label column sm="2">
                    Last Name
                  </Form.Label>
                  <Col sm="10">
                    <Form.Control
                      type="text"
                      placeholder="Enter last name"
                      disabled={isDisabled}
                      {...profileRegister("lastName", {
                        required: "Required",
                        pattern: {
                          value: /^[a-zA-Z]+$/,
                          message:
                            "Please enter valid name! Should not contain numbers.",
                        },
                      })}
                    />
                    {profileErrors.lastName && (
                      <span style={{ color: colors.danger }}>
                        {profileErrors.lastName.message}
                      </span>
                    )}
                  </Col>
                </Form.Group>
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formPlaintextAddress"
                >
                  <Form.Label column sm="2">
                    Address
                  </Form.Label>
                  <Col sm="10">
                    <Form.Control
                      type="text"
                      placeholder="Enter the address"
                      disabled={isDisabled}
                      {...profileRegister("address", {
                        required: "Required",
                      })}
                    />
                    {profileErrors.address && (
                      <span style={{ color: colors.danger }}>
                        {profileErrors.address.message}
                      </span>
                    )}
                  </Col>
                </Form.Group>
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formPlaintextContactNo"
                >
                  <Form.Label column sm="2">
                    Contact Number
                  </Form.Label>
                  <Col sm="10">
                    <Form.Control
                      type="text"
                      placeholder="Enter contact number"
                      disabled={isDisabled}
                      {...profileRegister("mobileNumber", {
                        required: "Required",
                        pattern: {
                          value: /^[0-9]{10}$/,
                          message: "Enter valid contact number!",
                        },
                      })}
                    />
                    {profileErrors.mobileNumber && (
                      <span style={{ color: colors.danger }}>
                        {profileErrors.mobileNumber.message}
                      </span>
                    )}
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="NIC">
                  <Form.Label column sm="2">
                    NIC Number
                  </Form.Label>
                  <Col sm="10">
                    <Form.Control
                      type="text"
                      placeholder="Enter NIC number"
                      disabled={isDisabled}
                      {...profileRegister("nic", {
                        required: "Required",
                        pattern: {
                          value: /^\d{12}$|\d{9}V$/,
                          message: "Enter valid NIC number!",
                        },
                      })}
                    />{" "}
                    {profileErrors.nic && (
                      <span style={{ color: colors.danger }}>
                        {profileErrors.nic.message}
                      </span>
                    )}
                  </Col>
                </Form.Group>
                <br />
                <h5>Other Details</h5>
                <br />
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formPlaintextSpecialization"
                >
                  <Form.Label column sm="2">
                    Specialization
                  </Form.Label>
                  <Col sm="10">
                    <Form.Control
                      type="text"
                      placeholder="Specialization"
                      disabled={isDisabled}
                      {...profileRegister("specialization", {
                        required: "Required",
                        pattern: {
                          value: /^[a-zA-Z]+$/,
                          message:
                            "Please enter valid name. Should not contain numbers",
                        },
                      })}
                    />
                    {profileErrors.specialization && (
                      <span style={{ color: colors.danger }}>
                        {profileErrors.specialization.message}
                      </span>
                    )}
                  </Col>
                </Form.Group>
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formPlaintextYearsof Experience"
                >
                  <Form.Label column sm="2">
                    Years of Experience
                  </Form.Label>
                  <Col sm="10">
                    <Form.Control
                      type="text"
                      placeholder="Years of Experience"
                      disabled={isDisabled}
                      {...profileRegister("yearOfExp", {
                        required: "Required",
                        pattern: {
                          value: /^([1-9]|[1-4][0-9])$/,
                          message: "Enter valid year",
                        },
                      })}
                    />
                    {profileErrors.yearOfExp && (
                      <span style={{ color: colors.danger }}>
                        {profileErrors.yearOfExp.message}
                      </span>
                    )}
                  </Col>
                </Form.Group>
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formPlaintextHospital"
                >
                  <Form.Label column sm="2">
                    Hospital
                  </Form.Label>
                  <Col sm="10">
                    <Form.Control
                      type="text"
                      value={response.hospitalId}
                      placeholder="Hospital"
                      disabled
                      // {...profileRegister("hospital", {
                      //   required: "Required",
                      // })}
                    />
                    {/* {profileErrors.hospital && (
            <span style={{ color: colors.danger }}>
              {profileErrors.hospital.message}
            </span>
          )} */}
                  </Col>
                </Form.Group>
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formPlaintextHospital"
                >
                  <Form.Label column sm="2">
                    Picture
                  </Form.Label>
                  <Col sm="10">
                    <Form.Control
                      type="file"
                      disabled={isDisabled}
                      onChange={(e) => uploadImage(e)}
                    />
                  </Col>
                </Form.Group>

                <br />

                {!editable ? (
                  <Button
                    variant="primary"
                    onClick={() => {
                      setDisabled(!isDisabled);
                      setEditable(!editable);
                    }}
                  >
                    Edit Profile Details
                  </Button>
                ) : (
                  <Button
                    variant="primary"
                    onClick={() => {
                      setDisabled(!isDisabled);
                      setEditable(!editable);
                      setImageFile(null);
                    }}
                  >
                    Cancel
                  </Button>
                )}
                {editable ? (
                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                ) : null}
              </Form>
            </>
          ) : null}
          <br />
          <br />
          <h5>You need to change Password?</h5>
          <br />
          <Button variant="primary" onClick={handleShowResetPassword}>
            Change Password
          </Button>

          <Modal show={showReset} onHide={handleClosePasswordReset}>
            <Form onSubmit={resetHandleSubmit(resetPassword)}>
              <Modal.Header closeButton>
                <Modal.Title>Change Password</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form.Group
                  className="mb-3"
                  controlId="formBasicCurrentPassword"
                >
                  <Form.Label>Current Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter current password"
                    className={
                      passwordResetErrors.currentPassword && "border-danger"
                    }
                    {...passwordResetRegister("currentPassword", {
                      required: "Required",
                    })}
                  />
                  {passwordResetErrors.currentPassword && (
                    <span style={{ color: colors.danger }}>
                      {passwordResetErrors.currentPassword.message}
                    </span>
                  )}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicNewPassword1">
                  <Form.Label>New Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter new password"
                    className={
                      passwordResetErrors.newPassword && "border-danger"
                    }
                    {...passwordResetRegister("newPassword", {
                      required: "Required",
                      pattern: {
                        value: /^(?=.*[\W_])(?=.*[A-Z]).{8,}$/,
                        message:
                          "Must include special characters and capital letters.minimum 8 length",
                      },
                    })}
                  />
                  {passwordResetErrors.newPassword && (
                    <span style={{ color: colors.danger }}>
                      {passwordResetErrors.newPassword.message}
                    </span>
                  )}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicNewPassword2">
                  <Form.Label>Confirm New Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Re enter new password"
                    className={passwordResetErrors.reEnter && "border-danger"}
                    {...passwordResetRegister("reEnter", {
                      required: "Required",
                      validate: (value) =>
                        value === password || "password do no match",
                    })}
                  />
                  {passwordResetErrors.reEnter && (
                    <span style={{ color: colors.danger }}>
                      {passwordResetErrors.reEnter.message}
                    </span>
                  )}
                </Form.Group>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClosePasswordReset}>
                  Close
                </Button>
                <Button variant="primary" type="submit">
                  Save Changes
                </Button>
              </Modal.Footer>
            </Form>
          </Modal>
        </div>
      )}
    </>
  );
}

export default Profile;
