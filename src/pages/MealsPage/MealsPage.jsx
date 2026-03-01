import React, { useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../components/Loading/Loading';
import MealCard from '../../components/MealCard/MealCard';
import { motion } from 'framer-motion';

// Framer Motion variants
const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
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
    className="text-4xl sm:text-5xl text-center font-bold
    flex justify-center flex-wrap text-base-content"
  >
    {text.split('').map((char, index) => (
      <motion.span key={index} variants={letterVariant}>
        {char === ' ' ? '\u00A0' : char}
      </motion.span>
    ))}
  </motion.div>
);

const MealsPage = () => {
  const axiosSecure = useAxiosSecure();
  const [page, setPage] = useState(1);
  const limit = 9;
  const [sort, setSort] = useState('asc');

  const { data, isLoading, isError } = useQuery({
    queryKey: ['meals', page, sort],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/total-meals?page=${page}&limit=${limit}&sortBy=${sort}`
      );
      return res.data;
    },
    keepPreviousData: true,
  });

  const meals = data?.meals || [];
  const totalCount = data?.totalCount || 0;
  const totalPages = Math.ceil(totalCount / limit);

  if (isLoading) return <Loading />;

  if (isError)
    return (
      <div className="text-center text-error mt-10">
        Error loading meals. Please try again later.
      </div>
    );

  return (
    <div className="w-11/12 mx-auto lg:my-16 my-8 text-base-content">
      <title>All Meals</title>

      <AnimatedTitle text="All Meals" />

      {/* Sort Dropdown */}
      <div className="flex justify-end mb-6">
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="
            select
            bg-base-100
            border border-base-300
            text-base-content
            focus:outline-none
            focus:ring-2
            focus:ring-primary
          "
        >
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </select>
      </div>

      {/* Meals Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {meals.map((meal) => (
          <MealCard key={meal._id} meal={meal} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 mt-8 flex-wrap">
        {/* Prev */}
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="
            px-4 py-2 rounded
            bg-base-200
            hover:bg-primary
            hover:text-primary-content
            disabled:opacity-40
            transition
          "
        >
          Prev
        </button>

        {/* Pages */}
        {[...Array(totalPages).keys()].map((num) => (
          <button
            key={num}
            onClick={() => setPage(num + 1)}
            className={`px-4 py-2 rounded font-semibold transition
              ${
                page === num + 1
                  ? 'bg-primary text-primary-content'
                  : 'bg-base-200 hover:bg-primary hover:text-primary-content'
              }`}
          >
            {num + 1}
          </button>
        ))}

        {/* Next */}
        <button
          onClick={() =>
            setPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={page === totalPages}
          className="
            px-4 py-2 rounded
            bg-base-200
            hover:bg-primary
            hover:text-primary-content
            disabled:opacity-40
            transition
          "
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MealsPage;