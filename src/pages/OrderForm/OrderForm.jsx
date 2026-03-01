import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";
import Loading from "../../components/Loading/Loading";

const OrderForm = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { data: meal, isLoading } = useQuery({
    queryKey: ["meals", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/meals/${id}`);
      return res.data;
    },
  });

  const { _id, foodName, price, chefId } = meal || {};

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const quantity = watch("quantity") || 1;
  const totalPrice = price * quantity;

  const onSubmit = (data) => {
    const orderData = {
      mealId: _id,
      mealName: foodName,
      price: totalPrice,
      quantity: data.quantity,
      chefId,
      paymentStatus: "pending",
      userEmail: user.email,
      userAddress: data.userAddress,
      orderStatus: "pending",
      orderTime: new Date(),
    };

    Swal.fire({
      title: "Are you sure to Order?",
      text: `You pay ৳${orderData.price} for ${orderData.mealName}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Order it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.post("/orders", orderData).then((res) => {
          if (res.data.insertedId) {
            navigate("/dashboard/my-orders");
            Swal.fire({
              title: "Success!",
              text: "Your order has been placed.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  if (isLoading) return <Loading />;

  /* ===== FRAUD BLOCK ===== */
  if (user.status === "fraud") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center
        bg-red-50 dark:bg-red-900/20
        p-10 rounded-xl shadow-xl">

        <h2 className="text-3xl font-bold text-red-600 dark:text-red-400 mb-4">
          🚫 Access Denied
        </h2>

        <p className="text-lg text-red-500 dark:text-red-300 mb-6">
          Your account has been marked as <strong>fraud</strong>.
          <br /> You cannot place orders.
        </p>

        <p className="text-gray-700 dark:text-gray-300">
          Please contact support if this is a mistake.
        </p>
      </div>
    );
  }

  return (
    <div
      className="
      min-h-screen
      bg-gradient-to-b
      from-orange-50 to-white
      dark:from-gray-900 dark:to-gray-950
      flex justify-center items-start
      py-10 px-4
    "
    >
      <title>Order Form</title>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="
        w-full max-w-lg
        bg-white dark:bg-gray-900
        shadow-2xl
        rounded-3xl
        p-8 space-y-6
        border border-gray-100 dark:border-gray-700
      "
      >
        {/* TITLE */}
        <h1 className="text-3xl font-bold text-orange-600 dark:text-orange-400 text-center">
          Order Your Meal
        </h1>

        <p className="text-gray-500 dark:text-gray-400 text-center">
          Confirm your order details below and enjoy your meal!
        </p>

        {/* MEAL NAME */}
        <div className="space-y-1">
          <label className="font-semibold text-gray-700 dark:text-gray-300">
            Meal Name
          </label>

          <input
            type="text"
            value={foodName}
            readOnly
            className="
              input input-bordered w-full
              bg-gray-50 dark:bg-gray-800
              border-gray-200 dark:border-gray-600
              text-gray-800 dark:text-gray-200
              rounded-xl
            "
          />
        </div>

        {/* PRICE */}
        <div className="space-y-1">
          <label className="font-semibold text-gray-700 dark:text-gray-300">
            Price (per unit)
          </label>

          <input
            type="text"
            value={`৳ ${price}`}
            readOnly
            className="
              input input-bordered w-full
              bg-gray-50 dark:bg-gray-800
              border-gray-200 dark:border-gray-600
              text-gray-800 dark:text-gray-200
              rounded-xl
            "
          />
        </div>

        {/* QUANTITY */}
        <div className="space-y-1">
          <label className="font-semibold text-gray-700 dark:text-gray-300">
            Quantity
          </label>

          <input
            type="number"
            min="1"
            defaultValue={1}
            {...register("quantity", { required: true, min: 1 })}
            className="
              input input-bordered w-full rounded-xl
              bg-white dark:bg-gray-800
              border-gray-300 dark:border-gray-600
              text-gray-800 dark:text-gray-200
              focus:ring-2 focus:ring-orange-400
            "
          />

          {errors.quantity && (
            <p className="text-red-500 text-sm">Quantity is required</p>
          )}
        </div>

        {/* EMAIL */}
        <div className="space-y-1">
          <label className="font-semibold text-gray-700 dark:text-gray-300">
            Email
          </label>

          <input
            type="email"
            value={user?.email}
            readOnly
            className="
              input input-bordered w-full
              bg-gray-50 dark:bg-gray-800
              border-gray-200 dark:border-gray-600
              text-gray-800 dark:text-gray-200
              rounded-xl
            "
          />
        </div>

        {/* ADDRESS */}
        <div className="space-y-1">
          <label className="font-semibold text-gray-700 dark:text-gray-300">
            Delivery Address
          </label>

          <textarea
            {...register("userAddress", { required: true })}
            placeholder="Enter your delivery address"
            className="
              textarea textarea-bordered w-full rounded-xl
              bg-white dark:bg-gray-800
              border-gray-300 dark:border-gray-600
              text-gray-800 dark:text-gray-200
              focus:ring-2 focus:ring-orange-400
            "
          />

          {errors.userAddress && (
            <p className="text-red-500 text-sm">Address is required</p>
          )}
        </div>

        {/* TOTAL */}
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-300 font-medium">
            Total:
            <span className="text-orange-500 dark:text-orange-400 font-bold ml-1">
              ৳ {totalPrice}
            </span>
          </p>
        </div>

        {/* BUTTON */}
        <button
          type="submit"
          className="
            w-full
            bg-gradient-to-r from-orange-500 to-red-500
            hover:from-orange-600 hover:to-red-600
            text-white
            py-3
            rounded-2xl
            font-semibold
            transition-transform
            hover:scale-105
            shadow-lg
          "
        >
          Confirm Order 🍽️
        </button>
      </form>
    </div>
  );
};

export default OrderForm;