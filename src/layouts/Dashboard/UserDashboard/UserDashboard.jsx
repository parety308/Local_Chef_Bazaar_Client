import React from 'react';
import { FaUserCircle, FaHeart, FaStar, FaShoppingBag } from "react-icons/fa";
import { useNavigate } from 'react-router';

const UserDashboard = () => {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <title>User Dashboard</title>

            {/* Header */}
            <h1 className="text-4xl font-bold mb-10 text-gray-800 text-center md:text-left">
                Welcome Back! 👋
            </h1>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {/* Profile */}
                <div
                    className="bg-gradient-to-br from-blue-100 to-blue-50 p-6 rounded-3xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all flex items-center gap-4 cursor-pointer"
                    onClick={() => navigate('/dashboard/my-profile')}
                >
                    <FaUserCircle className="text-4xl text-blue-500" />
                    <div>
                        <p className="text-gray-500">Profile</p>
                        <h2 className="text-xl font-semibold text-gray-800">View Info</h2>
                    </div>
                </div>

                {/* Favorites */}
                <div
                    className="bg-gradient-to-br from-red-100 to-red-50 p-6 rounded-3xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all flex items-center gap-4 cursor-pointer"
                    onClick={() => navigate('/dashboard/my-favorites')}
                >
                    <FaHeart className="text-4xl text-red-500" />
                    <div>
                        <p className="text-gray-500">Favorites</p>
                        <h2 className="text-xl font-semibold text-gray-800">12 Items</h2>
                    </div>
                </div>

                {/* Reviews */}
                <div
                    className="bg-gradient-to-br from-yellow-100 to-yellow-50 p-6 rounded-3xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all flex items-center gap-4 cursor-pointer"
                    onClick={() => navigate('/dashboard/my-reviews')}
                >
                    <FaStar className="text-4xl text-yellow-500" />
                    <div>
                        <p className="text-gray-500">My Reviews</p>
                        <h2 className="text-xl font-semibold text-gray-800">5 Reviews</h2>
                    </div>
                </div>

                {/* Orders */}
                <div
                    className="bg-gradient-to-br from-green-100 to-green-50 p-6 rounded-3xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all flex items-center gap-4 cursor-pointer"
                    onClick={() => navigate('/dashboard/my-orders')}
                >
                    <FaShoppingBag className="text-4xl text-green-500" />
                    <div>
                        <p className="text-gray-500">Orders</p>
                        <h2 className="text-xl font-semibold text-gray-800">3 Orders</h2>
                    </div>
                </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
                <h2 className="text-2xl font-semibold mb-6 text-gray-800">Recent Activity</h2>
                <ul className="space-y-4 text-gray-700">
                    <li className="flex items-center gap-2">
                        <span className="text-orange-500 text-xl">🍽️</span> Ordered <strong>Mutton Curry</strong>
                    </li>
                    <li className="flex items-center gap-2">
                        <span className="text-yellow-500 text-xl">⭐</span> Reviewed <strong>Chicken Biryani</strong>
                    </li>
                    <li className="flex items-center gap-2">
                        <span className="text-red-500 text-xl">❤️</span> Added <strong>Beef Kebab</strong> to favorites
                    </li>
                    <li className="flex items-center gap-2">
                        <span className="text-green-500 text-xl">🛒</span> Placed a new order
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default UserDashboard;
