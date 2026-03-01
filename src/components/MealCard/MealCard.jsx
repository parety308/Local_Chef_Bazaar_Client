import { FaStar } from "react-icons/fa";
import { SiCodechef } from "react-icons/si";
import { MdLocationPin } from "react-icons/md";

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
    <div className="
      bg-base-100
      rounded-2xl
      overflow-hidden
      shadow-md
      hover:shadow-2xl
      transition duration-300
      group
      border border-base-300
    ">

      {/* Image Section */}
      <div className="relative overflow-hidden">
        <img
          src={foodImg}
          alt={foodName}
          className="w-full h-64 object-cover group-hover:scale-110 transition duration-500"
        />

        {/* Rating Badge */}
        <div className="
          absolute top-3 right-3
          bg-base-100
          px-3 py-1
          rounded-full
          flex items-center gap-1
          shadow
          text-base-content
        ">
          <FaStar className="text-yellow-400" />
          <span className="font-semibold text-sm">{rating}</span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 space-y-3">

        {/* Food Name */}
        <h3 className="text-xl font-bold text-base-content">
          {foodName}
        </h3>

        {/* Chef Info */}
        <div className="text-sm text-base-content/70 space-y-1">
          <p className="flex items-center gap-2">
            <SiCodechef className="text-primary" />
            Chef: <span className="font-semibold">{chefName}</span>
          </p>

          <p className="text-xs opacity-70">
            Chef ID: #{chefId}
          </p>
        </div>

        {/* Delivery Area */}
        <p className="flex items-center gap-2 text-sm text-base-content/70">
          <MdLocationPin className="text-secondary" />
          {deliveryArea}
        </p>

        {/* Price + Button */}
        <div className="flex items-center justify-between pt-3">

          <span className="text-lg font-bold text-primary">
            ৳ {price}
          </span>

          <button
            onClick={() =>
              (window.location.href = `/meal-details/${_id}`)
            }
            className="btn btn-primary rounded-lg font-semibold"
          >
            See Details
          </button>

        </div>
      </div>
    </div>
  );
};

export default MealCard;