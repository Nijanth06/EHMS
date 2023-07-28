import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import DoctorServices from "../../utils/services/DoctorServices";
import { useSelector } from "react-redux";
import { decrypt } from "../../utils/aes/AES";
import colors from "../../utils/colors/Colors";
import TabelPagination from "../../components/Pegination";
import "../../styels/table.css";
import Filter from "../../components/Filter";
import "../../styels/filter-component.css";

const AdminViewDoctor = () => {
  const [details, setDetails] = useState([{}]);
  const [filteredData, setFilteredData] = useState();
  const recordsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = details?.slice(firstIndex, lastIndex);
  const filteredRecordes = filteredData?.slice(firstIndex, lastIndex);
  const page = Math.ceil(details.length / recordsPerPage);
  const numbers = [...Array(page + 1).keys()].slice(1);
  const authUser = useSelector((state) => state.auth);
  const accesstoken = decrypt(authUser.token);
  console.log(details);
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

  const getAllData = async () => {
    try {
      const docResponse = await DoctorServices.getDoctorDetail(config);
      setDetails(docResponse.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllData();
    //get doctor details
  }, []);

  return (
    <>
      <h2
        className="text-secondary"
        style={{ marginTop: "0px", marginBottom: "40px", textAlign: "center" }}
      >
        Doctors
      </h2>
      <div className="d-flex justify-content-end col filter-component">
        <Filter data={details} setFilteredData={setFilteredData} />
      </div>
      {records.length > 0 ? (
        <>
          <div className="table-responsive">
            <div className="table">
              <Table className="table table-success table-striped justify-content-center ">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Specialzation </th>
                    <th>Hospital</th>
                    <th>Contact No</th>
                    <th>Email</th>
                    <th style={{ textAlign: "center" }}> View</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData
                    ? filteredRecordes?.map((doctor, id) => {
                        return (
                          <tr key={id} onClick={() => alert("hi")}>
                            <td>
                              {id +
                                currentPage * recordsPerPage -
                                recordsPerPage +
                                1}
                            </td>
                            <td>{doctor.firstName}</td>
                            <td>{doctor.lastName}</td>
                            <td>{doctor.specialization}</td>
                            {doctor.hospitalId ? (
                              <td>{doctor.hospitalId}</td>
                            ) : (
                              "loading"
                            )}
                            <td>{doctor.mobileNumber}</td>
                            <td>{doctor.email}</td>
                            <td>
                              <Button
                                className="w-100"
                                style={{
                                  background: colors.primary,
                                  textAlign: "center",
                                  alignItems: "center",
                                }}
                              >
                                view
                              </Button>
                            </td>
                          </tr>
                        );
                      })
                    : records?.map((doctor, id) => {
                        return (
                          <tr key={id} onClick={() => alert("hi")}>
                            <td>
                              {id +
                                currentPage * recordsPerPage -
                                recordsPerPage +
                                1}
                            </td>
                            <td>{doctor.firstName}</td>
                            <td>{doctor.lastName}</td>
                            <td>{doctor.specialization}</td>
                            {doctor.hospitalId ? (
                              <td>{doctor.hospitalId}</td>
                            ) : (
                              "loading"
                            )}
                            <td>{doctor.mobileNumber}</td>
                            <td>{doctor.email}</td>
                            <td>
                              <Button
                                className="w-100"
                                style={{
                                  background: colors.primary,
                                  textAlign: "center",
                                  alignItems: "center",
                                }}
                              >
                                view
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

export default AdminViewDoctor;
