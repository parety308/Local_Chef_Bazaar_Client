import { useQuery } from '@tanstack/react-query';
import { useParams, NavLink } from 'react-router';
import useAxiosSecure from '../../hooks/useAxiosSecure/useAxiosSecure';
import Loading from '../../components/Loading/Loading';
import { useState } from 'react';
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';
import useAuth from '../../hooks/useAuth/useAuth';
import Swal from 'sweetalert2';

const MealDetails = () => {
  const [ratings, setRatings] = useState(3);
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  // ================= USER =================
  const { data: currentUser = null } = useQuery({
    queryKey: ['user', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users-role/${user.email}`);
      return res.data;
    }
  });

  // ================= MEAL =================
  const { data: meal, isLoading, refetch } = useQuery({
    queryKey: ['meals', id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/meals/${id}`);
      return res.data;
    }
  });

  // ================= REVIEWS =================
  const {
    data: reviews = [],
    isLoading: reviewLoading,
    refetch: reviewRefetch
  } = useQuery({
    queryKey: ['reviews', id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews/${id}`);
      return res.data;
    }
  });

  const {
    foodName,
    chefName,
    foodImg,
    price,
    rating,
    deliveryArea,
    estimatedDeliveryTime,
    chefExperience,
    ingredients = [],
    chefId
  } = meal || {};

  // ================= REVIEW =================
  const handleReview = (e) => {
    e.preventDefault();

    const review = {
      mealId: id,
      mealName: foodName,
      mealImg: foodImg,
      ratings,
      review: e.target.reviewText.value,
      reviewerName: currentUser?.name,
      reviewerEmail: currentUser?.email,
      reviewerImg: currentUser?.photoUrl,
      date: new Date().toISOString()
    };

    axiosSecure.post('/reviews', review).then(res => {
      if (res.data.insertedId) {
        e.target.reset();
        refetch();
        reviewRefetch();

        Swal.fire({
          icon: "success",
          title: "Review submitted",
          timer: 1500,
          showConfirmButton: false
        });
      }
    });
  };

  // ================= FAVOURITE =================
  const handleFavourites = () => {
    const newMeal = {
      userEmail: currentUser.email,
      userName: currentUser.name,
      mealId: id,
      mealName: foodName,
      mealImg: foodImg,
      chefId,
      chefName,
      price,
      added_date: new Date().toISOString()
    };

    axiosSecure.post('/favourites', newMeal)
      .then(() => {
        Swal.fire("Added!", "Meal added to favourites", "success");
      })
      .catch(() => {
        Swal.fire("Already Added!", "", "warning");
      });
  };

  if (isLoading || reviewLoading) return <Loading />;

  return (
    <div className="
      min-h-screen pb-20 transition-colors duration-300
      bg-gradient-to-b from-orange-50 to-white
      dark:from-gray-900 dark:to-gray-950
      text-gray-800 dark:text-gray-200
    ">

      {/* HERO */}
      <div className="w-11/12 lg:w-10/12 mx-auto grid lg:grid-cols-3 gap-10 pt-10">

        {/* IMAGE */}
        <div className="lg:col-span-2 relative group">
          <img
            src={foodImg}
            alt={foodName}
            className="w-full h-[520px] object-cover rounded-3xl shadow-xl"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-3xl"></div>

          <div className="
            absolute top-5 left-5
            bg-white/90 dark:bg-gray-800/80
            backdrop-blur-md px-5 py-2
            rounded-full shadow-lg font-semibold
          ">
            ⭐ {rating}
          </div>

          <button
            onClick={handleFavourites}
            className="
              absolute top-5 right-5
              bg-white dark:bg-gray-800
              p-3 rounded-full shadow-lg
              hover:scale-110 transition
            "
          >
            ❤️
          </button>

          <div className="absolute bottom-6 left-6 text-white">
            <h1 className="text-4xl font-bold">{foodName}</h1>
            <p>Chef : {chefName}</p>
            <p>Chef id : #{chefId}</p>
          </div>
        </div>

        {/* ORDER CARD */}
        <div className="sticky top-24 h-fit">
          <div className="
            p-8 rounded-3xl shadow-xl border
            bg-white/80 dark:bg-gray-900/80
            border-gray-200 dark:border-gray-700
            backdrop-blur-xl
          ">
            <p className="text-gray-500 dark:text-gray-400">Price</p>

            <h2 className="text-4xl font-bold text-orange-500 mb-6">
              ৳ {price}
            </h2>

            <div className="space-y-4 text-sm">
              <InfoRow label="Delivery Area" value={deliveryArea}/>
              <InfoRow label="Delivery Time" value={`${estimatedDeliveryTime} mins`}/>
              <InfoRow label="Chef Experience" value={`${chefExperience} yrs`}/>
            </div>

            <NavLink
              to={`/order/${id}`}
              className="
                block text-center mt-8
                bg-gradient-to-r from-orange-500 to-red-500
                text-white py-3 rounded-xl font-semibold
                hover:scale-105 transition
              "
            >
              🍽 Order Now
            </NavLink>
          </div>
        </div>
      </div>

      {/* INGREDIENTS */}
      <SectionCard title="Ingredients">
        <div className="flex flex-wrap gap-3">
          {ingredients.map((item, i) => (
            <span
              key={i}
              className="
                px-4 py-2 rounded-full text-sm font-medium
                bg-orange-100 text-orange-600
                dark:bg-orange-900/40 dark:text-orange-300
              "
            >
              {item}
            </span>
          ))}
        </div>
      </SectionCard>

      {/* REVIEWS */}
      <SectionCard title="Ratings & Reviews">

        <form onSubmit={handleReview} className="mb-12">
          <Rating
            style={{ maxWidth: 180 }}
            value={ratings}
            onChange={setRatings}
          />

          <textarea
            name="reviewText"
            required
            placeholder="Tell others how the food tasted..."
            className="
              w-full border rounded-xl p-4 mt-4
              bg-white dark:bg-gray-900
              border-gray-300 dark:border-gray-700
              focus:ring-2 focus:ring-orange-400
            "
          />

          <button className="mt-4 bg-primary text-white px-6 py-2 rounded-xl">
            Submit Review
          </button>
        </form>

        {reviews.length === 0 && (
          <p className="text-gray-400">No reviews yet.</p>
        )}
      </SectionCard>

    </div>
  );
};

/* ================= SMALL COMPONENTS ================= */

const SectionCard = ({ title, children }) => (
  <div className="w-11/12 lg:w-10/12 mx-auto mt-12">
    <div className="
      rounded-3xl shadow-lg p-8
      bg-white dark:bg-gray-900
      border border-gray-200 dark:border-gray-700
    ">
      <h2 className="text-2xl font-bold mb-5 text-orange-600">
        {title}
      </h2>
      {children}
    </div>
  </div>
);

const InfoRow = ({ label, value }) => (
  <div className="flex justify-between">
    <span className="text-gray-500 dark:text-gray-400">{label}</span>
    <span className="font-semibold">{value}</span>
  </div>
);

export default MealDetails;