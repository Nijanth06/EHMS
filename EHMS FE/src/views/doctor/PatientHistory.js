import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import { navigate, useNavigate, useParams } from "react-router-dom";

const PatientHistory = () => {
  const navigate = useNavigate();
  const patientId = useParams();

  return (
    <div class="container">
      <div>
        {/* Display patient history */}
        <h1>Patient History</h1> <br></br>
        <div class="bg-secondary bg-light p-4">
          <h7>Patient Detail List</h7>
          <div className="row g-3 align-items-center justify-content-center ">
            <div className="col">
              <textarea className="form-control" rows="3"></textarea> <br></br>
              <textarea className="form-control" rows="3"></textarea> <br></br>
              <textarea className="form-control" rows="3"></textarea> <br></br>
              <textarea className="form-control" rows="3"></textarea> <br></br>
            </div>
          </div>
        </div>
        <br></br>
        {/* Add prescription button */}
        <div class="d-md-flex justify-content-md-end">
          <button
            class="btn btn-primary"
            type="button"
            onClick={() => {
              navigate(`/add-prescription/${patientId.id}`);
            }}
          >
            Add New prescription
          </button>
        </div>
      </div>
    </div>
  );
};

export default PatientHistory;
