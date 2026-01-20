import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure/useAxiosSecure';
import MealCard from '../MealCard/MealCard';

const DailyMeals = () => {
    const axiosSecure = useAxiosSecure();
    const { data: meals = [] } = useQuery({
        queryKey: ['meals'],
        queryFn: async () => {
            const res = await axiosSecure.get('/meals');
            return res.data;
        }
    });
    const latest6Meals = meals
        .sort((a, b) => new Date(b.createdAt.$date) - new Date(a.createdAt.$date)) // newest first
        .slice(0, 6);
    // console.log(latest6Meals);
    return (
        < div className='my-15'>
            <h1 className="text-4xl text-center my-5 font-semibold">Today’s Special Meals</h1>
            <div className='grid lg:grid-cols-3 gap-5 '>
                {
                    latest6Meals.map(meal => <MealCard key={meal._id} meal={meal}></MealCard>)
                }
            </div>
        </div>
    );
};

export default DailyMeals;