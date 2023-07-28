import axios from "./api/axios";

export const registerRcPerson = async (data, config) => {
    const response = await axios.post('admin/recordPersonRegister', data, config)
    return response
}

export const getRcPerosnDetails = async (config) => {
    const response = await axios.get('admin/Employee/RecordPerson', config)
    console.log(response);
    return response
}

const RecordPersonService = {
    registerRcPerson,
    getRcPerosnDetails
}
export default RecordPersonService