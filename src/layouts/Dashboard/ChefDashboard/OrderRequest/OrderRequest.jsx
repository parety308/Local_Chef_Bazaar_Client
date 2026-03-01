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
        <div className="w-11/12 mx-auto my-10 min-h-screen
      bg-gray-100 text-gray-800
      dark:bg-gray-900 dark:text-gray-200 transition-colors duration-300">

            <title>Order Requests</title>

            {/* EMPTY STATE */}
            {orders.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20
          bg-white dark:bg-gray-800
          shadow-md rounded-xl mx-5 md:mx-auto max-w-md">

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
                                d="M9 17v-2a4 4 0 014-4h3m-7 6h7M3 7h18M5 7v12a2 2 0 002 2h10a2 2 0 002-2V7M5 7l1-4h12l1 4"
                            />
                        </svg>
                    </div>

                    <h2 className="text-2xl md:text-3xl font-bold mb-2 text-center">
                        No Order Requests Yet 📭
                    </h2>

                    <p className="text-gray-500 dark:text-gray-400 mb-6 text-center max-w-xs md:max-w-sm">
                        You haven't sent any order requests yet. Start exploring meals and request your favorite dishes!
                    </p>

                    <button className="px-6 py-3
            bg-gradient-to-r from-blue-400 to-indigo-500
            hover:from-indigo-500 hover:to-blue-400
            text-white font-semibold rounded-full shadow-lg transition duration-300">
                        Explore Meals 🍽️
                    </button>
                </div>
            )}

            {/* ORDER LIST */}
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
                                    className="bg-white dark:bg-gray-800
                    shadow-lg rounded-2xl p-6
                    border border-gray-200 dark:border-gray-700
                    transition-colors duration-300"
                                >
                                    {/* INFO */}
                                    <div className="space-y-2">
                                        <h2 className="text-xl font-semibold">
                                            🍔 Meal Name : {meal.mealName}
                                        </h2>

                                        <p className="text-gray-600 dark:text-gray-400">
                                            <span className="font-medium">Price:</span> ${meal.price}
                                        </p>

                                        <p className="text-gray-600 dark:text-gray-400">
                                            <span className="font-medium">Quantity:</span> {meal.quantity}
                                        </p>

                                        {/* ORDER STATUS */}
                                        <p className="text-gray-600 dark:text-gray-400">
                                            <span className="font-medium">Order Status:</span>
                                            <span
                                                className={`ml-2 px-3 py-1 rounded-full text-sm
                        ${isPending
                                                        ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300"
                                                        : isAccepted
                                                            ? "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300"
                                                            : isDelivered
                                                                ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300"
                                                                : "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300"
                                                    }`}
                                            >
                                                {meal.orderStatus}
                                            </span>
                                        </p>

                                        <p className="text-gray-600 dark:text-gray-400">
                                            <span className="font-medium">User Email:</span> {meal.userEmail}
                                        </p>

                                        <p className="text-gray-600 dark:text-gray-400">
                                            <span className="font-medium">Order Time:</span> {meal.orderTime}
                                        </p>

                                        <p className="text-gray-600 dark:text-gray-400">
                                            <span className="font-medium">User Address:</span> {meal.userAddress}
                                        </p>

                                        {/* PAYMENT STATUS */}
                                        <p className="text-gray-600 dark:text-gray-400">
                                            <span className="font-medium">Payment Status:</span>
                                            <span
                                                className={`ml-2 px-3 py-1 rounded-full text-sm
                        ${meal.paymentStatus === "paid"
                                                        ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300"
                                                        : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300"
                                                    }`}
                                            >
                                                {meal.paymentStatus}
                                            </span>
                                        </p>
                                    </div>

                                    {/* ACTION BUTTONS */}
                                    <div className="flex justify-between mt-6 gap-3">
                                        {isPending && (
                                            <button
                                                onClick={() => handleUpdate(meal._id, "cancelled")}
                                                className="w-full py-2 rounded-xl font-semibold
                          bg-red-500 hover:bg-red-600 text-white">
                                                Cancel
                                            </button>
                                        )}

                                        {isPending ? (
                                            <button
                                                onClick={() => handleUpdate(meal._id, "accepted")}
                                                className="w-full py-2 rounded-xl font-semibold
                          bg-blue-500 hover:bg-blue-600 text-white">
                                                Accept
                                            </button>
                                        ) : (
                                            <button
                                                disabled
                                                className="w-full py-2 rounded-xl font-semibold
                          bg-gray-300 dark:bg-gray-700
                          text-gray-600 dark:text-gray-400 cursor-not-allowed">
                                                {isAccepted ? "Accepted" : "Not Accepted Yet"}
                                            </button>
                                        )}

                                        {isAccepted && meal.paymentStatus === "paid" ? (
                                            <button
                                                onClick={() => handleUpdate(meal._id, "delivered")}
                                                className="w-full py-2 rounded-xl font-semibold
                          bg-green-500 hover:bg-green-600 text-white">
                                                Deliver
                                            </button>
                                        ) : (
                                            isAccepted && (
                                                <button
                                                    disabled
                                                    className="w-full py-2 rounded-xl font-semibold
                            bg-gray-300 dark:bg-gray-700
                            text-gray-600 dark:text-gray-400 cursor-not-allowed">
                                                    Awaiting Payment
                                                </button>
                                            )
                                        )}
                                    </div>

                                    {/* STATUS MESSAGE */}
                                    {isDelivered && (
                                        <p className="text-center mt-4 font-bold text-green-600 dark:text-green-400">
                                            ✅ Delivered Successfully
                                        </p>
                                    )}

                                    {isCancelled && (
                                        <p className="text-center mt-4 font-bold text-red-600 dark:text-red-400">
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
