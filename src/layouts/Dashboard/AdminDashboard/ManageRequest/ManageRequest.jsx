import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../../hooks/useAxiosSecure/useAxiosSecure';
import Loading from '../../../../components/Loading/Loading';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';

const ManageRequest = () => {
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const { data: requests = [], isLoading, refetch } = useQuery({
        queryKey: ['requests'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users-request');
            return res.data;
        }
    });

    const handleRequest = (userEmail, requestType, status) => {
        axiosSecure.patch(`/users-request/${userEmail}`, {
            requestStatus: status,
            requestType
        })
            .then(res => {
                const modifiedCount = res.data.result?.modifiedCount || 0;

                if (modifiedCount > 0) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `Request ${status === 'approved' ? 'Approved' : 'Rejected'}`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                    refetch();
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: res.data.message || 'Request not updated!'
                    });
                }
            })
            .catch(() => {
                Swal.fire({
                    icon: 'error',
                    title: 'Server Error',
                    text: 'Something went wrong! Try again later.'
                });
            });
    };

    if (isLoading) return <Loading />;

    return (
        <div className="p-6 min-h-screen
            bg-gray-50 text-gray-800
            dark:bg-gray-900 dark:text-gray-200">

            <title>Manage Requests</title>

            {requests.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20
                    bg-white dark:bg-gray-800
                    shadow-lg rounded-xl mx-5 md:mx-auto max-w-md
                    border border-gray-200 dark:border-gray-700">

                    <div className="bg-blue-100 dark:bg-blue-900/40 p-5 rounded-full mb-6">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-12 w-12 text-blue-500 dark:text-blue-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                    </div>

                    <h2 className="text-2xl md:text-3xl font-bold mb-2 text-center">
                        No Requests Found 📭
                    </h2>

                    <p className="text-gray-500 dark:text-gray-400 mb-6 text-center max-w-sm">
                        There are currently no user requests to manage.
                    </p>

                    <button
                        onClick={() => navigate('/dashboard')}
                        className="px-6 py-3
                        bg-gradient-to-r from-blue-400 to-indigo-500
                        hover:from-indigo-500 hover:to-blue-400
                        text-white font-semibold rounded-full
                        shadow-lg transition duration-300"
                    >
                        Dashboard ✉️
                    </button>
                </div>
            ) : (
                <>
                    <h1 className="text-3xl font-bold mb-6">
                        Manage Requests
                    </h1>

                    <div className="overflow-x-auto rounded-lg border
                        border-gray-200 dark:border-gray-700">

                        <table className="min-w-full
                            bg-white dark:bg-gray-800">

                            {/* TABLE HEADER */}
                            <thead className="bg-gray-100 dark:bg-gray-700">
                                <tr>
                                    <th className="py-3 px-6 border-b dark:border-gray-600">User Name</th>
                                    <th className="py-3 px-6 border-b dark:border-gray-600">User Email</th>
                                    <th className="py-3 px-6 border-b dark:border-gray-600">Request Type</th>
                                    <th className="py-3 px-6 border-b dark:border-gray-600">Status</th>
                                    <th className="py-3 px-6 border-b dark:border-gray-600">Request Time</th>
                                    <th className="py-3 px-6 border-b dark:border-gray-600">Action</th>
                                </tr>
                            </thead>

                            {/* TABLE BODY */}
                            <tbody>
                                {requests.map((req) => (
                                    <tr
                                        key={req._id}
                                        className="hover:bg-gray-50
                                        dark:hover:bg-gray-700/60 transition"
                                    >
                                        <td className="py-4 px-6 text-center border-b dark:border-gray-700">
                                            {req.userName}
                                        </td>

                                        <td className="py-4 px-6 text-center border-b dark:border-gray-700">
                                            {req.userEmail}
                                        </td>

                                        <td className="py-4 px-6 text-center border-b dark:border-gray-700 capitalize">
                                            {req.requestType}
                                        </td>

                                        <td className="py-4 px-6 text-center border-b dark:border-gray-700 capitalize font-semibold">
                                            {req.requestStatus === 'pending' &&
                                                <span className="text-yellow-500">pending</span>}
                                            {req.requestStatus === 'approved' &&
                                                <span className="text-green-500">approved</span>}
                                            {req.requestStatus === 'rejected' &&
                                                <span className="text-red-500">rejected</span>}
                                        </td>

                                        <td className="py-4 px-6 text-center border-b dark:border-gray-700">
                                            {req.requestTime}
                                        </td>

                                        <td className="py-4 px-6 border-b dark:border-gray-700 text-center flex justify-center gap-2">
                                            <button
                                                onClick={() =>
                                                    handleRequest(req.userEmail, req.requestType, 'approved')
                                                }
                                                className="bg-green-500 hover:bg-green-600
                                                text-white px-4 py-1 rounded transition"
                                            >
                                                Accept
                                            </button>

                                            <button
                                                onClick={() =>
                                                    handleRequest(req.userEmail, req.requestType, 'rejected')
                                                }
                                                className="bg-red-500 hover:bg-red-600
                                                text-white px-4 py-1 rounded transition"
                                            >
                                                Reject
                                            </button>
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

export default ManageRequest;