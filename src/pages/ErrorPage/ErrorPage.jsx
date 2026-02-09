import React from "react";
import { useNavigate } from "react-router";
import errorImg from "../../assets/error-illustration.jpg"; // optional illustration

const ErrorPage = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-6">
            <title>Error Page</title>
            {/* Optional illustration */}
            <div className="max-w-md w-full mb-8">
                <img
                    src={errorImg}
                    alt="Error"
                    className="w-full h-auto object-contain"
                />
            </div>

            {/* Error Text */}
            <h1 className="text-6xl md:text-7xl font-bold text-red-600 mb-4">
                404
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 mb-2">
                Oops! Something went wrong.
            </h2>
            <p className="text-gray-500 text-center mb-6">
                We couldn't find the page you're looking for or there was an unexpected error.
            </p>

            {/* Button to go back home */}
            <button
                onClick={() => navigate("/")}
                className="bg-red-600 text-white px-6 py-3 rounded-lg shadow hover:bg-red-700 transition-colors"
            >
                Go to Home
            </button>
        </div>
    );
};

export default ErrorPage;
