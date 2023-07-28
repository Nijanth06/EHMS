import axios from "./api/axios";

export const registerReceptionist = async (data, config) => {
  const response = await axios.post("admin/addReceptionist", data, config);
  return response;
};

//get count
export const getRecepCount = async (data, config) => {
  const response = await axios.get("admin/receptionists", config);
  return response;
};
//get count
export const getRecepDetail = async ( config) => {
  const response = await axios.get("admin/Employee/Receptionist", config);
  return response;
};

//patient regiasteration
export const addPatient = async (data,config) => {
  const response = await axios.post("receptionist/addPatient", data,config);
  return response;
};

export const getCurrentUserHospitalId = async ( config) => {
  const response = await axios.get("admin/recep/hosProfile", config);
  return response;
};

export const getReceptionistProfile = async (config) => {
  const response = await axios.get("receptionist/profile", config);
  return response;
};
export const getReceptionistProfileUpdate = async (data, config) => {
  const response = await axios.post("receptionist/updateProfile", data, config);
  return response;
};

//get all doctors details...

export const getAllDoctors = async ( config) => {
  const response = await axios.get("admin/allDoctors", config);
  return response;

};

//get all HRP details...

export const getAllHRP = async ( config) => {
  const response = await axios.get("admin/allHealthRecordPerson", config);
  return response;

};

//get all nurse details...

export const getAllNurse = async ( config) => {
  const response = await axios.get("admin/allNurse", config);
  return response;

};

//for alert system...
export const getNewAlerts = async (config) => {
  const response = await axios.get("alert/get-alert", config);
  return response;
};

const ReceptionistServices = {
  registerReceptionist,
  getRecepCount,
  getRecepDetail,
  getCurrentUserHospitalId,
  addPatient,
  getReceptionistProfile,
  getReceptionistProfileUpdate,
  getAllDoctors,
  getAllNurse,
  getAllHRP,
  getNewAlerts
};
export default ReceptionistServices;
