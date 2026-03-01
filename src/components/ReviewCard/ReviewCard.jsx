import { motion } from 'framer-motion';
import { FaUtensils, FaStar, FaCheckCircle } from 'react-icons/fa';

const ReviewCard = ({ review, onOpenModal }) => {
  const {
    reviewerName,
    mealName,
    review: reviewText,
    reviewerImg,
    ratings,
    mealImg,
    reviewerEmail
  } = review;

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3 }}
      className="
        relative w-full max-w-md mx-auto
        rounded-3xl
        bg-base-100
        shadow-xl
        overflow-hidden
        border border-base-300
        hover:bg-base-200
        transition
      "
    >
      <div className="p-6 space-y-5">

        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <FaUtensils className="text-3xl text-primary" />

            <h3 className="text-xl font-semibold text-base-content">
              {mealName}
            </h3>
          </div>

          <img
            src={mealImg}
            alt={mealName}
            className="w-28 h-28 rounded-xl object-cover"
          />
        </div>

        {/* Review Text */}
        <p className="
          text-base-content/80
          line-clamp-3
          border-b border-dashed border-base-300
          pb-3
        ">
          {reviewText}
        </p>

        {/* Reviewer */}
        <div className="flex items-center gap-4">
          <img
            src={reviewerImg}
            alt={reviewerName}
            className="w-12 h-12 rounded-full"
          />

          <div>
            <h4 className="font-semibold text-base-content">
              {reviewerName}
            </h4>

            <p className="text-xs text-base-content/60">
              {reviewerEmail}
            </p>

            <div className="
              flex items-center gap-1 text-xs
              bg-base-200
              px-2 py-1
              rounded-full
              w-fit
            ">
              <FaCheckCircle className="text-success" />
              Verified Buyer
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center">

          <div className="flex gap-1 text-warning">
            {[...Array(ratings)].map((_, i) => (
              <FaStar key={i} />
            ))}
          </div>

          <button
            onClick={() => onOpenModal(review)}
            className="
              btn btn-primary btn-sm
              hover:-translate-y-1
              transition
            "
          >
            Read More
          </button>

        </div>
      </div>
    </motion.div>
  );
};

export default ReviewCard;