import React from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../components/Loading/Loading';
import MealCard from '../../components/MealCard/MealCard';
import { motion } from 'framer-motion';

// Framer Motion variants
const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08, // delay between letters
    },
  },
};

const letterVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

const AnimatedTitle = ({ text }) => (
  <motion.div
    variants={container}
    initial="hidden"
    animate="visible"
    className="text-5xl text-center my-5 font-bold flex justify-center"
  >
    {text.split('').map((char, index) => (
      <motion.span
        key={index}
        variants={letterVariant}
        className="inline-block"
      >
        {char === ' ' ? '\u00A0' : char}
      </motion.span>
    ))}
  </motion.div>
);

const MealsPage = () => {
  const axiosSecure = useAxiosSecure();

  const { data: meals, isLoading, isError } = useQuery({
    queryKey: ['meals'],
    queryFn: async () => {
      const res = await axiosSecure.get('/meals');
      return res.data;
    },
  });

  if (isLoading) return <Loading />;
  if (isError)
    return (
      <div className="text-center text-red-500">
        Error loading meals. Please try again later.
      </div>
    );

  return (
    <div className="my-15 w-11/12 mx-auto">
      <title>All Meals</title>
      <AnimatedTitle text="All Meals" />

      <div className="grid lg:grid-cols-3 gap-5 md:grid-cols-2 sm:grid-cols-1">
        {meals.map((meal) => (
          <MealCard key={meal._id} meal={meal} />
        ))}
      </div>
    </div>
  );
};

export default MealsPage;
