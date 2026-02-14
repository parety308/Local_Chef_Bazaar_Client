import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure/useAxiosSecure';
import ReviewCard from '../ReviewCard/ReviewCard';
import { FaStar } from 'react-icons/fa';

const ReviewSection = () => {
  const axiosSecure = useAxiosSecure();

  const [swiperRef, setSwiperRef] = useState(null);
  const [activeReview, setActiveReview] = useState(null);

  const { data: reviews = [], isLoading, isError, error } = useQuery({
    queryKey: ['reviews'],
    queryFn: async () => {
      const res = await axiosSecure.get('/all-reviews');
      return res.data;
    },
  });

  useEffect(() => {
    if (swiperRef && reviews.length > 0) {
      swiperRef.autoplay.start();
    }
  }, [swiperRef, reviews]);

  const handleOpenModal = (review) => {
    setActiveReview(review);
    swiperRef?.autoplay?.stop();
  };

  const handleCloseModal = () => {
    setActiveReview(null);
    swiperRef?.autoplay?.start();
  };

  if (isLoading) {
    return (
      <div className="text-center py-20 text-xl font-semibold">
        Loading reviews...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-20 text-xl font-semibold text-red-500">
        Error loading reviews: {error.message}
      </div>
    );
  }

  return (
    <div className="my-16">
      {/* Simple Static Title */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-800 mb-2">
          What Our Customers Say
        </h2>
        <p className="text-gray-600">
          Real feedback from real food lovers 🍽️
        </p>
      </div>

      {/* Swiper */}
      {reviews.length > 0 && (
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
            delay: 1200,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
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
      )}

      {/* Modal */}
      {activeReview && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={handleCloseModal}
        >
          <div
            className="bg-white max-w-lg w-full rounded-2xl p-6 relative shadow-xl"
            onClick={(e) => e.stopPropagation()}
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
                src={activeReview.reviewerImg}
                alt={activeReview.reviewerName}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="font-semibold">{activeReview.reviewerName}</p>
                <div className="flex gap-1 text-[#F4B400]">
                  {[...Array(activeReview.ratings)].map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>
              </div>
            </div>

            <p className="text-gray-700 leading-relaxed">{activeReview.review}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewSection;
