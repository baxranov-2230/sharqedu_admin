import React, {useEffect} from "react";
import {useFormik} from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";
import {useMutation, useQuery} from "@tanstack/react-query";
import {GetAllDepartment} from "../../Api/DepartmentApi.jsx";
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {CreateUserApi} from "../../Api/UserApi.jsx";

function CreateDepartment() {
    const navigate = useNavigate();
    const {isError, isLoading, data, error, refetch} = useQuery({
        queryKey: ["list-department"],
        queryFn: GetAllDepartment,
    });
    const departmentMutation = useMutation({
        mutationKey: ["create-user"],
        mutationFn: CreateUserApi,
        onSuccess: (data) => {
            toast.success(data.message || "Foydalanuvchi muvaffaqiyatli yaratildi");
        },
        onError: (error) => {
            toast.error(error.message || "Xatolik yuz berdi");
        },
    });
    const formik = useFormik({
        initialValues: {
            full_name: "",
            username: "",
            password: "",
            role: "",
            contact: "",
            number_room: "",
            departmentId: "",
        },
        validationSchema: Yup.object({
            full_name: Yup.string().required("!!! To'ldirish shart"),
            username: Yup.string().required("!!! To'ldirish shart"),
            password: Yup.string().required("!!! To'ldirish shart"),
            role: Yup.string().required("!!! To'ldirish shart"),
            contact: Yup.string().required("!!! To'ldirish shart"),
            number_room: Yup.string().required("!!! To'ldirish shart"),
            departmentId: Yup.string().required("!!! To'ldirish shart")
        }),
        onSubmit: (values) => {
            // setFormData(values);
            const departmentDate = {
                full_name: values.full_name,
                username: values.username,
                password: values.password,
                role: values.role,
                contact: values.contact,
                number_room: values.number_room,
                departmentId: values.departmentId,
            };
            departmentMutation.mutate(departmentDate);
        },
    });

    const isSuccess = departmentMutation.isSuccess;
    useEffect(() => {
        if (isSuccess) {
            navigate("/list-users");
        }
    }, [navigate, isSuccess]);

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Foydalanuvchi qo'shish</h2>

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
                                To'liq ism familya
                            </label>

                            <input
                                type="text"
                                id="full_name"
                                name="full_name"
                                {...formik.getFieldProps("full_name")}
                                className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                            {formik.touched.full_name && formik.errors.full_name && (
                                <span className="text-red-500 mb-3 p-1 rounded-lg grid  w-fit  transition duration-500">
                        {formik.errors.full_name}
                                </span>)}
                        </div>
                        <div className="w-full">
                            <label
                                htmlFor="username"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >

                                Username
                            </label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                {...formik.getFieldProps("username")}
                                className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                            {formik.touched.username && formik.errors.username && (
                                <span
                                    className="text-red-500 mb-3 p-1 rounded-lg grid  w-fit  transition duration-500">
                        {formik.errors.username}
                                </span>)}
                        </div>

                        <div className="w-full">
                            <label
                                htmlFor="role"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Roleni kiriting
                            </label>

                            <input
                                type="text"
                                id="role"
                                name="role"
                                {...formik.getFieldProps("role")}
                                className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                            {formik.touched.role && formik.errors.role && (
                                <span className="text-red-500 mb-3 p-1 rounded-lg grid  w-fit  transition duration-500">
                        {formik.errors.role}
                                </span>)}
                        </div>
                        <div className="w-full">
                            <label
                                htmlFor="contact"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >

                                Telefon raqamni kiriting
                            </label>
                            <input
                                type="text"
                                id="contact"
                                name="contact"
                                {...formik.getFieldProps("contact")}
                                className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                            {formik.touched.contact && formik.errors.contact && (
                                <span
                                    className="text-red-500 mb-3 p-1 rounded-lg grid  w-fit  transition duration-500">
                        {formik.errors.contact}
                                </span>)}
                        </div>
                        <div className="w-full">
                            <label
                                htmlFor="number_room"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Xona raqamini kiriting
                            </label>
                            <input
                                type="text"
                                id="number_room"
                                name="number_room"
                                {...formik.getFieldProps("number_room")}
                                className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                            {formik.touched.number_room && formik.errors.number_room && (
                                <span
                                    className="text-red-500 mb-3 p-1 rounded-lg grid  w-fit  transition duration-500">
                        {formik.errors.number_room}
                                </span>)}
                        </div>

                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Bo'lim</InputLabel>

                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={formik.values.departmentId}
                                label="Department"
                                name="departmentId"
                                onChange={formik.handleChange}
                            >
                                {isLoading ? (
                                    <MenuItem disabled>Loading...</MenuItem>
                                ) : (
                                    data?.map((department) => (
                                        <MenuItem key={department?.id} value={department?.id}>
                                            {department?.name}
                                        </MenuItem>
                                    ))
                                )}
                            </Select>
                            {formik.touched.departmentId && formik.errors.departmentId && (
                                <span className="text-red-500 mb-3 p-1 rounded-lg grid  w-fit  transition duration-500">
                        {formik.errors.departmentId}
                                </span>)}
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
    )
        ;
}

export default CreateDepartment;
