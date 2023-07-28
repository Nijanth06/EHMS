import axios from "./api/axios"

//need to update as patient service
export const authloginStaff = async(data) => {
    console.log(data,"pat");
   const response = await axios.post('api/token',data)
   return response
}

export const getStaffCount = async (config) => {
    const response = await axios.get('admin/allEmployeeCount', config)
    return response
}
export const passwordReset = async (data,config) => {
    console.log(data,config);
    const response = await axios.post('doctor/passwordChange',data, config)
    return response
}
const StaffServices = {
    authloginStaff,
    getStaffCount,
    passwordReset
}
export default StaffServices