import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";

const OrderForm = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const { data: meal, isLoading, refetch } = useQuery({
        queryKey: ['meals', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/meals/${id}`);
            return res.data;
        }
    });
    const {
        _id,
        foodName,
        price,
        chefId
    } = meal || {};
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const onSubmit = (data) => {
        const orderData = {
            mealId: _id,
            mealName: foodName,
            price: price * data.quantity,
            quantity: data.quantity,
            chefId,
            paymentStatus: "Pending",
            userEmail: user.email,
            userAddress: data.userAddress,
            orderStatus: "pending",
            orderTime: new Date()

        };
        Swal.fire({
            title: "Are you sure to Order?",
            text: `you pay ${orderData.price} for ${orderData.mealName}`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.post('/orders', orderData)
                    .then(res => {
                        if (res.data.insertedId) {
                            Swal.fire({
                                title: "Taken!",
                                text: "Your Order Has Been Taken.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white p-6 rounded-xl shadow-lg space-y-4"
        >

            {/* Meal Name */}
            <div>
                <label className="label">Meal Name</label>
                <input
                    type="text"
                    value={foodName}
                    readOnly
                    className="input input-bordered w-full"
                />
            </div>

            {/* Price */}
            <div>
                <label className="label">Price</label>
                <input
                    type="text"
                    value={`৳ ${price}`}
                    readOnly
                    className="input input-bordered w-full"
                />
            </div>

            {/* Quantity */}
            <div>
                <label className="label">Quantity</label>
                <input
                    type="number"
                    min="1"
                    defaultValue={1}
                    {...register("quantity", { required: true, min: 1 })}
                    className="input input-bordered w-full"
                />
                {errors.quantity && (
                    <p className="text-red-500 text-sm">Quantity is required</p>
                )}
            </div>

            {/* User Email */}
            <div>
                <label className="label">Email</label>
                <input
                    type="email"
                    value={user?.email}
                    readOnly
                    className="input input-bordered w-full"
                />
            </div>

            {/* Address */}
            <div>
                <label className="label">Delivery Address</label>
                <textarea
                    {...register("userAddress", { required: true })}
                    className="textarea textarea-bordered w-full"
                    placeholder="Enter your delivery address"
                />
                {errors.userAddress && (
                    <p className="text-red-500 text-sm">Address is required</p>
                )}
            </div>

            {/* Confirm Button */}
            <button
                type="submit"
                className="btn w-full bg-orange-500 hover:bg-orange-600 text-white"
            >
                Confirm Order ✅
            </button>
        </form>
    );
};

export default OrderForm;
