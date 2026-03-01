import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure/useAxiosSecure';
import MealCard from '../MealCard/MealCard';

const DailyMeals = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: latestMeals = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['meals'],
    queryFn: async () => {
      const res = await axiosSecure.get('/meals');
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="text-center my-8 lg:my-16 text-base-content/60">
        Loading meals...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center my-8 lg:my-16 text-error">
        Error loading meals: {error.message}
      </div>
    );
  }

  return (
    <div className="p-4 my-8 lg:my-16 bg-base-200 transition-colors duration-300">
      
      {/* Title */}
      <h2 className="text-4xl font-bold text-center text-base-content mb-10">
        Today’s Special Meals
      </h2>

      {/* Meals Grid */}
      <div className="grid lg:grid-cols-3 gap-5">
        {latestMeals.map((meal) => (
          <MealCard key={meal._id} meal={meal} />
        ))}
      </div>
    </div>
  );
};

export default DailyMeals;