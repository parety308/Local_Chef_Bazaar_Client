import React from 'react';
import { FaUserCircle, FaPlusCircle, FaUtensils, FaClipboardList } from "react-icons/fa";
import { useNavigate } from 'react-router';

const ChefDashboard = () => {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen  p-8">
            <title>Chef Dashboard</title>
            {/* Header */}
            <h1 className="text-4xl font-bold mb-10 text-gray-800">
                Chef Dashboard 👨‍🍳
            </h1>

            {/* Dashboard Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">

                {/* My Profile */}
                <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition cursor-pointer" onClick={() => navigate('/dashboard/my-profile')}>
                    <FaUserCircle className="text-4xl text-blue-500 mb-4" />
                    <h3 className="text-gray-500">My Profile</h3>
                    <p className="text-xl font-semibold">View & Update</p>
                </div>

                {/* Create Meal */}
                <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition cursor-pointer" onClick={() => navigate('/dashboard/create-meals')}>
                    <FaPlusCircle className="text-4xl text-green-500 mb-4" />
                    <h3 className="text-gray-500">Create Meal</h3>
                    <p className="text-xl font-semibold">Add New Dish</p>
                </div>

                {/* My Meals */}
                <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition cursor-pointer" onClick={() => navigate('/dashboard/my-meals')}>
                    <FaUtensils className="text-4xl text-orange-500 mb-4" />
                    <h3 className="text-gray-500">My Meals</h3>
                    <p className="text-xl font-semibold">Manage Menu</p>
                </div>

                {/* Order Requests */}
                <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition cursor-pointer" onClick={() => navigate('/dashboard/order-request')}>
                    <FaClipboardList className="text-4xl text-red-500 mb-4" />
                    <h3 className="text-gray-500">Order Requests</h3>
                    <p className="text-xl font-semibold">Pending Orders</p>
                </div>

            </div>

            {/* Recent Section */}
            <div className="bg-white p-8 rounded-2xl shadow-md">
                <h2 className="text-2xl font-semibold mb-4">
                    Recent Chef Activities
                </h2>
                <ul className="space-y-3 text-gray-600">
                    <li>🍛 Added a new meal</li>
                    <li>📦 Received a new order request</li>
                    <li>✅ Order accepted</li>
                </ul>
            </div>
        </div>
    );
};

export default ChefDashboard;
