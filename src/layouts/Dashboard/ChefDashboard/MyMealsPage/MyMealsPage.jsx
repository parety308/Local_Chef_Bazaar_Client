import { useRef, useState } from 'react';
import { useForm } from "react-hook-form";
import useAuth from '../../../../hooks/useAuth/useAuth';
import useAxiosSecure from '../../../../hooks/useAxiosSecure/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../../components/Loading/Loading';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';

const MyMealsPage = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const updateModalRef = useRef(null);
    const [selectedMeal, setSelectedMeal] = useState(null);

    // react hook form
    const { register, handleSubmit, reset } = useForm();

    // GET DATA
    const { data: meals = [], isLoading, refetch } = useQuery({
        queryKey: ['meals', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`my-meals/${user.email}`);
            return res.data;
        }
    });

    // DELETE
    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`meals/${id}`).then(res => {
                    if (res.data.deletedCount) {
                        Swal.fire("Deleted!", "Meal has been deleted.", "success");
                        refetch();
                    }
                });
            }
        });
    };

    // OPEN UPDATE MODAL
    const handleUpdate = (meal) => {
        setSelectedMeal(meal);
        reset(meal); // set default values automatically
        updateModalRef.current.showModal();
    };

    // UPDATE SUBMIT
    const handleUpdateData = async (data) => {
        try {
            const res = await axiosSecure.patch(`meals/${selectedMeal._id}`, data);

            if (res.data.modifiedCount) {
                Swal.fire("Updated!", "Meal updated successfully.", "success");
                updateModalRef.current.close();
                refetch();
            }
        } catch (error) {
            Swal.fire("Error!", "Failed to update meal.", "error");
        }
    };

    if (isLoading) return <Loading />;

    return (
        <div className="min-h-screen py-10">
            <title>My Meals</title>
            {meals.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 bg-white shadow-md rounded-xl mx-5 md:mx-auto max-w-md">
                    {/* Icon */}
                    <div className="bg-green-100 p-5 rounded-full mb-6">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-12 w-12 text-green-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3 12h18M12 3v18"
                            />
                        </svg>
                    </div>

                    {/* Message */}
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2 text-center">
                        No Meals Found 🍽️
                    </h2>
                    <p className="text-gray-500 mb-6 text-center max-w-xs md:max-w-sm">
                        You haven’t added any meals yet. Start adding your delicious meals to share with everyone!
                    </p>

                    {/* Call-to-Action Button */}
                    <button onClick={() => navigate('/dashboard/create-meals')} className="px-6 py-3 bg-gradient-to-r from-green-400 to-teal-500 hover:from-teal-500 hover:to-green-400 text-white font-semibold rounded-full shadow-lg transition duration-300">
                        Add New Meal ➕
                    </button>
                </div>
            )}

            {meals.length > 0 && (
                <div className="w-11/12 mx-auto">

                    <h2 className="text-3xl font-bold text-center mb-10">
                        My Meals
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {meals.map(meal => (
                            <div key={meal._id} className="bg-white rounded-2xl shadow-lg overflow-hidden">

                                <img
                                    src={meal.mealImg}
                                    alt={meal.mealName}
                                    className="w-full h-56 object-cover"
                                />

                                <div className="p-6 space-y-2">
                                    <div className="flex justify-between">
                                        <h3 className="text-xl font-bold">
                                            {meal.mealName}
                                        </h3>
                                        <span className="font-semibold">
                                            ${meal.price}
                                        </span>
                                    </div>

                                    <p>⭐ {meal.rating}</p>

                                    <p className="text-sm">
                                        <b>Ingredients:</b> {meal.ingredients}
                                    </p>

                                    <p className="text-sm">
                                        <b>Delivery:</b> {meal.estimatedDeliveryTime} mins
                                    </p>

                                    <div className="border-t pt-2 text-sm">
                                        <p><b>Chef:</b> {meal.chefName}</p>
                                        <p><b>Chef ID:</b> {meal.chefId}</p>
                                    </div>

                                    <div className="flex gap-2 pt-3">
                                        <button
                                            onClick={() => handleDelete(meal._id)}
                                            className="btn btn-sm btn-outline btn-error flex-1"
                                        >
                                            Delete
                                        </button>

                                        <button
                                            onClick={() => handleUpdate(meal)}
                                            className="btn btn-sm btn-outline btn-primary flex-1"
                                        >
                                            Update
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* UPDATE MODAL */}
            <dialog ref={updateModalRef} className="modal modal-bottom sm:modal-middle">
                {selectedMeal && (
                    <div className="modal-box">
                        <h3 className="font-bold text-xl mb-4">
                            Update Meal
                        </h3>

                        <form onSubmit={handleSubmit(handleUpdateData)} className="space-y-3">

                            <input
                                {...register("mealName", { required: true })}
                                className="input input-bordered w-full"
                                placeholder="Meal Name"
                            />

                            <input
                                type="number"
                                {...register("price", { required: true })}
                                className="input input-bordered w-full"
                                placeholder="Price"
                            />

                            <input
                                type="number"
                                step="0.1"
                                {...register("rating")}
                                className="input input-bordered w-full"
                                placeholder="Rating"
                            />

                            <textarea
                                {...register("ingredients")}
                                className="textarea textarea-bordered w-full"
                                placeholder="Ingredients"
                            />

                            <input
                                type="number"
                                {...register("estimatedDeliveryTime")}
                                className="input input-bordered w-full"
                                placeholder="Delivery Time"
                            />

                            <div className="modal-action">
                                <button type="submit" className="btn btn-primary">
                                    Update
                                </button>

                                <button
                                    type="button"
                                    className="btn"
                                    onClick={() => updateModalRef.current.close()}
                                >
                                    Cancel
                                </button>
                            </div>

                        </form>
                    </div>
                )}
            </dialog>
        </div>
    );
};

export default MyMealsPage;
