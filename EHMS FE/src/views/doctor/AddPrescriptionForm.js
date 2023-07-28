import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { useSelector } from "react-redux";
import { decrypt } from "../../utils/aes/AES";
import { useState } from "react";
import { useForm } from "react-hook-form";
import DoctorServices from "../../utils/services/DoctorServices";
import Swal from "sweetalert2";
import { Button } from "react-bootstrap";
import {  useParams } from "react-router-dom";
const AddPrescription = () => {
  const authUser = useSelector((state) => state.auth);
  const accesstoken = decrypt(authUser.token);
  const [loading, setLoading] = useState(true);

  const [imageFile, setImageFile] = useState(null);
  const { id } = useParams();
  const {
    register: prescriptionRegister,
    handleSubmit: handlePrescriptionSubmit,
    formState: { errors: prescriptionErrors },
    reset: prescriptionReset,
  } = useForm({ mode: "onTouched" });

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setImageFile(base64);
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const config = {
    headers: {
      Authorization: `Bearer ${accesstoken}`,
    },
    responseType: "json",
  };

  const addPrescriptionToTheSystem = async (data) => {
    data["imageFile"] = imageFile;
    data["id"] = id;
    console.log(data);

    try {
      setLoading(true);
      await DoctorServices.registerPrescription(data, config);
      setLoading(false);
      Swal.fire({
        icon: "success",
        title: "Successfully Registered",
      });
    } catch (error) {
      console.error("Error:", error);
      if (error.response.status === 400) {
        Swal.fire({
          icon: "error",
          title: "Data Error",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Hmm Something wrong",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div class="container ">
      <form onSubmit={handlePrescriptionSubmit(addPrescriptionToTheSystem)}>
        <h1>Current Details</h1>
        <br></br>
        <div class="bg-secondary bg-light p-4">
          <div class="row g-3 align-items-center">
            <div class="col-6">
              <label for="inputdate" class="col-form-label">
                Date
              </label>
            </div>
            <div class="col-6">
              <input
                type="date"
                id="inputdate"
                class="form-control"
                aria-labelledby="dateHelpInline"
              />
            </div>
          </div>
          <div class="row g-3 align-items-center">
            <div class="col-6">
              <label for="inputlocation" class="col-form-label">
                Location
              </label>
            </div>
            <div class="col-6">
              <input
                type="location"
                id="inputlocation"
                class="form-control"
                aria-labelledby="locationHelpInline"
              />
            </div>
          </div>

          <div class="row g-3 align-items-center">
            <div class="col-6">
              <label for="inputillness" class="col-form-label">
                Illness
              </label>
            </div>
            <div class="col-6">
              <input
                type="Illness"
                id="inputIllness"
                class="form-control"
                aria-labelledby="IllnessHelpInline"
              />
            </div>
          </div>

          <div class="row g-3 align-items-center">
            <div class="col-6">
              <label for="inputdrugs" class="col-form-label">
                Drugs
              </label>
            </div>
            <div class="col-6">
              <input
                type="drugs"
                id="inputdrugs"
                class="form-control"
                aria-labelledby="drugsHelpInline"
              />
            </div>
          </div>

          <div class="row g-3 align-items-center">
            <div class="col-6">
              <label for="inputstatus" class="col-form-label">
                Status
              </label>
            </div>
            <div class="col-6">
              <input
                type="status"
                id="inputstatus"
                class="form-control"
                aria-labelledby="statusHelpInline"
              />
            </div>
          </div>

          <div class="row g-3 align-items-center">
            <div class="col-6">
              <label for="inputprescription" class="col-form-label">
                Prescription
              </label>
            </div>
            <div class="col-6">
              <input
                type="file"
                accept="image/*"
                id="inputprescription"
                class="form-control"
                aria-labelledby="prescriptionHelpInline"
                onChange={(e) => uploadImage(e)}
              />
            </div>
          </div>
        </div>
        <br></br>
        <div class="d-md-flex justify-content-md-end">
          <Button class="btn btn-primary" type="submit">
            Upload
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddPrescription;
