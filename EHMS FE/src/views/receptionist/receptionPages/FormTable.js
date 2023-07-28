import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { decrypt } from "../../../utils/aes/AES";
import { useSelector } from "react-redux";
import PatientServices from "../../../utils/services/PatientServices";
import { Button, Modal } from "react-bootstrap";
import CustomCardBooking from "../../../components/CustomCardBooking";
import Search from "../../../utils/services/Search";
import ReceptionistServices from "../../../utils/services/ReceptionistServices";
import { setCurrentPatientByRec } from "../../../app/features/currentUserData";


const FormTable = () => {
    const [input, setInput] = useState("");
    const [patientData, setPatientData] = useState([]);
    const [response, setResponse] = useState(null);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = (data) => {
        setShow(true);
        let authUser = {
            user: data.firstName,
            email: data.email
        };
        dispatch(setCurrentPatientByRec(authUser));
    };
    const authUser = useSelector((state) => state.auth);
    const accesstoken = decrypt(authUser.token);
    const dispatch = useDispatch();

    const getHospitalId = async () => {
        try {
            const response = await ReceptionistServices.getCurrentUserHospitalId(config);
            searchData(response.data.hospitalId);
        } catch (error) {
            console.error(error);
        }
    }
    useEffect((value) => {
        setInput(value);
        getAllData();
        getHospitalId();
    }, []);
    const config = {
        headers: {
            Authorization: `Bearer ${accesstoken}`,
        },
        responseType: "json",
    };
    function getAllData(value) {
        PatientServices.getAllPatientData(config).then((res) => {
            setPatientData(res.data);
            if (input !== "") {
                const result = res.data.filter((user) => {
                    const v = value.toLowerCase();
                    return (user && user.firstName.includes(v))
                        || (user && user.firstName.toLowerCase().includes(v))
                        || (user && user.nic.includes(v));
                })
                setPatientData(result);
            }
        })
    }
    const handleChange = (value) => {
        getAllData(value);
    }
    const searchData = async (hospitalId) => {
        let data = {
            name: null,
            hospitalId: hospitalId,
            date: null
        };
        try {
            const response = await Search.SearchAvailableDoctor(data);
            setResponse(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="mt-3">
            <div className="row">
                <div className="col-sm-9 text-left">
                    <span>Patient Lists</span>
                </div>
                <div className="col-sm-3 p-2 m-0 ">
                    <div className="form-inline">
                        <input className="form-control mr-sm-1 w-100" placeholder="Search by first-name & nic"
                            value={input} onChange={(e) => handleChange(e.target.value)}
                        />
                    </div>
                </div>
            </div>
            {<Modal
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
            </Modal>}
            <div className="row">
                <div className="col-md-12 mx-auto table-responsive" >
                    <table id="patientTable" className='table table-responsive overflow-auto table-bordered' style={{ height: "90Vh" }}>
                        <thead>
                            <tr className="table-dark text-light text-center" >
                                <th>Title</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Gender</th>
                                <th>Date Of Birth</th>
                                <th>NIC</th>
                                <th>Address</th>
                                <th>Contact Number</th>
                                <th>E-mail</th>
                                <th>Gurdian Name</th>
                                <th>Gurdian Contact Number</th>
                                <th>Add</th>
                            </tr>
                        </thead>
                        {patientData.map(pa => (
                            <tbody className="table-dark text-center">
                                <tr>
                                    <th>{pa.title}</th>
                                    <th>{pa.firstName}</th>
                                    <th>{pa.lastName}</th>
                                    <th>{pa.gender}</th>
                                    <th>{pa.dateOfBirth}</th>
                                    <th>{pa.nic}</th>
                                    <th>{pa.address}</th>
                                    <th>{pa.mobileNumber}</th>
                                    <th>{pa.email}</th>
                                    <th>{pa.guardianName}</th>
                                    <th>{pa.guardianMobileNumber}</th>
                                    <th>
                                        <button className="btn btn-primary btn-sm p-2" onClick={() => { handleShow(pa); }}> <i className="fa-solid fa-circle-plus"></i></button>
                                    </th>
                                </tr>

                            </tbody>
                        ))}
                    </table>
                </div>
            </div>
            <div style={{ textAlign: 'right', color: 'black' }}><small className="bg-light"><b>Patient Available Records: {patientData.length}</b></small></div>
        </div>
    )
}

export default FormTable;