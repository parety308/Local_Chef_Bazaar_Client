import { Link } from "react-router";

const PaymentCancelledPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-red-100 px-4">
            <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full text-center">
                
                {/* Cancel Icon */}
                <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
                        <svg
                            className="w-8 h-8 text-red-600"
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

                <h1 className="text-2xl font-bold text-red-600 mb-2">
                    Payment Cancelled
                </h1>

                <p className="text-gray-600 mb-6">
                    Your payment was cancelled. No charges were made.
                </p>

                {/* Info Box */}
                <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-600 mb-6">
                    If this was a mistake, you can retry the payment at any time.
                </div>

                {/* Buttons */}
                <div className="flex gap-3">
                    <Link
                        to="/dashboard/my-parcels"
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-semibold transition"
                    >
                        Try Again
                    </Link>

                    <Link
                        to="/"
                        className="flex-1 border border-gray-300 hover:bg-gray-100 py-2 rounded-lg font-semibold transition"
                    >
                        Go Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PaymentCancelledPage;
