import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure/useAxiosSecure';
import MealCard from '../MealCard/MealCard';

const DailyMeals = () => {
    const axiosSecure = useAxiosSecure();
    const { data: meals = [], isLoading, isError, error } = useQuery({
        queryKey: ['meals'],
        queryFn: async () => {
            const res = await axiosSecure.get('/meals');
            return res.data;
        }
    });

    const latest6Meals = meals
        .sort((a, b) => new Date(b.createdAt.$date) - new Date(a.createdAt.$date)) // newest first
        .slice(0, 6);

    if (isLoading) {
        return <div className="text-center my-10 text-gray-500">Loading meals...</div>;
    }
    if (isError) {
        return <div className="text-center my-10 text-red-500">Error loading meals: {error.message}</div>;
    }

    return (
        <div className='my-15'>
            {/* Simple Title */}
            <h2 className="text-4xl font-bold text-center text-gray-800 mb-10">
                Today’s Special Meals
            </h2>

            <div className='grid lg:grid-cols-3 gap-5'>
                {latest6Meals.map(meal => (
                    <MealCard key={meal._id} meal={meal} />
                ))}
            </div>
        </div>
    );
};

export default DailyMeals;
