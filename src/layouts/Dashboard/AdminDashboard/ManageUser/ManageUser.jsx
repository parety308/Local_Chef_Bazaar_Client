import React from 'react';
import useAuth from '../../../../hooks/useAuth/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../../hooks/useAxiosSecure/useAxiosSecure';
import Swal from 'sweetalert2';

const ManageUser = () => {
    // const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    });

    const handleMakeFraud = (email) => {
        axiosSecure.patch(`/users/${email}`, { status: 'fraud' })
            .then(res => {
                // console.log(res.data);
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "User Marked as Fraud",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
                refetch();
            });
    };

    return (
        <div className="p-6">
            <title>Manage Users</title>

            {users.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 bg-white shadow-md rounded-xl mx-5 md:mx-auto max-w-md">
                    {/* Icon */}
                    <div className="bg-purple-100 p-5 rounded-full mb-6">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-12 w-12 text-purple-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M17 20h5v-2a4 4 0 00-4-4h-1M9 20H4v-2a4 4 0 014-4h1m4-4a4 4 0 11-8 0 4 4 0 018 0zm8 0a4 4 0 11-8 0 4 4 0 018 0z"
                            />
                        </svg>
                    </div>

                    {/* Message */}
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2 text-center">
                        No Users Found 👥
                    </h2>
                    <p className="text-gray-500 mb-6 text-center max-w-xs md:max-w-sm">
                        There are currently no users to manage. Invite new users or check back later.
                    </p>

                    {/* Call-to-Action Button */}
                    <button className="px-6 py-3 bg-gradient-to-r from-purple-400 to-indigo-500 hover:from-indigo-500 hover:to-purple-400 text-white font-semibold rounded-full shadow-lg transition duration-300">
                        Invite Users ✉️
                    </button>
                </div>
            )}


            <h1 className="text-3xl font-bold mb-6">Manage Users</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="py-3 px-6 text-left border-b">User Name</th>
                            <th className="py-3 px-6 text-left border-b">User Email</th>
                            <th className="py-3 px-6 text-left border-b">User Role</th>
                            <th className="py-3 px-6 text-left border-b">User Status</th>
                            <th className="py-3 px-6 text-center border-b">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id} className="hover:bg-gray-50">
                                <td className="py-4 px-6 border-b">{user.name}</td>
                                <td className="py-4 px-6 border-b">{user.email}</td>
                                <td className="py-4 px-6 border-b capitalize">{user.role}</td>
                                <td className="py-4 px-6 border-b capitalize">{user.status}</td>
                                <td className="py-4 px-6 border-b text-center">
                                    {
                                        user.status !== 'fraud' ? (
                                            <button
                                                onClick={() => handleMakeFraud(user.email)}
                                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                                            >
                                                Mark as Fraud
                                            </button>) : <span className="text-gray-500">Fraud</span>
                                    }
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUser;
