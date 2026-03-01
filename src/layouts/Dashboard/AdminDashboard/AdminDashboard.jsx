import { FaUserCircle, FaUsers, FaTasks, FaChartLine } from "react-icons/fa";
import { Link } from "react-router";

const AdminDashboard = () => {
    return (
        <div className="p-8 min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            <title>Admin Dashboard</title>

            {/* Header */}
            <h1 className="text-4xl font-bold mb-10 text-gray-800 dark:text-gray-100 text-center md:text-left">
                Welcome, Admin 👋
            </h1>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">

                {/* Overview */}
                <Link
                    to="/dashboard/platform-statistics"
                    className="bg-gradient-to-br from-blue-100 to-blue-50 
                               dark:from-blue-900/40 dark:to-blue-800/30
                               p-6 rounded-3xl shadow-lg hover:shadow-2xl
                               transform hover:-translate-y-1 transition-all"
                >
                    <FaChartLine className="text-4xl text-blue-500 dark:text-blue-400 mb-4" />
                    <h3 className="text-gray-500 dark:text-gray-400 mb-1">
                        Overview
                    </h3>
                    <p className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                        System Status
                    </p>
                </Link>

                {/* Profile */}
                <Link
                    to="/dashboard/my-profile"
                    className="bg-gradient-to-br from-green-100 to-green-50
                               dark:from-green-900/40 dark:to-green-800/30
                               p-6 rounded-3xl shadow-lg hover:shadow-2xl
                               transform hover:-translate-y-1 transition-all"
                >
                    <FaUserCircle className="text-4xl text-green-500 dark:text-green-400 mb-4" />
                    <h3 className="text-gray-500 dark:text-gray-400 mb-1">
                        My Profile
                    </h3>
                    <p className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                        Admin Info
                    </p>
                </Link>

                {/* Manage Users */}
                <Link
                    to="/dashboard/manage-users"
                    className="bg-gradient-to-br from-purple-100 to-purple-50
                               dark:from-purple-900/40 dark:to-purple-800/30
                               p-6 rounded-3xl shadow-lg hover:shadow-2xl
                               transform hover:-translate-y-1 transition-all"
                >
                    <FaUsers className="text-4xl text-purple-500 dark:text-purple-400 mb-4" />
                    <h3 className="text-gray-500 dark:text-gray-400 mb-1">
                        Manage Users
                    </h3>
                    <p className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                        Users Control
                    </p>
                </Link>

                {/* Manage Requests */}
                <Link
                    to="/dashboard/manage-requests"
                    className="bg-gradient-to-br from-red-100 to-red-50
                               dark:from-red-900/40 dark:to-red-800/30
                               p-6 rounded-3xl shadow-lg hover:shadow-2xl
                               transform hover:-translate-y-1 transition-all"
                >
                    <FaTasks className="text-4xl text-red-500 dark:text-red-400 mb-4" />
                    <h3 className="text-gray-500 dark:text-gray-400 mb-1">
                        Manage Requests
                    </h3>
                    <p className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                        Pending Actions
                    </p>
                </Link>
            </div>

            {/* Info Section */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 border border-gray-100 dark:border-gray-700 transition-colors">
                <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-100">
                    Recent Admin Activities
                </h2>

                <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                    <li>👤 User role updated</li>
                    <li>✅ Request approved</li>
                    <li>❌ Request rejected</li>
                    <li>📊 New report generated</li>
                </ul>
            </div>
        </div>
    );
};

export default AdminDashboard;