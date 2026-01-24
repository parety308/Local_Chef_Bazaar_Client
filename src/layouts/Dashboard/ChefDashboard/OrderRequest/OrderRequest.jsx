import React from 'react';

const OrderRequest = () => {
    return (
        <div className="bg-white shadow-lg rounded-2xl p-6 border border-gray-200 max-w-xl">

            {/* Order Info */}
            <div className="space-y-2">
                <h2 className="text-xl font-semibold text-gray-800">
                    🍔 Food Name: Chicken Burger
                </h2>

                <p className="text-gray-600">
                    <span className="font-medium">Price:</span> $12.99
                </p>

                <p className="text-gray-600">
                    <span className="font-medium">Quantity:</span> 2
                </p>

                <p className="text-gray-600">
                    <span className="font-medium">Order Status:</span>
                    <span className="ml-2 px-3 py-1 rounded-full text-sm bg-yellow-100 text-yellow-700">
                        Pending
                    </span>
                </p>

                <p className="text-gray-600">
                    <span className="font-medium">User Email:</span> user@gmail.com
                </p>

                <p className="text-gray-600">
                    <span className="font-medium">Order Time:</span> 24 Jan 2026, 10:30 AM
                </p>

                <p className="text-gray-600">
                    <span className="font-medium">User Address:</span> Chittagong, Bangladesh
                </p>

                <p className="text-gray-600">
                    <span className="font-medium">Payment Status:</span>
                    <span className="ml-2 px-3 py-1 rounded-full text-sm bg-green-100 text-green-700">
                        Paid
                    </span>
                </p>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between mt-6 gap-3">
                <button className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-xl font-semibold transition">
                    Cancel
                </button>

                <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-xl font-semibold transition">
                    Accept
                </button>

                <button className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-xl font-semibold transition">
                    Deliver
                </button>
            </div>
        </div>
    );
};

export default OrderRequest;