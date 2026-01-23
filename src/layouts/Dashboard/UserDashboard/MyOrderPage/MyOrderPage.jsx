import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../hooks/useAuth/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure/useAxiosSecure";
import Loading from "../../../../components/Loading/Loading";

const MyOrderPage = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: orders = [], isLoading } = useQuery({
        queryKey: ['orders', user?.email],
        queryFn: async () => {
            const res = axiosSecure.get(`/orders/${user.email}`);
            return (await res).data;
        }
    });
    if (isLoading) {
        return <Loading />
    }
    return (
        <div className="min-h-screen bg-gray-100 py-10">
            <div className="w-11/12 md:w-9/12 mx-auto">

                {/* Page Header */}
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold text-gray-800">
                        My Orders 🍽️
                    </h1>
                    <p className="text-gray-500 mt-2">
                        View your ordered meals and payment status
                    </p>
                </div>

                {/* Orders Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                    {/* Order Card */}
                    {
                        orders.map(meal => {
                            return (<div className="bg-white rounded-2xl shadow-md p-6 border border-gray-200">
                                <h2 className="text-xl font-bold text-gray-800 mb-3">
                                    {meal.malName}
                                </h2>
                                <div className="space-y-2 text-sm text-gray-600">
                                    <p><span className="font-semibold">Price:</span> {meal.price} </p>
                                    <p><span className="font-semibold">Quantity:</span> {meal.quantity}</p>
                                    <p>
                                        <span className="font-semibold">Order Status : </span>
                                        {meal.orderStatus === 'pending' ? <span className="badge badge-warning"> {meal.orderStatus}</span> :
                                            <span className="badge badge-success"> {meal.orderStatus}</span>}
                                    </p>
                                    <p>
                                        <span className="font-semibold">Payment Status : </span>
                                        {meal.paymentStatus === 'pending' ? <span className="badge badge-warning">{meal.paymentStatus}</span> :
                                            <span className="badge badge-success"> {meal.paymentStatus}</span>}
                                    </p>
                                    <p><span className="font-semibold">Delivery Time : </span> 30 mins</p>
                                    <p><span className="font-semibold">Chef Name:</span> Chef Rahim</p>
                                    <p><span className="font-semibold">Chef ID:</span> CHEF-1023</p>
                                </div>
                                {/* Pay Button (UI Only) */}
                                <button
                                    className="btn w-full mt-5 bg-green-500 hover:bg-green-600 text-white"
                                >
                                    Pay Now 💳
                                </button>
                            </div>)
                        })
                    }

                </div>
            </div>
        </div>
    );
};

export default MyOrderPage;
