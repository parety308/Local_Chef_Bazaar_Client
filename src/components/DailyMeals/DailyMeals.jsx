import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure/useAxiosSecure';
import MealCard from '../MealCard/MealCard';
import { motion } from 'framer-motion';
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
        className="text-5xl text-center my-10 font-bold flex justify-center"
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
    return (
        < div className='my-15'>
            {/* <title>Today's Special Meals</title> */}
            <AnimatedTitle text="Today’s Special Meals" />
            <div className='grid lg:grid-cols-3 gap-5 '>
                {
                    latest6Meals.map(meal => <MealCard key={meal._id} meal={meal}></MealCard>)
                }
            </div>
        </div>
    );
};

export default DailyMeals;