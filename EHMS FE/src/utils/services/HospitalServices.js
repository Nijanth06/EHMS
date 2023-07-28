import axios from "./api/axios";

//registration
export const registerHospital = async (data, config) => {
  console.log(data);
  const response = await axios.post("admin/hospital/register", data, config);
  return response;
};

//get count
export const getHospitalCount = async (config) => {
  const response = await axios.get("admin/getHospitalCount", config);
  return response;
};

//get hospital
export const getHospitalDetail = async (config) => {
  const response = await axios.get("admin/hospital/all", config);
  return response;
};

const HospitalServices = {
  registerHospital,
  getHospitalCount,
  getHospitalDetail
};
export default HospitalServices;
