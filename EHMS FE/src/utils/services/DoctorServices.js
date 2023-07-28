import axios from "./api/axios";

//Register new doctor
export const registerDoctor = async (data, config) => {
  const response = await axios.post("admin/doctorRegister", data, config);
  return response;
};

export const registerPrescription = async (data, config) => {
  const response = await axios.post("", data, config);
  return response;
};

//get Doctor
export const getDoctorDetail = async (config) => {
  const response = await axios.get("admin/Employee/Doctor", config);
  return response;
};
export const getDoctorProfile = async (config) => {
  const response = await axios.get("doctor/profile", config);
  return response;
};
// export const getDoctorProfileUpdate = async (data, config) => {
//   console.log(data, "lo");
//   const response = await axios.get("doctor/all", data, config);
//   return response;
// };
export const getDoctorProfileUpdate = async (data, config) => {
  console.log(data, "lo");
  const response = await axios.post("doctor/all", data, config);
  return response;
};
export const doctorTimeSchedule = async (data, config) => {
  const response = await axios.post("doctor/save", data, config);
  return response;
};
export const getShedule = async (param, config) => {
  const response = await axios.get(
    `doctor/doctordates?ids=${param.id}&date=${param.date}`,
    config
  );
  return response;
};

const DoctorServices = {
  registerDoctor,
  getDoctorDetail,
  getDoctorProfile,
  getDoctorProfileUpdate,
  doctorTimeSchedule,
  getShedule,
};
export default DoctorServices;
