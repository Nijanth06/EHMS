import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";

import { useSelector } from "react-redux";
import { decrypt } from "../../utils/aes/AES";
import colors from "../../utils/colors/Colors";
import TabelPagination from "../../components/Pegination";
import "../../styels/table.css";
import AppointmentServices from "../../utils/services/Appointment";
import DoctorServices from "../../utils/services/DoctorServices";
import Filter from "../../components/Filter";
import "../../styels/filter-component.css";
import PatientHistory from "./PatientHistory";
import { navigate, useNavigate } from "react-router-dom";

const PatientDetail = () => {
  const [details, setDetails] = useState([{}]);
  const [filteredData, setFilteredData] = useState();

  const recordsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;

  // const records = details?.slice(firstIndex, lastIndex);
  // const filteredRecordes = filteredData?.slice(firstIndex, lastIndex);

  const page = Math.ceil(Object.keys(details).length / recordsPerPage);
  const numbers = [...Array(page + 1).keys()].slice(1);
  const authUser = useSelector((state) => state.auth);
  const accesstoken = decrypt(authUser.token);
  const doctorId = decrypt(authUser.userId);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const prevPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const changePage = (id) => {
    setCurrentPage(id);
  };

  const nextPage = () => {
    if (currentPage !== page) {
      setCurrentPage(currentPage + 1);
    }
  };

  //Config for backend call.
  const config = {
    headers: {
      Authorization: `Bearer ${accesstoken}`,
    },
    responseType: "json",
  };

  const getDailyAppointment = async () => {
    try {
      const response = await AppointmentServices.getDailyAppointment(
        doctorId,
        config
      );
      setDetails(response.data.appData);
    } catch (error) {
      console.log(error);
    }
  };

  const openPatientHistory = () => {};

  useEffect(() => {
    //get doctor details
    getDailyAppointment();
  }, []);

  return (
    <>
      <h2
        className="text-secondary"
        style={{ marginTop: "0px", marginBottom: "40px", textAlign: "center" }}
      >
        Today Patients
      </h2>
      <div className="d-flex justify-content-end col filter-component">
        <Filter data={Object.values(details)} setFilteredData={setDetails} />
      </div>
      {Object.keys(details).length > 0 ? (
        <>
          <div className="table-responsive">
            <div className="table">
              <Table className="table table-success table-striped justify-content-center ">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>First Name</th>
                    <th>Contact No</th>
                    <th>Email</th>
                    <th>View</th>
                  </tr>
                </thead>
                <tbody>
                  {Object?.keys(details).map((key) => {
                    const value = details[key];
                    console.log(details,">>>>>>>>>>>>>>>>>>>>");
                    return (
                      <tr key={key}>
                        <td>
                          {parseInt(key) +
                            currentPage * recordsPerPage -
                            recordsPerPage +
                            1}
                        </td>
                        <td>{value.firstName}</td>
                        <td>{value.mobileNumber}</td>
                        <td>{value.email}</td>
                        <td>
                          <Button
                            onClick={() => {
                              navigate(`/patient-history/${value.patientId}`);
                            }}
                          >
                            View
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
              {details && numbers ? (
                <TabelPagination
                  numbers={numbers}
                  changePage={changePage}
                  nextPage={nextPage}
                  prevPage={prevPage}
                  currentPage={currentPage}
                />
              ) : null}
            </div>
          </div>
        </>
      ) : (
        <tbody>
          <tr>
            <b>No data found</b>
          </tr>
        </tbody>
      )}
    </>
  );
};

export default PatientDetail;
