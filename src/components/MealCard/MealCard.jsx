import { FaStar } from "react-icons/fa";
import { SiCodechef } from "react-icons/si";
import { MdLocationPin } from "react-icons/md"
const MealCard = ({ meal }) => {
  const {
    foodName,
    foodImg,
    price,
    rating,
    _id,
    chefName,
    chefId,
    deliveryArea,
  } = meal;

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition duration-300 group">

      {/* Image Section */}
      <div className="relative overflow-hidden">
        <img
          src={foodImg}
          alt={foodName}
          className="w-full h-64 object-cover group-hover:scale-110 transition duration-500"
        />

        {/* Rating Badge */}
        <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full flex items-center gap-1 shadow">
          <FaStar className="text-yellow-400" />
          <span className="font-semibold text-sm">{rating}</span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 space-y-3">

        {/* Food Name */}
        <h3 className="text-xl font-bold text-gray-800">
          {foodName}
        </h3>

        {/* Chef Info */}
        <div className="text-sm text-gray-600 space-y-1">
          <p className="flex items-center gap-2">
            <SiCodechef className="text-orange-500" />
            Chef: <span className="font-semibold">{chefName}</span>
          </p>

          <p className="text-xs text-gray-500">
            Chef ID: #{chefId}
          </p>
        </div>

        {/* Delivery Area */}
        <p className="flex items-center gap-2 text-sm text-gray-600">
          <MdLocationPin className="text-red-500" />
          {deliveryArea}
        </p>

        {/* Price + Button */}
        <div className="flex items-center justify-between pt-3">

          <span className="text-lg font-bold text-orange-500">
            ৳ {price}
          </span>

          <button
            onClick={() =>
              (window.location.href = `/meal-details/${_id}`)
            }
            className="bg-orange-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-orange-600 transition"
          >
            See Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default MealCard;
