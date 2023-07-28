import React, { useEffect, useState } from "react";
import { decrypt } from "../../../utils/aes/AES";
import { useSelector } from "react-redux";
import ReceptionistServices from "../../../utils/services/ReceptionistServices";
import img1 from "../../../../src/assest/images/tumbnail.png";

const HealthRecordPersonList = () => {

    const [hrp, setHelthRecordPerson] = useState([]);
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
        ReceptionistServices.getAllHRP(config).then((res) => {
            setHelthRecordPerson(res.data);
        })
    }

    return (
        <section id="contentBar" className="col-sm-10 overflow-auto" >

            <div className="container-fluid" id="tableList">
                <div className="row">
                    <div className="col-sm-12 text-left">
                        <span>Health-Record-Person Lists</span>
                    </div>
                    <div className="col-sm-3 mt-3 ">
                        <div className="form-inline">
                            <input className="form-control mr-sm-1 w-100" placeholder="Search by Name"
                            // value={input} onChange={(e) => handleChange(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <ul className="mt-5" style={{ columns: "2", WebkitColumns: "2", MozColumns: "2" }}>
                    {hrp.map(hrp => (
                        <div className="row mb-2">
                            <div className="col-sm-4 text-center">
                                <img src={img1} style={{ width: "75%"}} className="p-1"></img>
                            </div>
                            <div className="col-sm-8 text-left">
                                <li><b>E-mail:</b> {hrp[0]}</li>
                                <li><b>Name:</b> {hrp[1]}</li>
                                <li><b>Hospital Name:</b> {hrp[2]}</li>
                                <li><b>Location:</b> {hrp[3]}</li>
                                <li><b>NIC</b> {hrp[4]}</li>
                                <li><b>Mobile:</b> {hrp[5]}</li>
                                <hr className="mt-2" style={{ height: "2px", color: "gray", backgroundColor: "gray" }} />
                            </div>
                        </div>
                    ))}
                </ul>
            </div>
        </section>
    )

}

export default HealthRecordPersonList;