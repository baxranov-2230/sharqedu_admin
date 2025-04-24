import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
// import {}
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import {GetAllDepartment} from "../../Api/DepartmentApi";
import {detailUser, UpdateUserApi} from "../../Api/UserApi.jsx";

function UpdateUser() {
    const { userId } = useParams();
    const navigate = useNavigate();
    const { isError, isLoading, data: data_faculty, error, refetch } = useQuery({
        queryKey: ["list-department"],
        queryFn: GetAllDepartment,
    });

    const { data } = useQuery({
        queryKey: ["user-detail"],
        queryFn: () => detailUser(userId),
    });
    const userMutation = useMutation({
        mutationKey: ["update-user"],
        mutationFn: UpdateUserApi,
        onSuccess: (data) => {
            toast.success(data.message || "Foydalanuvchi muvaffaqiyatli o'zgartirildi");
        },
        onError: (error) => {
            toast.error(error.message || "Xatolik yuz berdi");
        },
    });
    const formik = useFormik({
        initialValues: {
            full_name: data?.full_name || "",
            username: data?.username || "",
            role: data?.role || "",
            contact: data?.contact || "",
            number_room: data?.number_room || "",
            departmentId: data?.department_id || ""
        },
        enableReinitialize: true, //update qilishda qayta render qiladi 1 ta kechmasligi uchun
        validationSchema: Yup.object({
            full_name: Yup.string().required("!!! To'ldirish shart"),
            username: Yup.string().required("!!! To'ldirish shart"),
            role: Yup.string().required("!!! To'ldirish shart"),
            contact: Yup.string().required("!!! To'ldirish shart"),
            number_room: Yup.string().required("!!! To'ldirish shart"),
            departmentId: Yup.string().required("!!! To'ldirish shart"),

        }),
        onSubmit: (values) => {
            // setFormData(values);
            const userDate = {
                full_name: values.full_name,
                username: values.username,
                role: values.role,
                contact: values.contact,
                number_room: values.number_room,
                departmentId: values.departmentId,
                userId,
            };
            userMutation.mutate(userDate);
        },
    });

    const isSuccess = userMutation.isSuccess;

    useEffect(() => {
        if (isSuccess) {
            navigate("/list-users");
        }
    }, [navigate, isSuccess]);

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Foydalanuvchini o'zgartirish</h2>

            <div className="bg-white rounded-lg shadow">
                <div className="p-4 border-b bg-gray-50  ">
                    <form
                        onSubmit={formik.handleSubmit}
                        className="grid grid-cols-2 gap-3"
                    >
                        <div className="w-full">
                            <label
                                htmlFor="full_name"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Foydalanuvchi to'liq ismi
                            </label>
                            <input
                                type="text"
                                id="full_name"
                                name="full_name"
                                {...formik.getFieldProps("full_name")}
                                className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                        </div>
                        <div className="w-full">
                            <label
                                htmlFor="username"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Foydalanuvchi username
                            </label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                {...formik.getFieldProps("username")}
                                className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                        </div>
                        <div className="w-full">
                            <label
                                htmlFor="role"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Foydalanuvchi role
                            </label>
                            <input
                                type="text"
                                id="role"
                                name="role"
                                {...formik.getFieldProps("role")}
                                className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                        </div>
                        <div className="w-full">
                            <label
                                htmlFor="contact"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Foydalanuvchi telefon nomeri
                            </label>
                            <input
                                type="text"
                                id="contact"
                                name="contact"
                                {...formik.getFieldProps("contact")}
                                className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                        </div>
                        <div className="w-full">
                            <label
                                htmlFor="number_room"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Foydalanuvchi xona nomeri
                            </label>
                            <input
                                type="text"
                                id="number_room"
                                name="number_room"
                                {...formik.getFieldProps("number_room")}
                                className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                        </div>

                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Bo'lim</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={formik.values.departmentId}
                                label="Bolim"
                                name="departmentId"
                                onChange={formik.handleChange}
                            >
                                {isLoading ? (
                                    <MenuItem disabled>Loading...</MenuItem>
                                ) : (
                                    data_faculty?.map((department) => (
                                        <MenuItem key={department?.id} value={department?.id}>
                                            {department?.name}
                                        </MenuItem>
                                    ))
                                )}
                            </Select>
                        </FormControl>
                        <button
                            type="submit"
                            className="focus:outline-none w-full text-white bg-[#3697A5] hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
                        >
                            Qo'shish
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default UpdateUser;
