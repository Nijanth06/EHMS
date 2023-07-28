import axios from "./api/axios";

//patient regiasteration
export const registerPatient = async (data) => {
  const response = await axios.post("auth/register", data);
  return response;
};

//get count
export const getPatientCount = async (config) => {
  const response = await axios.get("admin/getDoctorCount", config);
  return response;
};

//get Detail
export const getPatientDetail = async (config) => {
  const response = await axios.get("admin/doctor", config);
  return response;
};
//upload medi detals
export const uploadRecords = async (data, config) => {
  const response = await axios.post("medical/uploadRecords", data, config);
  return response;
};
export const getMedicalRecords = async (email, config) => {
  const response = await axios.get(`medical/getRecordByEmail/${email}`, config);
  return response;
};

//patient login
export const authloginPatient = async (data) => {
  const response = await axios.post("auth/token", data);
  return response;
};
export const authPatient = async (config) => {
  const response = await axios.get("auth/profile", config);
  return response;
};

export const authRecPatient = async (config, email) => {
  const response = await axios.get(`patients/get/by/${email}`, config);
  return response;
};


export const getPatientProfileUpdate = async (data, config) => {
  // console.log(data);
  const response = await axios.put("auth/patientUpdate", data, config);
  return response;
};

export const getPatientProfile = async (config) => {
  const response = await axios.get("auth/profileEmail", config);
  return response;
};
export const passwordReset = async (data, config) => {
  console.log(data, config);
  const response = await axios.post("auth/passwordChange", data, config);
  return response;
};

export const getAllPatientData = async (config) => {

  const response = await axios.get('patients/allPatient', config)

  return response

};

export const getAllPatientByHospital = async (config,ids) => {

  const response = await axios.get(`/appointment/getByHospital/${ids}`, config)

  return response

};




const PatientServices = {
  registerPatient,
  authloginPatient,
  authPatient,
  uploadRecords,
  getMedicalRecords,
  getPatientProfileUpdate,
  getPatientProfile,
  passwordReset,
  getAllPatientData,
  getAllPatientByHospital,
  authRecPatient
};
export default PatientServices;
