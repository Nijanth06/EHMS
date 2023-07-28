import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import colors from "../../utils/colors/Colors";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import PatientServices from "../../utils/services/PatientServices";
import { Container, Spinner } from "react-bootstrap";
import { decrypt } from "../../utils/aes/AES";
import { BsPlus } from "react-icons/bs";
import Loader from "../../components/Loader";
import Carousel from "react-bootstrap/Carousel";

// import Carousel from "@brainhubeu/react-carousel";
// import "@brainhubeu/react-carousel/lib/style.css";
const MedicalRecord = () => {
  const [show, setShow] = useState(false);
  const [response, setResponse] = useState();
  const [open, setOpen] = useState(false);
  const [details, setDetails] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const authUser = useSelector((state) => state.auth);
  const accesstoken = decrypt(authUser.token);
  const email = decrypt(authUser.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClose = () => {
    unregister("shortDesc");
    unregister("longDesc");
    setBase64Images([]);
    setShow(false);
    setOpen(false);
  };
  const handleShow = () => setShow(true);
  const handleOpen = () => setOpen(true);
  const {
    register,
    unregister,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onTouched" });

  const [imageFiles, setImageFiles] = useState([]);
  const [img, setImg] = useState();
  const [base64Images, setBase64Images] = useState([]);

  //Config for backend call.
  const config = {
    headers: {
      Authorization: `Bearer ${accesstoken}`,
    },
    responseType: "json",
  };
  const handleImageUpload = (event) => {
    const files = event.target.files;
    const fileArray = Array.from(files);

    setImageFiles(fileArray);

    const imagePromises = fileArray.map((file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = () => resolve({ imageFile: reader.result });
        reader.onerror = (error) => reject(error);
      });
    });

    Promise.all(imagePromises)
      .then((results) => {
        setBase64Images(results);
        // console.log(JSON.stringify(output));
      })
      .catch((error) => {
        console.error("Error converting images to base64:", error);
      });
  };
  const uploadRecords = async (data) => {
    data["imageFiles"] = base64Images;

    console.log(base64Images);
    try {
      handleClose();
      setLoading(true);
      const _data = await PatientServices.uploadRecords(data, config);
      setResponse(_data);
      setLoading(false);
      Swal.fire({
        icon: "success",
        title: "Successfuly Uploaded ",
      });
    } catch (error) {
      console.error("Error:", error);
      if (error.response.status === 403) {
        Swal.fire({
          icon: "error",
          title: "Invalid data",
        });
      } else if (error.response.status === 404) {
        Swal.fire({
          icon: "error",
          title: "User not found",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "We are facing an issue",
        });
      }
      setLoading(false);
    }
  };
  const loadData = async (data) => {
    try {
      setLoading(true);
      const _data = await PatientServices.getMedicalRecords(email, config);
      setLoading(false);
      setDetails(_data.data);
      console.log(_data.data);
    } catch (error) {
      if (error.response.status === 404) {
        Swal.fire({
          icon: "info",
          title: "No data found",
        });

        setLoading(false);
      } else {
        Swal.fire({
          icon: "error",
          title: "We are facing an issue",
        });
      }
      setLoading(false);
    }
  };
  useEffect(() => {
    loadData();
  }, [response]);
  console.log(img);
  console.log(details);
  return (
    <>
      <Container className="text-center">
        <div style={{ textAlign: "center" }}>
          {!isLoading ? (
            <>
              <br />
              <Modal show={show} onHide={handleClose}>
                <Form onSubmit={handleSubmit(uploadRecords)}>
                  <Modal.Header closeButton>
                    <Modal.Title>Medical Records</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form.Label>Enter Short Description</Form.Label>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Control
                        type="text"
                        className={errors.shortDesc && "border-danger"}
                        placeholder="Short Description"
                        {...register("shortDesc", {
                          required: "Required",
                          pattern: {
                            value: /^[a-zA-Z ]/,
                            message: "Letters only",
                          },
                        })}
                      />
                      {errors.shortDesc && (
                        <span style={{ color: colors.danger }}>
                          {errors.shortDesc.message}
                        </span>
                      )}
                    </Form.Group>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlTextarea1"
                    >
                      <Form.Label>Enter Description</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        className={errors.longDesc && "border-danger"}
                        placeholder="Description"
                        {...register("longDesc", {
                          required: "Required",
                        })}
                      />
                      {errors.longDesc && (
                        <span style={{ color: colors.danger }}>
                          {errors.longDesc.message}
                        </span>
                      )}
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formFile">
                      <Form.Label>Enter Description File</Form.Label>
                      <Form.Control
                        type="file"
                        multiple
                        accept="image/png"
                        onChange={(e) => handleImageUpload(e)}
                      />
                      <Form.Text className="text-muted">
                        accept only png file format
                      </Form.Text>
                    </Form.Group>
                    {/* {base64Images.map((base64Image, index) => (
                  <div key={index}>
                    <img src={base64Image} alt={`Image ${index + 1}`} />
                  </div>
                ))} */}
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      Close
                    </Button>
                    {!isLoading ? (
                      <Button
                        type="submit"
                        style={{
                          background: colors.background,
                          borderColor: colors.background,
                        }}
                      >
                        Submit
                      </Button>
                    ) : (
                      <Button
                        className="mt-4 w-100"
                        disabled
                        style={{ background: colors.background }}
                      >
                        <Spinner animation="border" size="sm" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </Spinner>
                        Loading
                      </Button>
                    )}
                  </Modal.Footer>
                </Form>
              </Modal>

              <Modal show={open} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                  <Modal.Title>Uploaded Records</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ backgroundColor: colors.dark, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Carousel>
                    {img?.map((data, index) => (
                      <Carousel.Item style={{ height: "400px",  justifyContent: 'center', alignItems: 'center' }}>
                        <img
                          src={data.imageFile}
                          style={{ width: "auto", height: "100%", padding: "10px" }}
                        />
                      </Carousel.Item>
                    ))}
                  </Carousel>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                </Modal.Footer>
              </Modal>

              <br />
              <div style={{ textAlign: "center" }}>
                <h2>Your Medical History</h2>
              </div>
              <div style={{ marginBottom: "1rem" }}>
                <Button variant="primary" onClick={handleShow}>
                  <BsPlus size={24} className="mr-2" /> Upload Recodes
                </Button>
              </div>
              <br />
              <div className="table-responsive">
                <Table striped bordered hover style={{ textAlign: "center" }}>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Title</th>
                      <th>Description</th>
                      <th>Uploaded File</th>
                    </tr>
                  </thead>
                  <tbody>
                    {details?.map((data, id) => (
                      <tr key={id}>
                        <td style={{ width: "5%" }}>{id + 1}</td>
                        <td style={{ width: "20%" }}>{data.shortDesc}</td>
                        <td style={{ width: "50%" }}>{data.longDesc}</td>
                        <td style={{ width: "10%" }}>
                          <Button
                            style={{ backgroundColor: colors.primary }}
                            onClick={() => {
                              setImg(data.imageFiles);
                              handleOpen();
                            }}
                          >
                            View
                          </Button>
                        </td>
                      </tr>
                    ))}
                    <tr>{details ? null : "No data found"}</tr>
                  </tbody>
                </Table>
              </div>
            </>
          ) : (
            <Loader />
          )}
        </div>
      </Container>
    </>
  );
};

export default MedicalRecord;
