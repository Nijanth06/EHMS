import React, { useEffect, useState } from "react";
import "../../../styels/receptionStyle.css";
import PatientServices from "../../../utils/services/PatientServices";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { decrypt } from "../../../utils/aes/AES";
import ReceptionistServices from "../../../utils/services/ReceptionistServices";
import { isDraft } from "@reduxjs/toolkit";
import moment from "moment";

const FormTable = () => {
    const [patientData, setPatientData] = useState([]);
    const [search, setSearch] = useState(null);
    const [input, setInput] = useState("");
    const authUser = useSelector((state) => state.auth);
    const accesstoken = decrypt(authUser.token);
    const email = decrypt(authUser.user);
    const [hosId, setHosId] = useState();
    console.log(patientData.length);
    useEffect(() => {
        //getAllData();
        getHospitalId();
    }, []);

    const config = {
        headers: {
            Authorization: `Bearer ${accesstoken}`,
        },
        responseType: "json",
    };

    function getAllData(hospitalIds) {
        PatientServices.getAllPatientByHospital(config, hospitalIds).then((res) => {
            console.log(res.data);
            setPatientData(res.data);
        })
    }
    const getHospitalId = async () => {
        try {
            const response = await ReceptionistServices.getCurrentUserHospitalId(config);
            setHosId(response.data.hospitalId);
            getAllData(response.data.hospitalId);
        } catch (error) {
            console.error(error);
        }
    }

    const filter = (value) => {
        if (input !== " ") {
            const result = patientData.filter((user) => {
                return user && user.name && user.name.toLowerCase().includes(value);
            })
            setSearch([]);
            if (result.length > 0)
                setSearch(result);
        }

    }

    const handleChange = (value) => {
        setInput(value);
        filter(value);
    }

    return (
        <Container className="text-center">
            <div style={{ textAlign: "center" }}>
                <div className="mt-3">
                    {/* <form class="form-inline my-2 my-lg-0">
                        <input type="text" class="form-control mr-sm-1" placeholder="Search Doctor..." aria-label="Search"
                            value={input} onChange={(e) => handleChange(e.target.value)}
                        />
                        <br></br>
                        <input type="date" class="form-control mr-sm-1"
                            value={input} onChange={(e) => handleChange(e.target.value)}
                        />

                    </form> */}
                    <div className="mx-auto"><span>Patient Lists</span></div>
                    {<div className="row">
                        <div >

                            <table id="patientTable" className='table'  >
                                <thead>
                                    <tr className="table-dark text-light text-center" >
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Gender</th>
                                        <th>Contact Number</th>
                                        <th>E-mail</th>
                                        {/* <th>Doctor</th> */}
                                        <th>Date</th>
                                        <th>Status</th>

                                    </tr>
                                </thead>

                              
                                        <tbody className="table-dark text-center">
                                            {console.log(patientData)}
                                            {Object.values(patientData).map((pa, id) => (
                                                <tr>
                                                    <th>{id + 1}</th>
                                                    <th>{pa.name}</th>
                                                    <th>{pa.gender}</th>
                                                    <th>{pa.mobileNumber}</th>
                                                    <th>{pa.email}</th>
                                                    {/* <th>{pa.doctorName}</th> */}
                                                    <th>{moment(new Date(pa.date)).format("YYYY-MM-DD")}</th>
                                                    <th>{pa.status}</th>
                                                </tr>

                                            ))}
                                        </tbody> 


                            </table>
                        </div>
                    </div>}
                    {/* <div style={{ textAlign: 'right', color: 'darkblue' }}><small><b>Total Patients Records:{patientData !== null ? patientData[0].length : null}</b></small></div> */}
                </div>
            </div>
        </Container>
    )
}

export default FormTable;