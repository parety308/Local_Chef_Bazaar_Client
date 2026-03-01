import React from "react";
import { useNavigate } from "react-router";
import lockImg from "../../assets/lock-illustration.jpg";

const AccessDenied = () => {
  const navigate = useNavigate();

  return (
    <div className="
      min-h-screen flex flex-col justify-center items-center p-6
      bg-gray-100 text-gray-800
      dark:bg-gray-900 dark:text-gray-100
      transition-colors duration-300
    ">
      <title>Access Denied</title>

      {/* Illustration */}
      <div className="max-w-sm w-full mb-8">
        <img
          src={lockImg}
          alt="Access Denied"
          className="w-full h-auto object-contain"
        />
      </div>

      {/* Icon */}
      <h1 className="
        text-6xl md:text-7xl font-bold mb-4
        text-yellow-500 dark:text-yellow-400
      ">
        ⛔
      </h1>

      {/* Title */}
      <h2 className="
        text-2xl md:text-3xl font-semibold mb-2
        text-gray-700 dark:text-gray-200
      ">
        Access Denied
      </h2>

      {/* Description */}
      <p className="
        text-center mb-6 max-w-md
        text-gray-500 dark:text-gray-400
      ">
        You don’t have permission to view this page. Please contact the
        administrator if you think this is a mistake.
      </p>

      {/* Button */}
      <button
        onClick={() => navigate("/")}
        className="
          px-6 py-3 rounded-lg shadow font-medium
          bg-yellow-500 hover:bg-yellow-600 text-white
          dark:bg-yellow-400 dark:hover:bg-yellow-500 dark:text-gray-900
          transition-all duration-300
        "
      >
        Go to Home
      </button>
    </div>
  );
};

export default AccessDenied;