import React from "react";
import useAuth from "../../../../hooks/useAuth/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../../components/Loading/Loading";
import Swal from "sweetalert2";

const OrderRequest = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    // ✅ Fetch Orders Only for This Chef
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

    // ✅ Update Order Status Handler
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

                // ✅ Live Update
                refetch();
            }
        } catch (error) {
            console.log(error);
        }
    };

    if (isLoading) return <Loading />;

    return (
        <div className="w-11/12 mx-auto my-10">
            <h1 className="text-3xl font-bold mb-6">
                Ordered Requests : {orders.length}
            </h1>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {orders.map((meal) => {
                    // -----------------------------
                    // ✅ Button Rules Logic
                    // -----------------------------

                    const isCancelled = meal.orderStatus === "cancelled";
                    const isPending = meal.orderStatus === "pending";
                    const isAccepted = meal.orderStatus === "accepted";
                    const isDelivered = meal.orderStatus === "delivered";

                    // Cancel & Accept Enabled Only When Pending
                    const disableCancel = !isPending;
                    const disableAccept = !isPending;

                    // Deliver Enabled Only When Accepted
                    const disableDeliver = !isAccepted;

                    // If Cancelled or Delivered → All Disabled
                    const allDisabled = isCancelled || isDelivered;

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

                                {/* Order Status */}
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
                                    <span className="font-medium">User Email:</span>{" "}
                                    {meal.userEmail}
                                </p>

                                <p className="text-gray-600">
                                    <span className="font-medium">Order Time:</span>{" "}
                                    {meal.orderTime}
                                </p>

                                <p className="text-gray-600">
                                    <span className="font-medium">User Address:</span>{" "}
                                    {meal.userAddress}
                                </p>

                                {/* Payment Status */}
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
                                {/* Cancel Button */}
                                <button
                                    disabled={disableCancel || allDisabled}
                                    onClick={() => handleUpdate(meal._id, "cancelled")}
                                    className={`w-full py-2 rounded-xl font-semibold transition 
                  ${disableCancel || allDisabled
                                            ? "bg-gray-300 cursor-not-allowed"
                                            : "bg-red-500 hover:bg-red-600 text-white"
                                        }`}
                                >
                                    Cancel
                                </button>

                                {/* Accept Button */}
                                <button
                                    disabled={disableAccept || allDisabled}
                                    onClick={() => handleUpdate(meal._id, "accepted")}
                                    className={`w-full py-2 rounded-xl font-semibold transition 
                  ${disableAccept || allDisabled
                                            ? "bg-gray-300 cursor-not-allowed"
                                            : "bg-blue-500 hover:bg-blue-600 text-white"
                                        }`}
                                >
                                    Accept
                                </button>

                                {/* Deliver Button */}
                                <button
                                    disabled={disableDeliver || allDisabled}
                                    onClick={() => handleUpdate(meal._id, "delivered")}
                                    className={`w-full py-2 rounded-xl font-semibold transition 
                  ${disableDeliver || allDisabled
                                            ? "bg-gray-300 cursor-not-allowed"
                                            : "bg-green-500 hover:bg-green-600 text-white"
                                        }`}
                                >
                                    Deliver
                                </button>
                            </div>

                            {/* Extra Text */}
                            {isDelivered && (
                                <p className="text-center mt-4 text-green-600 font-bold">
                                    ✅ Delivered Successfully
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
    );
};

export default OrderRequest;
