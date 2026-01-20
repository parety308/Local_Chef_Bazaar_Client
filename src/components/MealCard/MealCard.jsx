import React from "react";

const MealCard = ({ meal }) => {
  const { foodName,foodImg, price, rating ,_id,chefName} = meal;

  return (
    <div className="relative rounded-xl overflow-hidden shadow-lg hover:shadow-xl transform  hover:translate-2 transition duration-300">
      {/* Meal Image */}
      <img
        src={foodImg}
        // alt={foodName}
        className="w-full h-70 object-cover rounded-xl"
      />

      {/* Chef Info */}
      <div className="absolute top-4 right-4 flex items-center gap-2 font-bold text-yellow-300">
           ⭐ {rating}
      </div>

      {/* Meal Info & Button */}
      <div className="absolute bottom-4 left-4 right-4 flex flex-col gap-2 text-white">
        <h3 className="text-lg font-bold ">{foodName}</h3>
        <div className="flex items-center justify-between">
          <span className="bg-orange-500 px-2 py-1 text-xs rounded">₹{price}</span>
          <span className="flex items-center gap-1 bg-orange-500 p-1 text-sm rounded">
            Chef : {chefName}
          </span>
        </div>
        <button
          className="mt-2 bg-white text-black font-semibold px-4 py-2 rounded-full hover:bg-orange-500 hover:text-white transition"
          onClick={() => window.location.href = `/meal-details/${_id}`}
        >
          View Dish
        </button>
      </div>
    </div>
  );
};

export default MealCard;
