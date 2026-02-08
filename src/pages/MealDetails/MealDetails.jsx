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
    // console.log(id);
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
            reviewerName: user.displayName,
            reviewerEmail: user.email,
            reviewerImg: user.photoURL,
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
            userEmail: user.email,
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
                console.log(res.data);
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
    // console.log(reviews);
    if (isLoading || reviewLoading) {
        return <Loading />
    }
    return (
        <>
            <div className="w-10/12 mx-auto my-10 p-6 grid grid-cols-1 md:grid-cols-2 gap-10 bg-white shadow-xl rounded-2xl">

                {/* Image Section */}
                <div className="relative">
                    <img
                        src={foodImg}
                        alt={foodName}
                        className="w-full h-105 object-cover rounded-2xl"
                    />
                    <span className="absolute top-4 left-4 bg-yellow-400 text-black px-4 py-1 rounded-full font-semibold">
                        ⭐ {rating}
                    </span>
                </div>

                {/* Details Section */}
                <div className="flex flex-col justify-between">
                    <div>
                        <h1 className="text-4xl font-bold text-gray-800">{foodName}</h1>
                        <p className="text-gray-500 mt-2">
                            Prepared by <span className="font-semibold text-gray-700">{chefName}</span>
                        </p>

                        <p className="text-3xl font-bold text-green-600 mt-4">
                            ৳ {price}
                        </p>

                        {/* Ingredients */}
                        <div className="mt-6">
                            <h3 className="text-xl font-semibold mb-2">Ingredients</h3>
                            <ul className="list-disc list-inside text-gray-600 space-y-1">
                                {ingredients.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        </div>

                        {/* Delivery Info */}
                        <div className="mt-6 grid grid-cols-2 gap-4">
                            <div className="bg-gray-100 p-4 rounded-xl">
                                <p className="text-sm text-gray-500">Delivery Area</p>
                                <p className="font-semibold">{deliveryArea}</p>
                            </div>
                            <div className="bg-gray-100 p-4 rounded-xl">
                                <p className="text-sm text-gray-500">Delivery Time</p>
                                <p className="font-semibold">{estimatedDeliveryTime} mins</p>
                            </div>
                        </div>

                        {/* Chef Info */}
                        <div className="mt-6 bg-gray-50 p-4 rounded-xl">
                            <p><span className="font-semibold">Chef Experience:</span> {chefExperience} years</p>
                            <p><span className="font-semibold">Chef ID:</span> #{chefId}</p>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        {/* Order Button */}
                        <NavLink
                            to={`/order/${id}`}
                            className="mt-8 bg-linear-to-r from-orange-500 to-red-500 text-white text-lg font-semibold py-3 px-6 rounded-xl hover:scale-105 transition-transform"
                        >
                            Order Now 🍽️
                        </NavLink>

                        {/* Favorite Button */}
                        <NavLink
                            onClick={() => handleFavourites(_id)}
                            className="mt-8 bg-linear-to-r from-orange-500 to-red-500 text-white text-lg font-semibold py-3 px-6 rounded-xl hover:scale-105 transition-transform"
                        >
                            Add to Favourite
                        </NavLink>
                    </div>
                </div>
            </div>
            <div className="w-10/12 mx-auto my-10 p-5 border rounded-xl shadow">
                <h2 className="text-3xl font-bold mb-4 text-green-700">
                    Ratings & Reviews
                </h2>

                {/* REVIEW FORM */}
                <form onSubmit={handleReview} className="mb-8">
                    <label className="font-semibold text-xl">Your Rating:</label>
                    <div className="my-3 flex items-center gap-2">
                        <Rating
                            style={{ maxWidth: 180 }}
                            value={ratings}
                            onChange={setRatings}
                        />
                    </div>

                    <textarea
                        className="textarea textarea-bordered w-full"
                        placeholder="Write your review..."
                        name='reviewText'
                        required
                    ></textarea>

                    <button type="submit" className="btn btn-success mt-3">
                        Submit Review
                    </button>
                </form>
                <div>
                    <h3 className="text-2xl font-semibold mb-3">Customers Reviews:</h3>

                    {reviews.length === 0 && (
                        <p className="text-gray-500">No reviews yet. Be the first!</p>
                    )}

                    {reviews.map((rev, idx) => (
                        <div key={idx} className="p-4 border rounded-lg mb-4 flex gap-4">
                            <img
                                src={rev.reviewerImg}
                                className="w-24 h-20 object-cover rounded"
                                alt=""
                            />
                            <div>
                                <h4 className="font-bold">{rev.foodName}</h4>
                                <p className="text-sm text-gray-600">
                                    Reviewer: {rev.reviewerName}
                                </p>
                                <p className="text-sm text-gray-600">
                                    Reviewer Email : {rev.reviewerEmail}
                                </p>
                                <p className='flex gap-2'> Ratings : <Rating
                                    style={{ maxWidth: 120 }}
                                    value={rev.ratings}
                                    readOnly
                                /></p>
                                <p className="mt-2">Review : {rev.review}</p>
                                <p className="text-sm text-gray-500">Posted: {rev.date}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div >
        </>
    );
};

export default MealDetails;