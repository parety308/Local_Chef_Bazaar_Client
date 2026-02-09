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

    const handleAccept = (userEmail, requestType) => {
        axiosSecure.patch(`/users-request/${userEmail}`, { requestStatus: 'approved', requestType })
            .then(res => {
                if (res.data.result.modifiedCount > 0) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Request Approved",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    refetch();
                }
            });
    };

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div className="p-6">
            <title>Manage Requests</title>

            {requests.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 bg-white shadow-lg rounded-xl mx-5 md:mx-auto max-w-md">
                    {/* Icon */}
                    <div className="bg-blue-100 p-5 rounded-full mb-6">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-12 w-12 text-blue-500"
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

                    {/* Message */}
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2 text-center">
                        No Requests Found 📭
                    </h2>
                    <p className="text-gray-500 mb-6 text-center max-w-xs md:max-w-sm">
                        There are currently no user requests to manage. Check back later or invite users to submit requests.
                    </p>

                    {/* Optional Call-to-Action Button */}
                    <button onClick={() => navigate('/dashboard')} className="px-6 py-3 bg-gradient-to-r from-blue-400 to-indigo-500 hover:from-indigo-500 hover:to-blue-400 text-white font-semibold rounded-full shadow-lg transition duration-300">
                        Dashboard ✉️
                    </button>
                </div>
            )}

            <h1 className="text-3xl font-bold mb-6">Manage Requests</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="py-3 px-6 text-center border-b">User Name</th>
                            <th className="py-3 px-6 text-center border-b">User Email</th>
                            <th className="py-3 px-6 text-center border-b">Request Type</th>
                            <th className="py-3 px-6 text-center border-b">Request Status</th>
                            <th className="py-3 px-6 text-center border-b">Request Time</th>
                            <th className="py-3 px-6 text-center border-b">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.map((req) => (
                            <tr key={req._id} className="hover:bg-gray-50">
                                <td className="py-4 text-center px-6 border-b">{req.userName}</td>
                                <td className="py-4 text-center px-6 border-b">{req.userEmail}</td>
                                <td className="py-4 text-center px-6 border-b capitalize">{req.requestType}</td>
                                <td className="py-4 text-center px-6 border-b capitalize">
                                    {req.requestStatus === 'pending' && <span className="text-yellow-500 font-semibold">{req.requestStatus}</span>}
                                    {req.requestStatus === 'approved' && <span className="text-green-500 font-semibold">{req.requestStatus}</span>}
                                    {req.requestStatus === 'rejected' && <span className="text-red-500 font-semibold">{req.requestStatus}</span>}
                                </td>
                                <td className="py-4 text-center px-6 border-b">{req.requestTime}</td>
                                <td className="py-4  px-6 border-b text-center flex justify-center gap-2">
                                    <button onClick={() => handleAccept(req.userEmail, req.requestType)} className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded">
                                        Accept
                                    </button>
                                    <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded">
                                        Reject
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageRequest;
