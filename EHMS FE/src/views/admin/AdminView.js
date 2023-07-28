import { useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { decrypt } from "../../utils/aes/AES";
import { useState } from "react";
import HospitalServices from "../../utils/services/HospitalServices";
import TabelPagination from "../../components/Pegination";
import colors from "../../utils/colors/Colors";
import FilterByName from "../../components/FilterByname";


const AdminView = () => {

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
      const hosResponse = await HospitalServices.getHospitalDetail(config);
      setDetails(hosResponse.data);
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

      <h4
        className="text-secondary"
        style={{ marginTop: "0px", marginBottom: "40px", textAlign: "center" }}
      >
        Hospitals
      </h4>
      <div className="d-flex justify-content-end col filter-component">
        <FilterByName data={details} setFilteredData={setFilteredData} />
      </div>
      {records.length > 0 ? (

        <>
          <div className="table-responsive">
            <div className="table">

              <Table className="table table-success table-striped justify-content-center "  >

                {/* <Table striped bordered hover size="lg"> */}
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Hospital Name</th>
                    <th>Branch</th>
                    <th>Contact No</th>
                    <th>View</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData ? filteredRecordes?.map((hospital, id) => {
                    return (
                      <>
                        <tr key={id}>
                          <td>{hospital.id}</td>
                          <td>{hospital.name}</td>
                          <td>{hospital.branch}</td>
                          <td>{hospital.mobileNumber}</td>
                          <td>
                            <Button
                              className="w-100"
                              style={{ background: colors.primary }}
                            >
                              view
                            </Button>
                          </td>
                        </tr>
                      </>
                    )})
                  : records?.map((hospital, id) => {
                    return (
                  <>
                    <tr key={id}>
                      <td>{hospital.id}</td>
                      <td>{hospital.name}</td>
                      <td>{hospital.branch}</td>
                      <td>{hospital.mobileNumber}</td>
                      <td>
                        <Button
                          className="w-100"
                          style={{ background: colors.primary }}
                        >
                          view
                        </Button>
                      </td>
                    </tr>
                  </>
                    )})}

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

export default AdminView;
