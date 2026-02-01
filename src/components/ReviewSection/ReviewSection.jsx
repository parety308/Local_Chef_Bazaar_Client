import { useState } from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure/useAxiosSecure';
import ReviewCard from '../ReviewCard/ReviewCard';
import { FaStar } from 'react-icons/fa';

/* -------------------- Animated Title -------------------- */
const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const letterVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

const AnimatedTitle = ({ text }) => (
  <motion.h1
    variants={container}
    initial="hidden"
    animate="visible"
    className="text-5xl text-center my-5 font-bold flex justify-center"
  >
    {text.split('').map((char, index) => (
      <motion.span key={index} variants={letterVariant} className="inline-block">
        {char === ' ' ? '\u00A0' : char}
      </motion.span>
    ))}
  </motion.h1>
);

/* -------------------- Review Section -------------------- */
const ReviewSection = () => {
  const axiosSecure = useAxiosSecure();

  const [swiperRef, setSwiperRef] = useState(null);
  const [activeReview, setActiveReview] = useState(null);

  const { data: reviews = [] } = useQuery({
    queryKey: ['reviews'],
    queryFn: async () => {
      const res = await axiosSecure.get('/all-reviews');
      return res.data;
    },
  });

  /* ---------- Modal Handlers ---------- */
  const handleOpenModal = (review) => {
    setActiveReview(review);
    swiperRef?.autoplay?.stop();
  };

  const handleCloseModal = () => {
    setActiveReview(null);
    swiperRef?.autoplay?.start();
  };

  return (
    <div className="my-16">
      {/* Heading */}
      <div className="text-center mb-24">
        <AnimatedTitle text="What Our Customers Say" />
        <p className="text-gray-600">
          Real feedback from real food lovers 🍽️
        </p>
      </div>

      {/* Swiper */}
      <Swiper
        onSwiper={setSwiperRef}
        loop
        effect="coverflow"
        grabCursor
        centeredSlides
        slidesPerView={3}
        breakpoints={{
          0: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        coverflowEffect={{
          rotate: 30,
          stretch: 50,
          depth: 200,
          modifier: 1,
          scale: 0.75,
          slideShadows: true,
        }}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        modules={[EffectCoverflow, Pagination, Autoplay]}
        className="mySwiper"
      >
        {reviews.map((review) => (
          <SwiperSlide key={review._id} className="flex justify-center">
            <ReviewCard
              review={review}
              onOpenModal={handleOpenModal}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* -------------------- MODAL -------------------- */}
      {activeReview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white max-w-lg w-full rounded-2xl p-6 relative shadow-xl"
          >
            {/* Close */}
            <button
              onClick={handleCloseModal}
              className="absolute top-3 right-4 text-xl font-bold"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold text-[#3D2B1F] mb-2">
              {activeReview.mealName}
            </h2>

            <div className="flex items-center gap-3 mb-4">
              <img
                src={activeReview.userImg}
                alt={activeReview.userName}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="font-semibold">{activeReview.userName}</p>
                <div className="flex gap-1 text-[#F4B400]">
                  {[...Array(activeReview.ratings)].map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>
              </div>
            </div>

            <p className="text-gray-700 leading-relaxed">
              {activeReview.review}
            </p>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default ReviewSection;
