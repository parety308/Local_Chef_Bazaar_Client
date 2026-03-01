import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../hooks/useAuth/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure/useAxiosSecure";
import Loading from "../../../../components/Loading/Loading";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const MyFavouriteMeal = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const { data: favouriteMeals = [], isLoading, refetch } = useQuery({
        queryKey: ['favourites', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/favourites/${user.email}`);
            return res.data;
        }
    });

    if (isLoading) {
        return <Loading />;
    }

    const handleDelete = (id) => {
        axiosSecure.delete(`/favourites/${id}`)
            .then(res => {
                if (res.data.deletedCount > 0) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "This Meal Has Been Deleted",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    refetch();
                }
            })
            .catch(error => {
                Swal.fire({
                    icon: "error",
                    title: "Delete Failed!",
                    text: error.response?.data?.message || "Something went wrong",
                });
            });
    };

    return (
        <div className="w-10/12 mx-auto my-15
            text-gray-800 dark:text-gray-200">

            <title>Favourite Meals - Dashboard</title>

            {/* EMPTY STATE */}
            {favouriteMeals.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20
                    bg-white dark:bg-gray-800
                    shadow-lg rounded-xl
                    mx-5 md:mx-auto max-w-md
                    border border-gray-100 dark:border-gray-700">

                    {/* Icon */}
                    <div className="bg-pink-100 dark:bg-pink-900/30 p-5 rounded-full mb-6">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-12 w-12 text-pink-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 21.682l-7.682-7.682a4.5 4.5 0 010-6.364z"
                            />
                        </svg>
                    </div>

                    <h2 className="text-2xl md:text-3xl font-bold text-center">
                        No Favourite Meals Yet ❤️
                    </h2>

                    <p className="text-gray-500 dark:text-gray-400 mb-6 text-center max-w-xs md:max-w-sm">
                        You haven’t added any meals to your favourites. Explore meals and start saving your favorites!
                    </p>

                    <button
                        onClick={() => navigate('/meals')}
                        className="px-6 py-3
                        bg-gradient-to-r from-pink-400 to-red-500
                        hover:from-red-500 hover:to-pink-400
                        text-white font-semibold rounded-full shadow-lg transition duration-300">
                        Explore Meals 🍽️
                    </button>
                </div>
            )}

            {/* TABLE */}
            {favouriteMeals.length > 0 && (
                <>
                    <h1 className="text-3xl my-6 font-semibold">
                        Favourite Meals : {favouriteMeals.length}
                    </h1>

                    <div className="overflow-x-auto
                        bg-white dark:bg-gray-800
                        rounded-xl shadow
                        border border-gray-100 dark:border-gray-700">

                        <table className="table">
                            <thead className="bg-gray-100 dark:bg-gray-700
                                text-gray-700 dark:text-gray-200">
                                <tr>
                                    <th>Meal Image</th>
                                    <th>Meal Name</th>
                                    <th>Chef Name</th>
                                    <th>Price</th>
                                    <th>Date Added</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>

                            <tbody>
                                {favouriteMeals.map(meal => (
                                    <tr
                                        key={meal._id}
                                        className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">

                                        <td>
                                            <img
                                                className="w-12 h-12 rounded-full object-cover"
                                                src={meal.mealImg}
                                                alt={meal.mealName}
                                            />
                                        </td>

                                        <td className="font-bold">
                                            {meal.mealName}
                                        </td>

                                        <td className="text-sm text-gray-500 dark:text-gray-400">
                                            {meal.chefName}
                                        </td>

                                        <td>{meal.price}</td>
                                        <td>{meal.added_date}</td>

                                        <td>
                                            <button
                                                onClick={() => handleDelete(meal._id)}
                                                className="btn btn-ghost text-red-500 hover:bg-red-100 dark:hover:bg-red-900/30">
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>

                        </table>
                    </div>
                </>
            )}
        </div>
    );
};

export default MyFavouriteMeal;