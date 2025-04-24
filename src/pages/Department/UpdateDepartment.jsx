import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { detailDepartment, UpdateDepartmentApi } from "../../Api/DepartmentApi";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";


function UpdateDepartment() {
    const { departmentId } = useParams();
    const navigate = useNavigate();


    const { data } = useQuery({
        queryKey: ["department-detail"],
        queryFn: () => detailDepartment(departmentId),
    });
    const departmentMutation = useMutation({
        mutationKey: ["update-department"],
        mutationFn: UpdateDepartmentApi,
        onSuccess: (data) => {
            toast.success(data.message || "Bo'lim muvaffaqiyatli o'zgartirildi");
        },
        onError: (error) => {
            toast.error(error.message || "Xatolik yuz berdi");
        },
    });
    const formik = useFormik({
        initialValues: {
            name: data?.name || "",

        },
        enableReinitialize: true, //update qilishda qayta render qiladi 1 ta kechmasligi uchun
        validationSchema: Yup.object({
            name: Yup.string().required("!!! To'ldirish shart")
        }),
        onSubmit: (values) => {
            // setFormData(values);
            const departmentDate = {
                name: values.name,
                departmentId,
            };
            departmentMutation.mutate(departmentDate);
        },
    });

    const isSuccess = departmentMutation.isSuccess;

    useEffect(() => {
        if (isSuccess) {
            navigate("/list-department");
        }
    }, [navigate, isSuccess]);

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Bo'limni o'zgartirish</h2>

            <div className="bg-white rounded-lg shadow">
                <div className="p-4 border-b bg-gray-50  ">
                    <form
                        onSubmit={formik.handleSubmit}
                        className="grid grid-cols-1 gap-3"
                    >
                        <div className="w-full">
                            <label
                                htmlFor="name"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                O'zgartirilayotgan bo'lim  nomi
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                {...formik.getFieldProps("name")}
                                className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                        </div>
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

export default UpdateDepartment;
