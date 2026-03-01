import React from 'react';
import { FaUserCircle, FaPlusCircle, FaUtensils, FaClipboardList } from "react-icons/fa";
import { useNavigate } from 'react-router';

const ChefDashboard = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen p-8 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            <title>Chef Dashboard</title>

            {/* Header */}
            <h1 className="text-4xl font-bold mb-10 text-gray-800 dark:text-gray-100 text-center md:text-left">
                Welcome, Chef 👨‍🍳
            </h1>

            {/* Dashboard Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">

                {/* My Profile */}
                <div
                    className="bg-gradient-to-br from-blue-100 to-blue-50 
                    dark:from-blue-900/40 dark:to-blue-800/20
                    p-6 rounded-3xl shadow-lg hover:shadow-2xl
                    transform hover:-translate-y-1 transition-all cursor-pointer"
                    onClick={() => navigate('/dashboard/my-profile')}
                >
                    <FaUserCircle className="text-4xl text-blue-500 dark:text-blue-400 mb-4" />
                    <h3 className="text-gray-500 dark:text-gray-400 mb-1">My Profile</h3>
                    <p className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                        View & Update
                    </p>
                </div>

                {/* Create Meal */}
                <div
                    className="bg-gradient-to-br from-green-100 to-green-50
                    dark:from-green-900/40 dark:to-green-800/20
                    p-6 rounded-3xl shadow-lg hover:shadow-2xl
                    transform hover:-translate-y-1 transition-all cursor-pointer"
                    onClick={() => navigate('/dashboard/create-meals')}
                >
                    <FaPlusCircle className="text-4xl text-green-500 dark:text-green-400 mb-4" />
                    <h3 className="text-gray-500 dark:text-gray-400 mb-1">Create Meal</h3>
                    <p className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                        Add New Dish
                    </p>
                </div>

                {/* My Meals */}
                <div
                    className="bg-gradient-to-br from-orange-100 to-orange-50
                    dark:from-orange-900/40 dark:to-orange-800/20
                    p-6 rounded-3xl shadow-lg hover:shadow-2xl
                    transform hover:-translate-y-1 transition-all cursor-pointer"
                    onClick={() => navigate('/dashboard/my-meals')}
                >
                    <FaUtensils className="text-4xl text-orange-500 dark:text-orange-400 mb-4" />
                    <h3 className="text-gray-500 dark:text-gray-400 mb-1">My Meals</h3>
                    <p className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                        Manage Menu
                    </p>
                </div>

                {/* Order Requests */}
                <div
                    className="bg-gradient-to-br from-red-100 to-red-50
                    dark:from-red-900/40 dark:to-red-800/20
                    p-6 rounded-3xl shadow-lg hover:shadow-2xl
                    transform hover:-translate-y-1 transition-all cursor-pointer"
                    onClick={() => navigate('/dashboard/order-request')}
                >
                    <FaClipboardList className="text-4xl text-red-500 dark:text-red-400 mb-4" />
                    <h3 className="text-gray-500 dark:text-gray-400 mb-1">Order Requests</h3>
                    <p className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                        Pending Orders
                    </p>
                </div>
            </div>

            {/* Recent Activities */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 p-8 transition-colors duration-300">
                <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-100">
                    Recent Chef Activities
                </h2>

                <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                    <li>🍛 Added a new meal</li>
                    <li>📦 Received a new order request</li>
                    <li>✅ Order accepted</li>
                    <li>🕒 Updated meal menu</li>
                </ul>
            </div>
        </div>
    );
};

export default ChefDashboard;