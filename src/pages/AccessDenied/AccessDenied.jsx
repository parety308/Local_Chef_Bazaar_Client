import React from "react";
import { useNavigate } from "react-router";
import lockImg from "../../assets/lock-illustration.jpg"; // optional illustration

const AccessDenied = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-6">
            <title>Access Denied</title>
            {/* Optional illustration */}
            <div className="max-w-sm w-full mb-8">
                <img
                    src={lockImg}
                    alt="Access Denied"
                    className="w-full h-auto object-contain"
                />
            </div>

            {/* Access Denied Text */}
            <h1 className="text-6xl md:text-7xl font-bold text-yellow-500 mb-4">
                ⛔
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 mb-2">
                Access Denied
            </h2>
            <p className="text-gray-500 text-center mb-6">
                You don’t have permission to view this page. Please contact the administrator if you think this is a mistake.
            </p>

            {/* Button to go back home */}
            <button
                onClick={() => navigate("/")}
                className="bg-yellow-500 text-white px-6 py-3 rounded-lg shadow hover:bg-yellow-600 transition-colors"
            >
                Go to Home
            </button>
        </div>
    );
};

export default AccessDenied;
