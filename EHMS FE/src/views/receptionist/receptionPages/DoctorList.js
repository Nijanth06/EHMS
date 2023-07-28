import React, { useEffect, useState } from "react";
import { decrypt } from "../../../utils/aes/AES";
import { useSelector } from "react-redux";
import ReceptionistServices from "../../../utils/services/ReceptionistServices";
import img1 from "../../../../src/assest/images/tumbnail.png";

const DoctorList = () => {

    const [doctors, setDoctorData] = useState([]);
    const authUser = useSelector((state) => state.auth);
    const accesstoken = decrypt(authUser.token);

    useEffect(() => {
        getAllData();
    }, []);

    const config = {
        headers: {
            Authorization: `Bearer ${accesstoken}`,
        },
        responseType: "json",
    };

    function getAllData() {
        ReceptionistServices.getAllDoctors(config).then((res) => {
            setDoctorData(res.data);
            // console.log("doctors data: ", doctors);

        })
    }


    return (
        <section id="contentBar" className="col-sm-12 overflow-auto" >

            <div className="container-fluid" id="tableList">
                <div className="row">
                    <div className="col-sm-12 text-left">
                        <span>Doctor Lists</span>
                    </div>
                    <div className="col-sm-3 mt-3 ">
                        <div className="form-inline">
                            <input className="form-control mr-sm-1 w-100" placeholder="Search by Specialization"
                            // value={input} onChange={(e) => handleChange(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <ul className="mt-5" style={{ columns: "2", WebkitColumns: "2", MozColumns: "2" }}>
                    {doctors.map(doc => (
                        <div className="row mb-2">
                            <div className="col-sm-4 text-center">
                                <img src={img1} style={{ width: "75%" }} className="p-1"></img>
                            </div>
                            <div className="col-sm-8 text-left">
                                <li><b>E-mail:</b> {doc[0]}</li>
                                <li><b>Name:</b> {doc[1]}</li>
                                <li><b>Specialized:</b> {doc[2]}</li>
                                <li><b>NiC:</b> {doc[3]}</li>
                                <li><b>Mobile:</b> {doc[4]}</li>
                                <hr className="mt-2" style={{ height: "2px", color: "gray", backgroundColor: "gray" }} />
                            </div>
                        </div>
                    ))}
                </ul>
            </div>
        </section >
    )

}

export default DoctorList;