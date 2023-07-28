import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { decrypt } from "../../utils/aes/AES";
import TabelPagination from "../../components/Pegination";
import NurseServices from "../../utils/services/NurseServices";
import Filter from "../../components/Filter";


const AdminViewNurse = () => {

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
      const nurseResponse = await NurseServices.getNureDetails(config);
      setDetails(nurseResponse.data);
    } catch (error) {
      console.error(error);
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
        style={{ marginTop: "0px", marginBottom: "40px", textAlign: "center" }}>

        Nurses
      </h2>
      <div className="d-flex justify-content-end col filter-component">
        <Filter data={details} setFilteredData={setFilteredData} />
      </div>
      {records.length > 0 ? (
        <>
          <div className="table-responsive">
            <div className="table">
              <Table className="table table-success table-striped justify-content-center "  >

                <thead>
                  <tr>
                    <th>#</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Hospital</th>
                    <th>Contact No</th>
                    <th>Email</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredData ? filteredRecordes?.map((nurse, id) => {
                    return (
                      <tr key={id}>
                        <td>{id + 1}</td>
                        <td>{nurse.firstName}</td>
                        <td>{nurse.lastName}</td>
                        <td>{nurse.hospitalId}</td>
                        <td>{nurse.mobileNumber}</td>
                        <td>{nurse.email}</td>
                      </tr>
                    )
                  })
                    : records?.map((nurse, id) => {
                      return (
                        <tr key={id}>
                          <td>{id + 1}</td>
                          <td>{nurse.firstName}</td>
                          <td>{nurse.lastName}</td>
                          <td>{nurse.hospitalId}</td>
                          <td>{nurse.mobileNumber}</td>
                          <td>{nurse.email}</td>
                        </tr>
                      );
                    })}
                </tbody>
              </Table>
              {details && numbers ? <TabelPagination numbers={numbers} changePage={changePage} nextPage={nextPage} prevPage={prevPage} currentPage={currentPage} /> : null}
            </div>
          </div>


        </>
      ) : (
        <tbody>
          <tr>No data found</tr>
        </tbody>
      )}
    </>
  );
}


export default AdminViewNurse;
