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
    const { data: currentUser = null } = useQuery({
        queryKey: ['user', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users-role/${user.email}`);
            return res.data;
        }
    });
    // console.log(currentUser);
    const { data: meal, isLoading, refetch } = useQuery({
        queryKey: ['meals', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/meals/${id}`);
            return res.data;
        }
    });

    const { data: reviews, isLoading: reviewLoading, refetch: reviewRefetch } = useQuery({
        queryKey: ['reviews', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/reviews/${id}`);
            return res.data;
        }
    });
    const {
        _id,
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
    const handleReview = (e) => {
        e.preventDefault();
        const review = {
            mealId: id,
            mealName: foodName,
            mealImg: foodImg,
            ratings,
            review: e.target.reviewText.value,
            reviewerName: currentUser?.name,
            reviewerEmail: currentUser.email,
            reviewerImg: currentUser?.photoUrl,
            date: new Date().toISOString()
        };
        axiosSecure.post('/reviews', review)
            .then(res => {
                if (res.data.insertedId) {
                    e.target.reset();
                    refetch();
                    reviewRefetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Review has been submitted",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })

    };

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
            .then(res => {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "This Meal Added Favourite",
                    showConfirmButton: false,
                    timer: 1500
                });
            })
            .catch(error => {
                if (error.response?.status === 400) {
                    Swal.fire({
                        icon: "warning",
                        title: "Already Added!",
                        text: "This meal is already in your favourites.",
                    });
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Something went wrong!",
                        text: "Please try again later.",
                    });
                }
            });


    }
    if (isLoading || reviewLoading) {
        return <Loading />
    }

    return (
        <div className="bg-gradient-to-b from-orange-50 to-white min-h-screen pb-20">
            <title>Meal Details</title>

            {/* ===== HERO SECTION ===== */}
            <div className="w-11/12 lg:w-10/12 mx-auto grid lg:grid-cols-3 gap-10 pt-10">

                {/* IMAGE AREA */}
                <div className="lg:col-span-2 relative group">
                    <img
                        src={foodImg}
                        alt={foodName}
                        className="w-full h-[520px] object-cover rounded-3xl shadow-xl"
                    />

                    {/* overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-3xl"></div>

                    {/* floating rating */}
                    <div className="absolute top-5 left-5 bg-white/90 backdrop-blur-md px-5 py-2 rounded-full shadow-lg font-semibold">
                        ⭐ {rating}
                    </div>

                    {/* floating favourite */}
                    <button
                        onClick={handleFavourites}
                        className="absolute top-5 right-5 bg-white p-3 rounded-full shadow-lg hover:scale-110 transition"
                    >
                        ❤️
                    </button>

                    {/* title overlay */}
                    <div className="absolute bottom-6 left-6 text-white">
                        <h1 className="text-4xl font-bold drop-shadow-lg">
                            {foodName}
                        </h1>
                        <p className="opacity-90">Chef : {chefName}</p>
                        <p className="opacity-90">Chef id : #{chefId}</p>
                    </div>
                </div>

                {/* ===== STICKY ORDER CARD ===== */}
                <div className="sticky top-24 h-fit">
                    <div className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-xl border">

                        <p className="text-gray-500">Price</p>
                        <h2 className="text-4xl font-bold text-orange-500 mb-6">
                            ৳ {price}
                        </h2>

                        <div className="space-y-4 text-sm">
                            <div className="flex justify-between">
                                <span>Delivery Area</span>
                                <span className="font-semibold">{deliveryArea}</span>
                            </div>

                            <div className="flex justify-between">
                                <span>Delivery Time</span>
                                <span className="font-semibold">
                                    {estimatedDeliveryTime} mins
                                </span>
                            </div>

                            <div className="flex justify-between">
                                <span>Chef Experience</span>
                                <span className="font-semibold">
                                    {chefExperience} yrs
                                </span>
                            </div>
                        </div>

                        <NavLink
                            to={`/order/${id}`}
                            className="block text-center mt-8 bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-xl font-semibold hover:scale-105 transition"
                        >
                            🍽 Order Now
                        </NavLink>
                    </div>
                </div>
            </div>

            {/* ===== INGREDIENTS ===== */}
            <div className="w-11/12 lg:w-10/12 mx-auto mt-12">
                <div className="bg-white rounded-3xl shadow-lg p-8">
                    <h2 className="text-2xl font-bold mb-5">Ingredients</h2>

                    <div className="flex flex-wrap gap-3">
                        {ingredients.map((item, i) => (
                            <span
                                key={i}
                                className="px-4 py-2 bg-orange-100 text-orange-600 rounded-full text-sm font-medium hover:scale-105 transition"
                            >
                                {item}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* ===== REVIEWS ===== */}
            <div className="w-11/12 lg:w-10/12 mx-auto mt-12">
                <div className="bg-white rounded-3xl shadow-lg p-8">

                    <h2 className="text-3xl font-bold text-orange-600 mb-8">
                        Ratings & Reviews
                    </h2>

                    {/* REVIEW FORM */}
                    <form onSubmit={handleReview} className="mb-12">
                        <p className="font-semibold mb-2">Your Rating</p>

                        <Rating
                            style={{ maxWidth: 180 }}
                            value={ratings}
                            onChange={setRatings}
                        />

                        <textarea
                            name="reviewText"
                            required
                            placeholder="Tell others how the food tasted..."
                            className="w-full border rounded-xl p-4 mt-4 focus:outline-none focus:ring-2 focus:ring-orange-400"
                        />

                        <button className="mt-4 bg-orange-500 text-white px-6 py-2 rounded-xl hover:bg-orange-600 transition">
                            Submit Review
                        </button>
                    </form>

                    {/* REVIEWS LIST */}
                    <div className="space-y-6">
                        {reviews.length === 0 && (
                            <p className="text-gray-400">No reviews yet.</p>
                        )}

                        {reviews.map((rev, idx) => (
                            <div
                                key={idx}
                                className="flex gap-4 p-5 rounded-2xl border hover:shadow-lg transition"
                            >
                                <img
                                    src={rev.reviewerImg}
                                    className="w-14 h-14 rounded-full object-cover ring-2 ring-orange-200"
                                    alt=""
                                />

                                <div className="flex-1">
                                    <div className="flex justify-between">
                                        <h4 className="font-bold flex items-center gap-2">
                                            {rev.reviewerName}
                                            <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">
                                                ✔ verified
                                            </span>
                                        </h4>

                                        <span className="text-sm text-gray-400">
                                            {new Date(rev.date).toLocaleDateString()}
                                        </span>
                                    </div>

                                    <Rating
                                        style={{ maxWidth: 120 }}
                                        value={rev.ratings}
                                        readOnly
                                    />

                                    <p className="mt-2 text-gray-700 leading-relaxed">
                                        {rev.review}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );


};

export default MealDetails;