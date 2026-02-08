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
