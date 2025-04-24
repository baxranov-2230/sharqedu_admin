import axios from "axios";

const API_URL =  import.meta.env.VITE_API_URL;
import axiosInstance from "./axiosinstance";
export const CreateDepartmentApi = async (departmentDate) => {
    try {
        const response = await axiosInstance.post(
            `${API_URL}/department/add_department`,
            {
                name: departmentDate.name
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
export const GetAllDepartment = async () => {
    const allDepartment = await axiosInstance.get(`${API_URL}/department/get_departments`);
    return allDepartment.data;
};
export const DeleteDepartment = async (departmentId) => {
    const Department = await axiosInstance.delete(
        `${API_URL}/department/delete_department/${departmentId}`
    );
    return Department.data;
};
export const detailDepartment = async (departmentId) => {
    const department = await axiosInstance.get(`${API_URL}/department/department_detail/${departmentId}`, {});
    return department.data;
};
export const UpdateDepartmentApi = async (departmentDate) => {
    const response = await axiosInstance.put(
        `${API_URL}/department/update_department/${departmentDate?.departmentId}`,
        {
            name: departmentDate.name,
        }
    );
    return response.data;
};