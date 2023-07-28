import axios from "./api/axios";
//get hospital
export const makeAppointment = async (data, config) => {
  const response = await axios.post("appointment/", data, config);
  return response;
};

export const getCurrentAppointment = async (id, config) => {
  const response = await axios.get(`appointment/latest/${id}`, config);
  return response;
};

export const cancelAppointment = async (id, data, config) => {
  const response = await axios.put(`appointment/cancel//${id}`, data, config);
  return response;
};

export const getDailyAppointment = async (id, config) => {
  const response = await axios.get(`appointment/getByDoctor/${id}`, config);
  return response;
};

export const getAppointmentHistory = async (id, config) => {
  const response = await axios.get(`appointment/getByPatient//${id}`, config);
  return response;
};

const AppointmentServices = {
  makeAppointment,
  getCurrentAppointment,
  cancelAppointment,
  getAppointmentHistory,
  getDailyAppointment,
};

export default AppointmentServices;
