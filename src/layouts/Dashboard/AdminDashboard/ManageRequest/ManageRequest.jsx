import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../../hooks/useAxiosSecure/useAxiosSecure';
import Loading from '../../../../components/Loading/Loading';
import Swal from 'sweetalert2';

const ManageRequest = () => {
    const axiosSecure = useAxiosSecure();
    const { data: requests = [], isLoading,refetch } = useQuery({
        queryKey: ['requests'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users-request');
            return res.data;
        }
    });

    const handleAccept = (userEmail,requestType) => {
        axiosSecure.patch(`/users-request/${userEmail}`, { requestStatus: 'approved' ,requestType})
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
                                    <button onClick={() => handleAccept(req.userEmail,req.requestType)} className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded">
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
