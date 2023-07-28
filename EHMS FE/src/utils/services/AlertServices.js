import axios from "./api/axios";

//send alerts...
export const sendAlert = async (data) => {
  const response = await axios.post("alert/send", data);
  return response;
};

//get all alerts...
export const getAlert = async () => {
  const response = await axios.get("alert/get-alert");
  return response;
};

//get new alerts counts...
export const getNewAlertCount = async () => {
  const response = await axios.get("alert/get-alert-count");
  return response;
};

//update(seen message) alerts...
export const updateAlert = async (userId, config) => {
  // console.log("Came update id:", userId);
  const response = await axios.put(`alert/status-update/${userId}`, config);
  return response;
};



const AlertServices = {
    sendAlert,
    getAlert,
    updateAlert,
    getNewAlertCount
};
export default AlertServices;
