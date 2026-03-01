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

    const { register, handleSubmit, reset } = useForm();

    const { data: meals = [], isLoading, refetch } = useQuery({
        queryKey: ['meals', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`my-meals/${user.email}`);
            return res.data;
        }
    });

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

    const handleUpdate = (meal) => {
        setSelectedMeal(meal);
        reset(meal);
        updateModalRef.current.showModal();
    };

    const handleUpdateData = async (data) => {
        try {
            const res = await axiosSecure.patch(`meals/${selectedMeal._id}`, data);

            if (res.data.modifiedCount) {
                Swal.fire("Updated!", "Meal updated successfully.", "success");
                updateModalRef.current.close();
                refetch();
            }
        } catch {
            Swal.fire("Error!", "Failed to update meal.", "error");
        }
    };

    if (isLoading) return <Loading />;

    return (
        <div className="min-h-screen py-10 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
            <title>My Meals</title>

            {/* EMPTY STATE */}
            {meals.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20
                bg-white dark:bg-gray-800
                shadow-md rounded-xl mx-5 md:mx-auto max-w-md">

                    <div className="bg-green-100 dark:bg-green-900/40 p-5 rounded-full mb-6">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-12 w-12 text-green-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h18M12 3v18" />
                        </svg>
                    </div>

                    <h2 className="text-2xl md:text-3xl font-bold text-center">
                        No Meals Found 🍽️
                    </h2>

                    <p className="text-gray-500 dark:text-gray-400 mb-6 text-center max-w-xs md:max-w-sm">
                        You haven’t added any meals yet. Start adding your delicious meals!
                    </p>

                    <button
                        onClick={() => navigate('/dashboard/create-meals')}
                        className="px-6 py-3 bg-gradient-to-r
                        from-green-400 to-teal-500
                        hover:from-teal-500 hover:to-green-400
                        text-white font-semibold rounded-full shadow-lg transition">
                        Add New Meal ➕
                    </button>
                </div>
            )}

            {/* MEALS GRID */}
            {meals.length > 0 && (
                <div className="w-11/12 mx-auto">

                    <h2 className="text-3xl font-bold text-center mb-10">
                        My Meals
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {meals.map(meal => (
                            <div
                                key={meal._id}
                                className="bg-white dark:bg-gray-800
                                rounded-2xl shadow-lg overflow-hidden
                                border border-gray-100 dark:border-gray-700"
                            >
                                <img
                                    src={meal.foodImg}
                                    alt={meal.foodName}
                                    className="w-full h-56 object-cover"
                                />

                                <div className="p-6 space-y-2">

                                    <div className="flex justify-between">
                                        <h3 className="text-xl font-bold">
                                            {meal.foodName}
                                        </h3>
                                        <span className="font-semibold text-green-600 dark:text-green-400">
                                            ${meal.price}
                                        </span>
                                    </div>

                                    <p className="text-yellow-500">⭐ {meal.rating}</p>

                                    <p className="text-sm text-gray-600 dark:text-gray-300">
                                        <b>Ingredients:</b> {meal.ingredients}
                                    </p>

                                    <p className="text-sm text-gray-600 dark:text-gray-300">
                                        <b>Delivery:</b> {meal.estimatedDeliveryTime} mins
                                    </p>

                                    <div className="border-t border-gray-200 dark:border-gray-700 pt-2 text-sm">
                                        <p><b>Chef:</b> {meal.chefName}</p>
                                        <p><b>Chef ID:</b> {meal.chefId}</p>
                                    </div>

                                    <div className="flex gap-2 pt-3">
                                        <button
                                            onClick={() => handleDelete(meal._id)}
                                            className="btn btn-sm btn-outline btn-error flex-1">
                                            Delete
                                        </button>

                                        <button
                                            onClick={() => handleUpdate(meal)}
                                            className="btn btn-sm btn-outline btn-primary flex-1">
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
                    <div className="modal-box bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200">

                        <h3 className="font-bold text-xl mb-4">
                            Update Meal
                        </h3>

                        <form onSubmit={handleSubmit(handleUpdateData)} className="space-y-3">

                            <input
                                {...register("mealName", { required: true })}
                                className="input input-bordered w-full
                                bg-white dark:bg-gray-900"
                                placeholder="Meal Name"
                            />

                            <input
                                type="number"
                                {...register("price", { required: true })}
                                className="input input-bordered w-full
                                bg-white dark:bg-gray-900"
                                placeholder="Price"
                            />

                            <input
                                type="number"
                                step="0.1"
                                {...register("rating")}
                                className="input input-bordered w-full
                                bg-white dark:bg-gray-900"
                                placeholder="Rating"
                            />

                            <textarea
                                {...register("ingredients")}
                                className="textarea textarea-bordered w-full
                                bg-white dark:bg-gray-900"
                                placeholder="Ingredients"
                            />

                            <input
                                type="number"
                                {...register("estimatedDeliveryTime")}
                                className="input input-bordered w-full
                                bg-white dark:bg-gray-900"
                                placeholder="Delivery Time"
                            />

                            <div className="modal-action">
                                <button type="submit" className="btn btn-primary">
                                    Update
                                </button>

                                <button
                                    type="button"
                                    className="btn"
                                    onClick={() => updateModalRef.current.close()}>
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