import { useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { decrypt } from "../../utils/aes/AES";
import { useState } from "react";
import colors from "../../utils/colors/Colors";
import TabelPagination from "../../components/Pegination";
import RecordPersonService from "../../utils/services/RecordPersonService";
import "../../styels/table.css"
import Filter from "../../components/Filter";

const AdminViewHRP = () => {
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
      const rcPersonResponse = await RecordPersonService.getRcPerosnDetails(config);
      setDetails(rcPersonResponse.data);
      console.log(rcPersonResponse);
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

        Health Record Person
      </h2>
      <div className="d-flex justify-content-end col filter-component">
        <Filter data={details} setFilteredData={setFilteredData} />
      </div>
      {records.length > 0 ? (
        <>
          <div className="table-responsive">
            <div className="table">

              <Table className="table table-success table-striped justify-content-center "  >

                <thead striped bordered hover >
                  <tr>
                    <th>#</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Hospital</th>
                    <th>Contact No</th>
                    <th >Email</th>
                    <th >Action</th>

                  </tr>
                </thead>

                <tbody>
                  {filteredData ? filteredRecordes?.map((RecordPerson, id) => {
                    return (
                      <tr key={id}>
                        <td>{id + 1}</td>
                        <td>{RecordPerson.firstName}</td>
                        <td>{RecordPerson.lastName}</td>
                        <td>{RecordPerson.hospitalId}</td>
                        <td>{RecordPerson.mobileNumber}</td>
                        <td>{RecordPerson.email}</td>
                        <td>
                          <Button
                            className="w-100"
                            style={{ background: colors.primary }}
                          >
                            view
                          </Button>
                        </td>
                      </tr>
                    )
                  })
                    : records?.map((RecordPerson, id) => {
                      return (
                        <tr key={id}>
                          <td>{id + 1}</td>
                          <td>{RecordPerson.firstName}</td>
                          <td>{RecordPerson.lastName}</td>
                          <td>{RecordPerson.hospitalId}</td>
                          <td>{RecordPerson.mobileNumber}</td>
                          <td>{RecordPerson.email}</td>
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
};

export default AdminViewHRP;
