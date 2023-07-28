import axios from "./api/axios";

export const refresh = async (refreshToken) => {
  const response = await axios.post("auth/refreshtoken", refreshToken);
  return response;
};
export const refreshTokenStaff = async (refreshToken) => {
  const response = await axios.post("admin/refreshToken", refreshToken);
  return response;
};
export const getalltest = async (option) => {
  const response = await axios.get("auth/all", option);
  return response;
};

const RefreshTokenService = {
  refresh,
  getalltest,
  refreshTokenStaff,
};
export default RefreshTokenService;
