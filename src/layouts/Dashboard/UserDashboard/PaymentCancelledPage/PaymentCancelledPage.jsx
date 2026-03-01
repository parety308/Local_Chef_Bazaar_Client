import { Link } from "react-router";

const PaymentCancelledPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center 
        bg-gradient-to-br from-red-50 to-red-100 
        dark:from-gray-900 dark:to-gray-950 px-4">

            <title>Payment Cancelled - Dashboard</title>

            <div className="bg-white dark:bg-gray-900 
            shadow-xl rounded-2xl p-8 max-w-md w-full text-center
            border border-gray-100 dark:border-gray-800">

                {/* Cancel Icon */}
                <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 rounded-full 
                    bg-red-100 dark:bg-red-900/30
                    flex items-center justify-center">
                        <svg
                            className="w-8 h-8 text-red-600 dark:text-red-400"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </div>
                </div>

                {/* Title */}
                <h1 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-2">
                    Payment Cancelled
                </h1>

                {/* Message */}
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Your payment was cancelled. No charges were made.
                </p>

                {/* Info Box */}
                <div className="bg-gray-50 dark:bg-gray-800 
                rounded-xl p-4 text-sm 
                text-gray-600 dark:text-gray-300 mb-6">
                    If this was a mistake, you can retry the payment at any time.
                </div>

                {/* Buttons */}
                <div className="flex gap-3">
                    <Link
                        to="/dashboard/my-parcels"
                        className="flex-1 bg-red-600 hover:bg-red-700 
                        dark:bg-red-500 dark:hover:bg-red-600
                        text-white py-2 rounded-lg font-semibold transition"
                    >
                        Try Again
                    </Link>

                    <Link
                        to="/"
                        className="flex-1 border border-gray-300 dark:border-gray-700
                        hover:bg-gray-100 dark:hover:bg-gray-800
                        text-gray-800 dark:text-gray-200
                        py-2 rounded-lg font-semibold transition"
                    >
                        Go Home
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default PaymentCancelledPage;