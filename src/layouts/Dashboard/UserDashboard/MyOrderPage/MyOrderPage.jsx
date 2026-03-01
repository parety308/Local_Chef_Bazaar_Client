import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../hooks/useAuth/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure/useAxiosSecure";
import Loading from "../../../../components/Loading/Loading";

const MyOrderPage = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Fetch Orders
  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["my-orders"],
    enabled: !!user,
    queryFn: async () => {
      const res = await axiosSecure.get("/my-orders", {
        withCredentials: true,
      });
      return res.data;
    },
  });

  // Payment Handler
  const handlePayment = async (meal) => {
    const paymentInfo = {
      price: meal.price,
      orderId: meal._id,
      mealId: meal.mealId,
      userEmail: user.email,
      mealName: meal.mealName,
    };

    const res = await axiosSecure.post(
      "/create-checkout-session",
      paymentInfo
    );
    window.location.assign(res.data.url);
  };

  if (isLoading) return <Loading />;

  // Action Button Renderer
  const renderActionButton = (meal) => {
    if (meal.orderStatus === "cancelled") {
      return (
        <button
          disabled
          className="btn w-full bg-red-500 text-white cursor-not-allowed"
        >
          Cancelled ❌
        </button>
      );
    }

    if (meal.paymentStatus === "paid") {
      return (
        <button
          disabled
          className="btn w-full bg-secondary text-white cursor-not-allowed"
        >
          Paid ✔
        </button>
      );
    }

    if (meal.orderStatus === "pending") {
      return (
        <button
          disabled
          className="btn w-full bg-yellow-500 text-white cursor-not-allowed"
        >
          Waiting for Acceptance ⏳
        </button>
      );
    }

    if (meal.orderStatus === "accepted") {
      return (
        <button
          onClick={() => handlePayment(meal)}
          className="btn w-full bg-green-500 hover:bg-green-600 text-white"
        >
          Pay Now 💳
        </button>
      );
    }

    return null;
  };

  return (
    <div className="min-h-screen py-10
      bg-gray-100 text-gray-800
      dark:bg-gray-900 dark:text-gray-100">

      <title>Orders - Dashboard</title>

      <div className="w-11/12 md:w-9/12 mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold">
            My Orders 🍽️
          </h1>

          <p className="mt-2 text-gray-500 dark:text-gray-400">
            View your ordered meals and payment status
          </p>
        </div>

        {/* EMPTY STATE */}
        {orders.length === 0 && (
          <div className="
            flex flex-col items-center justify-center py-20
            bg-white dark:bg-gray-800
            shadow-lg rounded-xl
            border border-gray-200 dark:border-gray-700
            mx-5 md:mx-auto max-w-md
          ">
            <div className="bg-red-100 dark:bg-red-900/30 p-5 rounded-full mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-red-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 3h18v18H3V3z M8 12h8M12 8v8"
                />
              </svg>
            </div>

            <h2 className="text-2xl md:text-3xl font-bold text-center">
              No Orders Yet 🛒
            </h2>

            <p className="text-gray-500 dark:text-gray-400 mb-6 text-center max-w-xs">
              You haven’t placed any orders. Explore meals and place your first order!
            </p>

            <button className="
              px-6 py-3 rounded-full text-white font-semibold
              bg-gradient-to-r from-red-400 to-pink-500
              hover:from-pink-500 hover:to-red-400
              shadow-lg transition duration-300
            ">
              Browse Meals 🍽️
            </button>
          </div>
        )}

        {/* ORDERS GRID */}
        {orders.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {orders.map((meal) => (
              <div
                key={meal._id}
                className="
                  rounded-2xl shadow-md p-6
                  bg-white dark:bg-gray-800
                  border border-gray-200 dark:border-gray-700
                  transition hover:shadow-xl
                "
              >
                {/* Meal Name */}
                <h2 className="text-xl font-bold mb-3">
                  {meal.mealName}
                </h2>

                {/* Info */}
                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <p><span className="font-semibold">Price:</span> {meal.price}৳</p>
                  <p><span className="font-semibold">Quantity:</span> {meal.quantity}</p>

                  <p>
                    <span className="font-semibold">Order Status:</span>{" "}
                    <span
                      className={`badge ${
                        meal.orderStatus === "pending"
                          ? "badge-warning"
                          : meal.orderStatus === "accepted"
                          ? "badge-success"
                          : "badge-error"
                      }`}
                    >
                      {meal.orderStatus}
                    </span>
                  </p>

                  <p>
                    <span className="font-semibold">Payment Status:</span>{" "}
                    <span
                      className={`badge ${
                        meal.paymentStatus === "pending"
                          ? "badge-warning"
                          : "badge-success"
                      }`}
                    >
                      {meal.paymentStatus}
                    </span>
                  </p>

                  <p><span className="font-semibold">Delivery Time:</span> 30 mins</p>
                  <p><span className="font-semibold">Chef Name:</span> Chef Rahim</p>
                  <p><span className="font-semibold">Chef ID:</span> CHEF-1023</p>
                </div>

                {/* Action */}
                <div className="mt-5">
                  {renderActionButton(meal)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrderPage;