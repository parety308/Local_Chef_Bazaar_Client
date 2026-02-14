import useAuth from "../../../../hooks/useAuth/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../../components/Loading/Loading";
import Swal from "sweetalert2";

const OrderRequest = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const {
        data: orders = [],
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ["orders", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/orders?chefEmail=${user?.email}`);
            return res.data;
        },
    });

    const handleUpdate = async (id, status) => {
        try {
            const res = await axiosSecure.patch(`/orders/${id}`, {
                orderStatus: status,
            });

            if (res.data.modifiedCount) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `Order ${status.toUpperCase()} Successfully`,
                    showConfirmButton: false,
                    timer: 1500,
                });
                refetch();
            }
        } catch (error) {
            console.log(error);
        }
    };

    if (isLoading) return <Loading />;

    return (
        <div className="w-11/12 mx-auto my-10">
            <title>Order Requests</title>

            {orders.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 bg-white shadow-md rounded-xl mx-5 md:mx-auto max-w-md">
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
                                d="M9 17v-2a4 4 0 014-4h3m-7 6h7M3 7h18M5 7v12a2 2 0 002 2h10a2 2 0 002-2V7M5 7l1-4h12l1 4"
                            />
                        </svg>
                    </div>

                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2 text-center">
                        No Order Requests Yet 📭
                    </h2>
                    <p className="text-gray-500 mb-6 text-center max-w-xs md:max-w-sm">
                        You haven't sent any order requests yet. Start exploring meals and request your favorite dishes!
                    </p>

                    <button className="px-6 py-3 bg-linear-to-r from-blue-400 to-indigo-500 hover:from-indigo-500 hover:to-blue-400 text-white font-semibold rounded-full shadow-lg transition duration-300">
                        Explore Meals 🍽️
                    </button>
                </div>
            )}

            {orders.length > 0 && (
            <div>
                <h1 className="text-3xl font-bold mb-6">
                    Ordered Requests : {orders.length}
                </h1>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {orders.map((meal) => {
                    const isCancelled = meal.orderStatus === "cancelled";
                    const isPending = meal.orderStatus === "pending";
                    const isAccepted = meal.orderStatus === "accepted";
                    const isDelivered = meal.orderStatus === "delivered";

                    return (
                        <div
                            key={meal._id}
                            className="bg-white shadow-lg rounded-2xl p-6 border border-gray-200"
                        >
                            {/* Order Info */}
                            <div className="space-y-2">
                                <h2 className="text-xl font-semibold text-gray-800">
                                    🍔 Meal Name : {meal.mealName}
                                </h2>
                                <p className="text-gray-600">
                                    <span className="font-medium">Price:</span> ${meal.price}
                                </p>
                                <p className="text-gray-600">
                                    <span className="font-medium">Quantity:</span> {meal.quantity}
                                </p>
                                <p className="text-gray-600">
                                    <span className="font-medium">Order Status:</span>
                                    <span
                                        className={`ml-2 px-3 py-1 rounded-full text-sm 
                    ${isPending
                                                ? "bg-yellow-100 text-yellow-700"
                                                : isAccepted
                                                    ? "bg-blue-100 text-blue-700"
                                                    : isDelivered
                                                        ? "bg-green-100 text-green-700"
                                                        : "bg-red-100 text-red-700"
                                            }`}
                                    >
                                        {meal.orderStatus}
                                    </span>
                                </p>
                                <p className="text-gray-600">
                                    <span className="font-medium">User Email:</span> {meal.userEmail}
                                </p>
                                <p className="text-gray-600">
                                    <span className="font-medium">Order Time:</span> {meal.orderTime}
                                </p>
                                <p className="text-gray-600">
                                    <span className="font-medium">User Address:</span> {meal.userAddress}
                                </p>
                                <p className="text-gray-600">
                                    <span className="font-medium">Payment Status:</span>
                                    <span
                                        className={`ml-2 px-3 py-1 rounded-full text-sm ${meal.paymentStatus === "paid"
                                            ? "bg-green-100 text-green-700"
                                            : "bg-yellow-100 text-yellow-700"
                                            }`}
                                    >
                                        {meal.paymentStatus}
                                    </span>
                                </p>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex justify-between mt-6 gap-3">
                                {/* Cancel Button - Show only if pending */}
                                {isPending && (
                                    <button
                                        onClick={() => handleUpdate(meal._id, "cancelled")}
                                        className="w-full py-2 rounded-xl font-semibold transition bg-red-500 hover:bg-red-600 text-white"
                                    >
                                        Cancel
                                    </button>
                                )}

                                {/* Accept Button - Show only if pending */}
                                {isPending ? (
                                    <button
                                        onClick={() => handleUpdate(meal._id, "accepted")}
                                        className="w-full py-2 rounded-xl font-semibold transition bg-blue-500 hover:bg-blue-600 text-white"
                                    >
                                        Accept
                                    </button>
                                )
                                    : isAccepted ? (
                                        <button
                                            disabled
                                            className="w-full py-2 rounded-xl font-semibold bg-gray-300 text-gray-600 cursor-not-allowed"
                                        >
                                            Accepted
                                        </button>
                                    )
                                        : (
                                            <button
                                                disabled
                                                className="w-full py-2 rounded-xl font-semibold bg-gray-300 text-gray-600 cursor-not-allowed"
                                            >
                                                Not Accepted Yet
                                            </button>
                                        )}

                                {/* Deliver Button - Show only if accepted and paid */}
                                {isAccepted && meal.paymentStatus === "paid" ? (
                                    <button
                                        onClick={() => handleUpdate(meal._id, "delivered")}
                                        className="w-full py-2 rounded-xl font-semibold transition bg-green-500 hover:bg-green-600 text-white"
                                    >
                                        Deliver
                                    </button>
                                )
                                    : isAccepted && (
                                        <button
                                            disabled
                                            className="w-full py-2 rounded-xl font-semibold bg-gray-300 text-gray-600 cursor-not-allowed"
                                        >
                                            Awaiting Payment
                                        </button>
                                    )
                                }
                            </div>

                            {/* Status Messages */}
                            {isDelivered && (
                                <p className="text-center mt-4 text-green-600 font-bold">
                                    . Delivered Successfully
                                </p>
                            )}
                            {isCancelled && (
                                <p className="text-center mt-4 text-red-600 font-bold">
                                    ❌ Order Cancelled
                                </p>
                            )}
                        </div>
                    );
                    })}
                </div>
            </div>
            )}
        </div>
    );
};

export default OrderRequest;
