import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../hooks/useAuth/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure/useAxiosSecure";
import Loading from "../../../../components/Loading/Loading";
import Swal from "sweetalert2";

const MyFavouriteMeal = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: favouriteMeals = [], isLoading, refetch } = useQuery({
        queryKey: ['favourites', user.email],
        queryFn: async () => {
            const res = axiosSecure.get(`/favourites/${user.email}`);
            return (await res).data;
        }
    });
    console.log(favouriteMeals)
    if (isLoading) {
        return <Loading />
    }
    const handleDelete = (id) => {
        axiosSecure.delete(`favourites/${id}`)
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