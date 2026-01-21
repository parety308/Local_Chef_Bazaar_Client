import React from 'react';
import { FaUserCircle, FaUsers, FaTasks, FaChartLine } from "react-icons/fa";

const AdminDashboard = () => {
    return (
        <div className="p-8">
            {/* Header */}
            <h1 className="text-4xl font-bold mb-10 text-gray-800">
                Admin Dashboard
            </h1>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition">
                    <FaChartLine className="text-4xl text-blue-500 mb-4" />
                    <h3 className="text-gray-500">Overview</h3>
                    <p className="text-xl font-semibold">System Status</p>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition">
                    <FaUserCircle className="text-4xl text-green-500 mb-4" />
                    <h3 className="text-gray-500">My Profile</h3>
                    <p className="text-xl font-semibold">Admin Info</p>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition">
                    <FaUsers className="text-4xl text-purple-500 mb-4" />
                    <h3 className="text-gray-500">Manage Users</h3>
                    <p className="text-xl font-semibold">Users Control</p>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition">
                    <FaTasks className="text-4xl text-red-500 mb-4" />
                    <h3 className="text-gray-500">Manage Requests</h3>
                    <p className="text-xl font-semibold">Pending Actions</p>
                </div>
            </div>

            {/* Info Section */}
            <div className="bg-white p-8 rounded-2xl shadow-md">
                <h2 className="text-2xl font-semibold mb-4">
                    Admin Activities
                </h2>
                <ul className="space-y-3 text-gray-600">
                    <li>👤 User role updated</li>
                    <li>✅ Request approved</li>
                    <li>❌ Request rejected</li>
                </ul>
            </div>
        </div>
    );
};

export default AdminDashboard;
