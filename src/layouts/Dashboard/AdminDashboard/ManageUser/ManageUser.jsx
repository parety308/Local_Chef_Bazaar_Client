import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../../hooks/useAxiosSecure/useAxiosSecure';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';

const ManageUser = () => {

    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

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
        <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors duration-300">

            <title>Manage Users</title>

            {/* ================= EMPTY STATE ================= */}
            {users.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 
                bg-white dark:bg-gray-800
                shadow-md rounded-xl mx-5 md:mx-auto max-w-md
                transition">

                    {/* Icon */}
                    <div className="bg-purple-100 dark:bg-purple-900/40 p-5 rounded-full mb-6">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-12 w-12 text-purple-500 dark:text-purple-400"
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
                    <h2 className="text-2xl md:text-3xl font-bold 
                    text-gray-800 dark:text-gray-100 mb-2 text-center">
                        No Users Found 👥
                    </h2>

                    <p className="text-gray-500 dark:text-gray-400 mb-6 text-center max-w-xs md:max-w-sm">
                        There are currently no users to manage. Invite new users or check back later.
                    </p>

                    {/* Button */}
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="px-6 py-3 
                        bg-gradient-to-r from-purple-400 to-indigo-500
                        hover:from-indigo-500 hover:to-purple-400
                        text-white font-semibold rounded-full shadow-lg
                        transition duration-300">
                        Dashboard ✉️
                    </button>
                </div>
            )}

            {/* ================= USER TABLE ================= */}
            {users.length > 0 && (
                <>
                    <h1 className="text-3xl font-bold mb-6
                    text-gray-800 dark:text-gray-100">
                        Manage Users
                    </h1>

                    <div className="overflow-x-auto 
                    bg-white dark:bg-gray-800
                    rounded-xl shadow transition">

                        <table className="table w-full">

                            <thead className="bg-gray-100 dark:bg-gray-700
                            text-gray-700 dark:text-gray-200">
                                <tr>
                                    <th>User Name</th>
                                    <th>User Email</th>
                                    <th>User Role</th>
                                    <th>User Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>

                            <tbody className="text-gray-700 dark:text-gray-300">
                                {users.map((user) => (
                                    <tr
                                        key={user.id}
                                        className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"
                                    >
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.role}</td>
                                        <td>{user.status}</td>

                                        <td>
                                            {user.status !== 'fraud' ? (
                                                <button
                                                    onClick={() => handleMakeFraud(user.email)}
                                                    className="bg-red-500 hover:bg-red-600
                                                    dark:bg-red-600 dark:hover:bg-red-700
                                                    text-white px-4 py-2 rounded transition"
                                                >
                                                    Mark as Fraud
                                                </button>
                                            ) : (
                                                <span className="text-gray-500 dark:text-gray-400">
                                                    Fraud
                                                </span>
                                            )}
                                        </td>

                                    </tr>
                                ))}
                            </tbody>

                        </table>
                    </div>
                </>
            )}
        </div>
    );
};

export default ManageUser;