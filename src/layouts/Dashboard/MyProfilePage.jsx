import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure/useAxiosSecure";
import useRole from "../../hooks/useRole/useRole";
import { useQuery } from "@tanstack/react-query";

const MyProfilePage = () => {
    const { user } = useAuth();
    const { role } = useRole();
    const axiosSecure = useAxiosSecure();

    const { data: userData = {}, isLoading } = useQuery({
        queryKey: ['users', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users-role/${user.email}`);
            return res.data;
        }
    });

    const handleRoleChange = (newRole) => {
        const changeRole = {
            userName: userData?.name,
            userEmail: userData?.email,
            requestType: newRole,
            requestStatus: "pending",
            requestTime: new Date()
        };

        axiosSecure.post('/users-request', changeRole)
            .then(res => {
                if (res.data.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Application Has Been Submitted",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            });
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex justify-center items-center p-6 transition-colors duration-300">
            <title>My Profile</title>

            <div className="bg-white dark:bg-gray-800 w-full max-w-2xl rounded-2xl shadow-lg p-8 transition-colors duration-300">

                {/* Header */}
                <div className="flex flex-col items-center mb-8">
                    <img
                        src={userData?.photoUrl}
                        alt="User"
                        className="w-28 h-28 rounded-full object-cover border-4 border-orange-400 mb-4"
                    />

                    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                        {userData?.name || "User Name"}
                    </h2>

                    <p className="text-gray-500 dark:text-gray-400">
                        {userData?.email || "user@example.com"}
                    </p>
                </div>

                {/* Info Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

                    <div>
                        <p className="text-gray-500 dark:text-gray-400">Address</p>
                        <p className="font-semibold text-gray-800 dark:text-gray-200">
                            {userData?.address}
                        </p>
                    </div>

                    <div>
                        <p className="text-gray-500 dark:text-gray-400">Role</p>
                        <span className="badge badge-outline badge-primary">
                            {userData?.role}
                        </span>
                    </div>

                    <div>
                        <p className="text-gray-500 dark:text-gray-400">Status</p>
                        <span
                            className={`badge ${
                                userData?.status === "active"
                                    ? "badge-success"
                                    : "badge-error"
                            }`}
                        >
                            {userData?.status}
                        </span>
                    </div>

                    {role === 'chef' && (
                        <div>
                            <p className="text-gray-500 dark:text-gray-400">Chef ID</p>
                            <p className="font-semibold text-orange-500">
                                {userData?.chefId}
                            </p>
                        </div>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col md:flex-row justify-center gap-4">

                    {(role !== 'admin' && role !== 'chef') && (
                        <button
                            onClick={() => handleRoleChange('chef')}
                            className="btn w-full md:w-auto flex-1 bg-primary hover:cursor-pointer text-white dark:bg-orange-500 dark:hover:bg-orange-600 border-none"
                        >
                            Be a Chef 👨‍🍳
                        </button>
                    )}

                    {role !== 'admin' && (
                        <button
                            onClick={() => handleRoleChange('admin')}
                            className="btn w-full md:w-auto flex-1 bg-secondary hover:bg-blue-600 text-white dark:bg-blue-500 dark:hover:bg-blue-600 border-none"
                        >
                            Be an Admin 🛡️
                        </button>
                    )}
                </div>

            </div>
        </div>
    );
};

export default MyProfilePage;