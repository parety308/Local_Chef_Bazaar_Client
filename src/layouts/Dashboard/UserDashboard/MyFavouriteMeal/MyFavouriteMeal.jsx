import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../hooks/useAuth/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure/useAxiosSecure";
import Loading from "../../../../components/Loading/Loading";
import Swal from "sweetalert2";

const MyFavouriteMeal = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: favouriteMeals = [], isLoading, refetch } = useQuery({
        queryKey: ['favourites', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/favourites/${user.email}`);
            return res.data;
        }
    });
    console.log(favouriteMeals)
    if (isLoading) {
        return <Loading />
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


    }
    return (
        <div className='w-10/12 mx-auto my-15'>
            <title>Favourite Meals - Dashboard</title>
            {favouriteMeals.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 bg-white shadow-lg rounded-xl mx-5 md:mx-auto max-w-md">
                    {/* Icon */}
                    <div className="bg-pink-100 p-5 rounded-full mb-6">
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

                    {/* Message */}
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2 text-center">
                        No Favourite Meals Yet ❤️
                    </h2>
                    <p className="text-gray-500 mb-6 text-center max-w-xs md:max-w-sm">
                        You haven’t added any meals to your favourites. Explore meals and start saving your favorites!
                    </p>

                    {/* Call-to-Action Button */}
                    <button className="px-6 py-3 bg-gradient-to-r from-pink-400 to-red-500 hover:from-red-500 hover:to-pink-400 text-white font-semibold rounded-full shadow-lg transition duration-300">
                        Explore Meals 🍽️
                    </button>
                </div>
            )}

            <h1 className="text-3xl my-10">Favourite Meals : {favouriteMeals.length}</h1>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
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
                        {
                            favouriteMeals.map(meal => <tr>
                                <td>

                                    <img
                                        className='w-12 h-12 rounded-full'
                                        src={meal.mealImg}
                                        alt={meal.mealName} />
                                </td>
                                <td><div className="font-bold">{meal.mealName}</div></td>
                                <td><div className="text-sm opacity-50">{meal.chefName}</div></td>
                                <td>{meal.price}</td>
                                <td>{meal.added_date}</td>
                                <td><button onClick={() => handleDelete(meal._id)} className='btn text-red-500'>Delete</button></td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyFavouriteMeal;