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
            className="relative w-full max-w-md mx-auto rounded-3xl 
            bg-gradient-to-br from-[#FFF8EE] to-[#FFE6C7] 
            shadow-xl overflow-hidden"
        >
            <div className="p-6 space-y-5">
                <div className='flex justify-between items-center'>
                    <div className="flex items-center gap-3">
                        <FaUtensils className="text-3xl text-[#5A3E2B]" />
                        <h3 className="text-xl font-semibold text-[#5A3E2B]">
                            {mealName}
                        </h3>
                    </div>
                    <div>  <img
                        src={mealImg}
                        alt={mealName}
                        className="w-35 h-35 rounded-xl object-cover"
                    /></div>
                </div>
                <p className="text-[#3D2B1F] line-clamp-3 border-b border-dashed border-[#C69C6D] pb-3">
                    {reviewText}
                </p>

                <div className="flex items-center gap-4">
                    <img
                        src={reviewerImg}
                        alt={reviewerName}
                        className="w-12 h-12 rounded-full"
                    />
                    <div>
                        <h4 className="font-semibold">{reviewerName}</h4>
                        <p className="text-xs text-gray-600">{reviewerEmail}</p>
                        <div className="flex items-center gap-1 text-xs bg-[#E8DCC6] px-2 py-1 rounded-full w-fit">
                            <FaCheckCircle className="text-green-600" />
                            Verified Buyer
                        </div>
                    </div>
                </div>

                <div className="flex justify-between items-center">
                    <div className="flex gap-1 text-[#F4B400]">
                        {[...Array(ratings)].map((_, i) => (
                            <FaStar key={i} />
                        ))}
                    </div>

                    <button
                        onClick={() => onOpenModal(review)}
                        className="text-sm font-semibold px-4 py-2 
                        bg-white rounded-lg shadow hover:-translate-y-1 transition"
                    >
                        Read More
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default ReviewCard;
