import axios from "./api/axios";

export const SearchAvailableDoctor = async (data) => {
  const response = await axios.post("doctor/doctorsAll",data);
  return response;
};

const Search = {
  SearchAvailableDoctor,
};
export default Search;
