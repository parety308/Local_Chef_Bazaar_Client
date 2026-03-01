import { useQuery } from '@tanstack/react-query';
import { FaUserCircle, FaHeart, FaStar, FaShoppingBag } from "react-icons/fa";
import { useNavigate } from 'react-router';
import useAuth from '../../../hooks/useAuth/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure/useAxiosSecure';
import Loading from '../../../components/Loading/Loading';

const UserDashboard = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: reviews = [], isLoading } = useQuery({
        queryKey: ["reviews", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/myreviews/${user.email}`);
            return res.data;
        },
    });

    const { data: favouriteMeals = [] } = useQuery({
        queryKey: ['favourites', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/favourites/${user.email}`);
            return res.data;
        }
    });

    const { data: orders = [] } = useQuery({
        queryKey: ["my-orders"],
        enabled: !!user,
        queryFn: async () => {
            const res = await axiosSecure.get("/my-orders", { withCredentials: true });
            return res.data;
        },
    });

    if (isLoading) return <Loading />;

    return (
        <div className="min-h-screen p-8
            bg-gray-50 text-gray-800
            dark:bg-gray-900 dark:text-gray-100">

            <title>User Dashboard</title>

            {/* Header */}
            <h1 className="text-4xl font-bold mb-10 text-center md:text-left">
                Welcome Back! 👋
            </h1>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">

                {/* Profile */}
                <div
                    onClick={() => navigate('/dashboard/my-profile')}
                    className="cursor-pointer flex items-center gap-4 p-6 rounded-3xl
                    bg-blue-100 hover:bg-blue-200
                    dark:bg-blue-900/40 dark:hover:bg-blue-900/70
                    shadow-md hover:shadow-xl
                    transition-all hover:-translate-y-1"
                >
                    <FaUserCircle className="text-4xl text-blue-500 dark:text-blue-400" />
                    <div>
                        <p className="text-gray-500 dark:text-gray-400">Profile</p>
                        <h2 className="text-xl font-semibold">View Info</h2>
                    </div>
                </div>

                {/* Favorites */}
                <div
                    onClick={() => navigate('/dashboard/my-favorites')}
                    className="cursor-pointer flex items-center gap-4 p-6 rounded-3xl
                    bg-red-100 hover:bg-red-200
                    dark:bg-red-900/40 dark:hover:bg-red-900/70
                    shadow-md hover:shadow-xl
                    transition-all hover:-translate-y-1"
                >
                    <FaHeart className="text-4xl text-red-500 dark:text-red-400" />
                    <div>
                        <p className="text-gray-500 dark:text-gray-400">Favorites</p>
                        <h2 className="text-xl font-semibold">
                            {favouriteMeals.length} Items
                        </h2>
                    </div>
                </div>

                {/* Reviews */}
                <div
                    onClick={() => navigate('/dashboard/my-reviews')}
                    className="cursor-pointer flex items-center gap-4 p-6 rounded-3xl
                    bg-yellow-100 hover:bg-yellow-200
                    dark:bg-yellow-900/40 dark:hover:bg-yellow-900/70
                    shadow-md hover:shadow-xl
                    transition-all hover:-translate-y-1"
                >
                    <FaStar className="text-4xl text-yellow-500 dark:text-yellow-400" />
                    <div>
                        <p className="text-gray-500 dark:text-gray-400">My Reviews</p>
                        <h2 className="text-xl font-semibold">
                            {reviews.length} Reviews
                        </h2>
                    </div>
                </div>

                {/* Orders */}
                <div
                    onClick={() => navigate('/dashboard/my-orders')}
                    className="cursor-pointer flex items-center gap-4 p-6 rounded-3xl
                    bg-green-100 hover:bg-green-200
                    dark:bg-green-900/40 dark:hover:bg-green-900/70
                    shadow-md hover:shadow-xl
                    transition-all hover:-translate-y-1"
                >
                    <FaShoppingBag className="text-4xl text-green-500 dark:text-green-400" />
                    <div>
                        <p className="text-gray-500 dark:text-gray-400">Orders</p>
                        <h2 className="text-xl font-semibold">
                            {orders.length} Orders
                        </h2>
                    </div>
                </div>
            </div>

            {/* Recent Activity */}
            <div className="p-8 rounded-3xl border
                bg-white border-gray-100
                dark:bg-gray-800 dark:border-gray-700
                shadow-lg">

                <h2 className="text-2xl font-semibold mb-6">
                    Recent Activity
                </h2>

                <ul className="space-y-4">
                    <li className="flex items-center gap-2">
                        <span className="text-orange-500 text-xl">🍽️</span>
                        Ordered <strong>Mutton Curry</strong>
                    </li>
                    <li className="flex items-center gap-2">
                        <span className="text-yellow-500 text-xl">⭐</span>
                        Reviewed <strong>Chicken Biryani</strong>
                    </li>
                    <li className="flex items-center gap-2">
                        <span className="text-red-500 text-xl">❤️</span>
                        Added <strong>Beef Kebab</strong> to favorites
                    </li>
                    <li className="flex items-center gap-2">
                        <span className="text-green-500 text-xl">🛒</span>
                        Placed a new order
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default UserDashboard;