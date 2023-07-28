import { useState, React, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
    Row,
    Col,
    Form,
    Button,
    Spinner,
    Badge,
    Container,
} from "react-bootstrap";
import Swal from "sweetalert2";
import colors from "../../../utils/colors/Colors";
import { decrypt } from "../../../utils/aes/AES";
import { useSelector } from "react-redux";
import ReceptionistServices from "../../../utils/services/ReceptionistServices";


const PatientRegister = () => {
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
    
    const authUser = useSelector((state) => state.auth);
    const accesstoken = decrypt(authUser.token);
    const config = {
        headers: {
            Authorization: `Bearer ${accesstoken}`,
        },
        responseType: "json",
    };

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
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;
        setDate([year, month, day].join('-'))
    }
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
            unregister('nic')
        } else {
            setHasGurdian(false);
        }
        setAge(age_now);
        console.log(today.toString(), today);
        return age_now;
    };

    const handleChange_age = (event) => {
        setBirthDate({ dob1: event.target.value }, () => {
        });

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
            const _data = await ReceptionistServices.addPatient(data,config)
            console.log(_data)
            Swal.fire({
                icon: 'success',
                title: 'Registration Successfull!',
            })
            setLoading(false);
            navigate("/patient-list");
        } catch (error) {
            console.error("Error:", error.response.data.message);
            if (error) {
                Swal.fire({
                    icon: 'error',
                    title: error.response.data.message,
                })
                setLoading(false);
            }
        }
    };
    useEffect(() => {
        formatDate()
    }, [])

    return (

        <Container>
            <Row>
                <Col>
                    <Form
                        className="text-start"
                        onSubmit={handleSubmit(registerPatient)}
                    >
                        <Form.Group className="mb-4" controlId="formBasicPassword">
                            <Form.Label><b>Title</b></Form.Label>
                            <Form.Select style={{ background: colors.txtBack }}
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
                                <small style={{ color: colors.danger }}>{errors.title.message}</small>
                            )}
                        </Form.Group>
                        <Form.Group className="mb-4" controlId="formBasicName">
                            <Form.Label><b>First Name</b></Form.Label>
                            <Form.Control style={{ background: colors.txtBack }}
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
                                <small style={{ color: colors.danger }}>{errors.firstName.message}</small>
                            )}
                        </Form.Group>

                        {<Form.Group className="mb-4" controlId="formBasicName">
                            <Form.Label><b>Last Name</b></Form.Label>
                            <Form.Control style={{ background: colors.txtBack }}
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
                                <small style={{ color: colors.danger }}>{errors.lastName.message}</small>
                            )}
                        </Form.Group>}

                        {<Form.Group className="mb-4" controlId="formBasicDob">
                            <Form.Label><b>Date Of birth</b></Form.Label>
                            <Form.Control style={{ background: colors.txtBack }}
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
                                <small style={{ color: colors.danger }}>{errors.dateOfBirth.message}</small>
                            )}
                        </Form.Group>}


                        <Form.Group className="mb-4" controlId="formBasicAddress">
                            <Form.Label><b>Address</b></Form.Label>
                            <Form.Control style={{ background: colors.txtBack }}
                                type="text"
                                className={errors.address && "border-danger"}
                                placeholder="Enter your address"
                                {...register("address", {
                                    required: "Required",
                                })}
                            />
                            {errors.address && (
                                <small style={{ color: colors.danger }}>{errors.address.message}</small>
                            )}
                        </Form.Group>

                        <Form.Group className="mb-4" controlId="formBasicPassword">
                            <Form.Label><b>Gender</b></Form.Label>
                            <Form.Select style={{ background: colors.txtBack }}
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
                                <small style={{ color: colors.danger }}>{errors.gender.message}</small>
                            )}
                        </Form.Group>

                        <Form.Group className="mb-4" controlId="formBasicContact">
                            <Form.Label><b>Contact Number</b></Form.Label>
                            <Form.Control style={{ background: colors.txtBack }}
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
                                <small style={{ color: colors.danger }}>{errors.mobileNumber.message}</small>
                            )}
                        </Form.Group>

                        {age > 18 || age == null ? (
                            <>
                                <Form.Group className="mb-4" controlId="formBasicNic">
                                    <Form.Label><b>NIC Number</b></Form.Label>
                                    <Form.Control style={{ background: colors.txtBack }}
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
                                        <small style={{ color: colors.danger }}>{errors.nic.message}</small>
                                    )}
                                </Form.Group>

                                <Form.Group className="mb-4" controlId="formBasicGaurdian">
                                    <Form.Label><b>Patient has Guardian</b></Form.Label>
                                    <Row className="ml-2">
                                        <Col md={6}>
                                            <Form.Check
                                                type="radio"
                                                value="yes"
                                                name="radio"
                                                aria-label="radio 1"
                                                onChange={handleRadioButtonChange}
                                            />
                                            Yes
                                        </Col>
                                        <Col md={6}>
                                            <Form.Check
                                                type="radio"
                                                value="no"
                                                name="radio"
                                                aria-label="radio 1"
                                                onChange={handleRadioButtonChange}
                                                defaultChecked
                                            />
                                            No
                                        </Col>

                                    </Row>
                                </Form.Group>
                            </>
                        ) : null}

                        {hasGurdian ? (
                            <>
                                <Form.Group className="mb-4" controlId="formBasicGaurdian">
                                    <Form.Label><b>Guardian Name</b></Form.Label>
                                    <Form.Control style={{ background: colors.txtBack }}
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
                                        <small style={{ color: colors.danger }}>
                                            {errors.guardianName.message}
                                        </small>
                                    )}
                                </Form.Group>


                                <Form.Group className="mb-5" controlId="formBasicGuardianContact" >
                                    <Form.Label><b>Guardian Contact</b></Form.Label>
                                    <Form.Control style={{ background: colors.txtBack }}
                                        type="text"
                                        className={errors.guardianMobileNumber && "border-danger"}
                                        placeholder="Enter your guardian mobile number"
                                        {...register("guardianMobileNumber", {
                                            required: "Required",
                                            pattern: {
                                                value: /^[0-9]{10}$/,
                                                message: "Enter valid contact number",
                                            },
                                        })}
                                    />
                                    {errors.guardianMobileNumber && (
                                        <small style={{ color: colors.danger }}>
                                            {errors.guardianMobileNumber.message}
                                        </small>
                                    )}
                                </Form.Group>

                            </>
                        ) : null}

                        <center><Badge className="mb-4 mt-3" pill bg="secondary" style={{ fontSize: '14px' }}><i>for login credential</i></Badge></center>

                        <Form.Group className="mb-4" controlId="formBasicEmail">
                            <Form.Label><b>Email address</b></Form.Label>
                            <Form.Control style={{ background: colors.txtBack }}
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
                            
                            {errors.email && (
                                <small style={{ color: colors.danger }}>{errors.email.message}</small>
                            )}
                        </Form.Group>

                        {/* <Form.Group className="mb-4" controlId="formBasicPassword">
                            <Form.Label><b>Password</b></Form.Label>
                            <Form.Control style={{ background: colors.txtBack }}
                                type="password"
                                placeholder="password"
                                className={errors.password && "border-danger"}
                                {...register("password", {
                                    required: "Required",
                                    pattern: {
                                        value: /^(?=.*[\W_])(?=.{8,10}$)[\w\W]*$/,
                                        message: "must include special characters.minimum 8 length",

                                    },
                                })}
                            />
                            {errors.password && (
                                <small style={{ color: colors.danger }}>{errors.password.message}</small>
                            )}
                        </Form.Group>

                        <Form.Group className="mb-4" controlId="formBasicPassword">
                            <Form.Label><b>Confirm Password</b></Form.Label>
                            <Form.Control style={{ background: colors.txtBack }}
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
                                <small style={{ color: colors.danger }}>
                                    {errors.Password2.message}
                                    <br />
                                </small>
                            )}
                        </Form.Group> */}
                        <Row>
                            <Col md={6}>
                                <div className="text-center">
                                    <Button type="button" className="btn btn-danger mt-4 mb-4 w-100" data-dismiss="modal">
                                        <b>Close </b><i class="fa-solid fa-backward"></i>
                                    </Button>
                                </div>
                            </Col>
                            <Col md={6}>
                                <div className="text-center">
                                    {!isLoading ? (
                                        <Button type="submit" className="btn btn-success mt-4 mb-4 w-100">
                                            <b>Submit </b> <i className="fa-solid fa-thumbs-up"></i>
                                        </Button>
                                    ) : (
                                        <Button className="mt-4 w-100" disabled>
                                            <Spinner animation="border" size="sm" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </Spinner>
                                            Loading
                                        </Button>
                                    )}
                                </div>

                            </Col>
                        </Row>

                    </Form>

                </Col>
            </Row>
        </Container>

    );
};

export default PatientRegister;
