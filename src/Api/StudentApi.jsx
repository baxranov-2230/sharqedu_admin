const API_URL =  import.meta.env.VITE_API_URL;
import axiosInstance from "./axiosinstance";
export const CreateDeviceApi = async (deviceDate) => {
    try {
        const response = await axiosInstance.post(
            `${API_URL}/device/add_device`,
            {
                name: deviceDate.name,
                serial_number: deviceDate.serial_number,
                status: deviceDate.status,
                user_id: deviceDate.userId,
                category_id: deviceDate.categoryId
            },
        );

        return await response.data;
    } catch (error) {
        if (error.response && error.response.data.message) {
            throw new Error(error.response.data.message);
        }
        throw new Error(error.response.data.detail);
    }
};
export const GetAllDevice = async () => {
    const allDevice = await axiosInstance.get(`${API_URL}/device/get`);
    return allDevice.data;
};
// export const DeleteUser = async (userId) => {
//     const Department = await axiosInstance.delete(
//         `${API_URL}/user/delete/${userId}`
//     );
//         return Department.data;
//     };
// export const detailUser = async (userId) => {
//     const user = await axiosInstance.get(`${API_URL}/user/detail_user/${userId}`, {});
//     return user.data;
// };
// export const UpdateUserApi = async (userDate) => {
//     const response = await axiosInstance.put(
//         `${API_URL}/user/update_user/${userDate?.userId}`,
//         {
//             full_name: userDate.full_name,
//             username: userDate.username,
//             role: userDate.role,
//             contact: userDate.contact,
//             number_room: userDate.number_room,
//             department_id: userDate.departmentId
//         }
//     );
//     return response.data;
// };