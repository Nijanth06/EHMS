import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { decrypt } from "../../utils/aes/AES";
import ReceptionistServices from "../../utils/services/ReceptionistServices";
import TabelPagination from "../../components/Pegination";
import colors from "../../utils/colors/Colors";
import Filter from "../../components/Filter";
import "../../styels/filter-component.css"



const AdminViewReceptionist = () => {

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
      const recResponse = await ReceptionistServices.getRecepDetail(config);
      setDetails(recResponse.data);
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
        style={{ marginTop: "0px", marginBottom: "40px", textAlign: "center" }}>
        Receptionists
      </h2>
      <div className="d-flex justify-content-end col filter-component">
        <Filter data={details} setFilteredData={setFilteredData} />
      </div>
      {records.length > 0 ? (
        <>

<div className="table-responsive">
            <div className="table">
              <Table className="table table-success table-striped justify-content-center "  >

                {/* <Table > */}

                <thead striped bordered hover >

                  <tr>
                    <th>#</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Hospital ID</th>
                    <th>Contact No</th>
                    <th>Email</th>
                    <th >View</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRecordes ? filteredRecordes?.map((recp, id) => {
                    return (
                      <tr key={id}>
                        <td>{id + 1}</td>
                        <td>{recp.firstName}</td>
                        <td>{recp.lastName}</td>
                        {recp.hospitalId ? <td>{recp.hospitalId}</td> : "Loading"}
                        <td>{recp.mobileNumber}</td>
                        <td>{recp.email}</td>
                        <td>
                          <Button
                            className="w-100"
                            style={{ background: colors.primary }}
                          >
                            view
                          </Button>
                        </td>
                      </tr>
                    );
                  }) : records?.map((recp, id) => {
                    return (
                      <tr key={id}>
                        <td>{id + 1}</td>
                        <td>{recp.firstName}</td>
                        <td>{recp.lastName}</td>
                        {recp.hospitalId ? <td>{recp.hospitalId}</td> : "Loading"}
                        <td>{recp.mobileNumber}</td>
                        <td>{recp.email}</td>
                        <td>
                          <Button
                            className="w-100"
                            style={{ background: colors.primary }}
                          >
                            view
                          </Button>
                        </td>
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

export default AdminViewReceptionist;
