import React, {useState} from "react";
import {useQuery, useMutation} from "@tanstack/react-query";

import toast from "react-hot-toast";
import {Link} from "react-router-dom";
import {FaRegEdit} from "react-icons/fa";
import {MdDelete} from "react-icons/md";

import {RiAddBoxLine} from "react-icons/ri";
import {GetAllStudent} from "../../Api/StudentApi.jsx";

function ListStudents() {
    const [isModalOpen, setIsModalOpen] = useState(null);
    const {isError, isSuccess, isLoading, data, error, refetch} = useQuery({
        queryKey: ["list-students"],
        queryFn: GetAllStudent,
    });

    // const deviceMutation = useMutation({
    //     mutationKey: ["user-delete"],
    //     mutationFn: DeleteUser,
    //     onSuccess: (data) => {
    //         toast.success(data.message || "Foydalanuvchi muvaffaqiyatli o'chirildi");
    //         setIsModalOpen(null);
    //     },
    //     onError: (error) => {
    //         toast.error(error.message || "Xatolik yuz berdi");
    //     },
    // });
    //
    // const handleDeleteClick = (userId) => {
    //     setIsModalOpen(userId); // Modalni ochish
    // };
    //
    // const deleteHandler = async (userId) => {
    //     categoryPageMutation
    //         .mutateAsync(userId)
    //         .then(() => {
    //             refetch();
    //         })
    //         .catch((e) => console.log(e));
    // };
    // const cancelDelete = () => {
    //     setIsModalOpen(null); // Modalni bekor qilish
    // };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-800">Barcha Abiturentlar</h2>
                {/*<button className="bg-green-600 text-white px-4 py-2 rounded " disabled>*/}
                {/*    <Link to="/create-device" className="flex items-center">*/}
                {/*        <RiAddBoxLine className="mr-2"/>*/}
                {/*        Abiturrent qo'shish*/}
                {/*    </Link>*/}
                {/*</button>*/}
            </div>

            <div className="bg-white rounded-lg shadow">
                <div className="p-4">
                    <table className="w-full">
                        <thead>
                        <tr className="text-left bg-gray-50">
                            <th className="p-3 text-gray-600">N</th>
                            <th className="p-3 text-gray-600">Abiturent ismi</th>
                            <th className="p-3 text-gray-600"> Telefon raqami</th>
                            <th className="p-3 text-gray-600"> Yunalishi</th>
                            {/*<th className="p-3 text-gray-600 flex justify-center ">*/}
                            {/*    Action*/}
                            {/*</th>*/}
                        </tr>
                        </thead>
                        <tbody>
                        {data?.map((student, index) => {
                            return (
                                <tr className="border-t" key={student?.id}>
                                    <td className="p-3 ">{index + 1}</td>
                                    <td className="p-3 ">{student?.first_name}</td>
                                    <td className="p-3 ">{student?.phone_number}</td>
                                    <td className="p-3 ">{student?.direction}</td>

                                {/*    <td className="p-3">*/}
                                {/*        <div className="flex justify-center">*/}
                                {/*            <Link*/}
                                {/*                className=" flex items-center justify-start   pr-8"*/}
                                {/*                to={`/update-user/${user?.id}`}*/}
                                {/*            >*/}
                                {/*                <button>*/}
                                {/*                    <FaRegEdit className="text-2xl text-[#3697A5]"/>*/}
                                {/*                </button>*/}
                                {/*            </Link>*/}
                                {/*            <button*/}
                                {/*                className="flex items-center justify-start  "*/}
                                {/*                onClick={() => handleDeleteClick(user?.id)}*/}
                                {/*            >*/}
                                {/*                <MdDelete className="text-2xl text-red-600"/>*/}
                                {/*            </button>*/}
                                {/*            {isModalOpen === user?.id && (*/}
                                {/*                <div*/}
                                {/*                    className="fixed inset-0 flex items-center justify-center bg-gray-500/50">*/}
                                {/*                    <div className="bg-white p-6 rounded-lg shadow-lg">*/}
                                {/*                        <h2 className="text-lg font-semibold mb-4">*/}
                                {/*                            Haqiqatan ham o‘chirmoqchimisiz?*/}
                                {/*                        </h2>*/}
                                {/*                        <p className="mb-6">*/}
                                {/*<span className="text-red-600">*/}
                                {/*  {user?.full_name || "Bu element"}*/}
                                {/*</span>{" "}*/}
                                {/*                            ni o‘chirishni tasdiqlaysizmi?*/}
                                {/*                        </p>*/}
                                {/*                        <div className="flex justify-end gap-4">*/}
                                {/*                            <button*/}
                                {/*                                className="px-4 py-2 bg-gray-300 rounded "*/}
                                {/*                                onClick={cancelDelete}*/}
                                {/*                            >*/}
                                {/*                                Bekor qilish*/}
                                {/*                            </button>*/}
                                {/*                            <button*/}
                                {/*                                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"*/}
                                {/*                                onClick={() => deleteHandler(user?.id)}*/}
                                {/*                            >*/}
                                {/*                                O‘chirish*/}
                                {/*                            </button>*/}
                                {/*                        </div>*/}
                                {/*                    </div>*/}
                                {/*                </div>*/}
                                {/*            )}*/}
                                {/*        </div>*/}
                                {/*    </td>*/}
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default ListStudents;
