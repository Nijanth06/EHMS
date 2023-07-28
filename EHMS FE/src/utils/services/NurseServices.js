import axios from "./api/axios";

export const registerNurse = async (data, config) => {
    const response = await axios.post('admin/nurseRegister', data, config)
    return response
}

export const getNureDetails = async (config) => {
    const response = await axios.get('admin/Employee/Nurse', config)
    console.log(response);
    return response
}

const NurseServices = {
    registerNurse,
    getNureDetails
}
export default NurseServices