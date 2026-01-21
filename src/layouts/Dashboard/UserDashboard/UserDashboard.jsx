import React from 'react';
import { FaUserCircle, FaHeart, FaStar, FaShoppingBag } from "react-icons/fa";

const UserDashboard = () => {
    return (
        <div className="min-h-screen bg-gray-100 p-6">
            {/* Header */}
            <h1 className="text-4xl font-bold mb-8 text-gray-800">
                User Dashboard 👋
            </h1>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                <div className="bg-white p-6 rounded-2xl shadow-md flex items-center gap-4">
                    <FaUserCircle className="text-4xl text-blue-500" />
                    <div>
                        <p className="text-gray-500">Profile</p>
                        <h2 className="text-xl font-semibold">View Info</h2>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-md flex items-center gap-4">
                    <FaHeart className="text-4xl text-red-500" />
                    <div>
                        <p className="text-gray-500">Favorites</p>
                        <h2 className="text-xl font-semibold">12 Items</h2>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-md flex items-center gap-4">
                    <FaStar className="text-4xl text-yellow-500" />
                    <div>
                        <p className="text-gray-500">My Reviews</p>
                        <h2 className="text-xl font-semibold">5 Reviews</h2>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-md flex items-center gap-4">
                    <FaShoppingBag className="text-4xl text-green-500" />
                    <div>
                        <p className="text-gray-500">Orders</p>
                        <h2 className="text-xl font-semibold">3 Orders</h2>
                    </div>
                </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white p-6 rounded-2xl shadow-md">
                <h2 className="text-2xl font-semibold mb-4">Recent Activity</h2>
                <ul className="space-y-3 text-gray-600">
                    <li>🍽️ Ordered <strong>Mutton Curry</strong></li>
                    <li>⭐ Reviewed <strong>Chicken Biryani</strong></li>
                    <li>❤️ Added <strong>Beef Kebab</strong> to favorites</li>
                </ul>
            </div>
        </div>
    );
};

export default UserDashboard;
