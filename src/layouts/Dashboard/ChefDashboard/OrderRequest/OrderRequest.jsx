import React from 'react';
import useAuth from '../../../../hooks/useAuth/useAuth';
import useAxiosSecure from '../../../../hooks/useAxiosSecure/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../../components/Loading/Loading';

const OrderRequest = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: orders = [], isLoading, refetch } = useQuery({
        queryKey: ['orders'],
        queryFn: async () => {
            const res = await axiosSecure.get('/orders');
            return res.data;
        }
    });

    console.log(orders);
    if (isLoading) {
        return <Loading />
    }
    return (
        <div className='w-11/12 mx-auto my-10'>
            <h1 className="text-3xl font-bold">Ordered Rquest :{orders.length}</h1>
            {
                orders.map(meal => <div className="bg-white shadow-lg rounded-2xl p-6 border border-gray-200 max-w-xl">
                    {/* Order Info */}
                    <div className="space-y-2">
                        <h2 className="text-xl font-semibold text-gray-800">
                            🍔 Meal Name : {meal.mealName}
                        </h2>
                        <p className="text-gray-600">
                            <span className="font-medium">Price:</span> ${meal.price}
                        </p>
                        <p className="text-gray-600">
                            <span className="font-medium">Quantity:</span> {meal.quantity}
                        </p>
                        <p className="text-gray-600">
                            <span className="font-medium">Order Status:</span>
                            {
                                meal.orderStatus === 'pending' ? < span className={`ml-2 px-3 py-1 rounded-full text-sm bg-yellow-100 text-yellow-700`}>
                                    {meal.orderStatus}
                                </span> : <span className='ml-2 px-3 py-1 rounded-full text-sm bg-green-100 text-green-700'>{meal.orderStatus}</span>
                            }
                        </p>
                        <p className="text-gray-600">
                            <span className="font-medium">User Email:</span> {meal.userEmail}
                        </p>
                        <p className="text-gray-600">
                            <span className="font-medium">Order Time:</span> {meal.orderTime}
                        </p>
                        <p className="text-gray-600">
                            <span className="font-medium">User Address:</span> {meal.userAddress}
                        </p>
                        <p className="text-gray-600">
                            <span className="font-medium">Payment Status:</span>
                            <span className="ml-2 px-3 py-1 rounded-full text-sm bg-green-100 text-green-700">
                                {meal.paymentStatus}
                            </span>
                        </p>
                    </div>
                    {/* Action Buttons */}
                    < div className="flex justify-between mt-6 gap-3" >
                        <button className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-xl font-semibold transition">
                            Cancel
                        </button>
                        <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-xl font-semibold transition">
                            Accept
                        </button>
                        {
                            meal.paymentStatus === 'paid' && <button className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-xl font-semibold transition">
                                Deliver
                            </button>
                        }
                    </div>
                </div >)
            }
        </div >
    );
};

export default OrderRequest;