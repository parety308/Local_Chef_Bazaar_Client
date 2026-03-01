import { useQuery } from "@tanstack/react-query";
import { useRef, useState } from "react";
import useAuth from "../../../../hooks/useAuth/useAuth";
import Loading from "../../../../components/Loading/Loading";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure/useAxiosSecure";

const MyReviewsPage = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const updateModalRef = useRef(null);

    const [currentReview, setCurrentReview] = useState({
        id: "",
        rating: "",
        comment: "",
    });

    const {
        data: reviews = [],
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ["reviews", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/myreviews/${user.email}`);
            return res.data;
        },
    });

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Your review will be deleted",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/my-reviews/${id}`).then((res) => {
                    if (res.data.deletedCount > 0) {
                        Swal.fire("Deleted!", "Your review has been deleted.", "success");
                        refetch();
                    }
                });
            }
        });
    };

    const handleUpdate = (id, review, rating) => {
        setCurrentReview({ id, rating, comment: review });
        updateModalRef.current.showModal();
    };

    const handleUpdateReview = async (e) => {
        e.preventDefault();

        const updatedData = {
            ratings: currentReview.rating,
            review: currentReview.comment,
        };

        try {
            const res = await axiosSecure.patch(
                `/my-reviews/${currentReview.id}`,
                updatedData
            );

            if (res.data.modifiedCount > 0) {
                Swal.fire({
                    icon: "success",
                    title: "Updated!",
                    text: "Your review updated successfully",
                    timer: 1500,
                    showConfirmButton: false,
                });

                updateModalRef.current.close();
                refetch();
            }
        } catch {
            Swal.fire("Error", "Failed to update review", "error");
        }
    };

    if (isLoading) return <Loading />;

    return (
        <div className="w-11/12 mx-auto lg:my-10 text-gray-800 dark:text-gray-200">
            <title>My Reviews - Dashboard</title>

            {/* EMPTY STATE */}
            {reviews.length === 0 && (
                <div className="flex flex-col items-center justify-center
                    bg-white dark:bg-gray-800
                    shadow-md rounded-xl p-10
                    border border-gray-200 dark:border-gray-700">

                    <div className="bg-yellow-100 dark:bg-yellow-900/40 p-5 rounded-full mb-6">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-12 w-12 text-yellow-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>

                    <h2 className="text-2xl md:text-3xl font-bold mb-2 text-center">
                        No Reviews Yet 😔
                    </h2>

                    <p className="text-gray-500 dark:text-gray-400 mb-6 text-center max-w-md">
                        You haven’t added any reviews yet.
                    </p>

                    <button className="px-6 py-3 bg-gradient-to-r from-green-400 to-teal-500
                        hover:from-teal-500 hover:to-green-400
                        text-white font-semibold rounded-full shadow-lg transition">
                        Explore Meals 🍽️
                    </button>
                </div>
            )}

            {/* TABLE */}
            {reviews.length > 0 && (
                <>
                    <h1 className="text-4xl mb-6 font-semibold">
                        Total Reviews : {reviews.length}
                    </h1>

                    <div className="overflow-x-auto
                        bg-white dark:bg-gray-800
                        rounded-xl shadow
                        border border-gray-200 dark:border-gray-700">

                        <table className="table">
                            <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
                                <tr>
                                    <th className="text-center">#</th>
                                    <th className="text-center">Meal Name</th>
                                    <th className="text-center">Rating ⭐</th>
                                    <th className="text-center">Comment</th>
                                    <th className="text-center">Date</th>
                                    <th className="text-center">Actions</th>
                                </tr>
                            </thead>

                            <tbody className="dark:text-gray-300">
                                {reviews.map((review, index) => (
                                    <tr
                                        key={review._id}
                                        className="hover:bg-gray-50 dark:hover:bg-gray-700/40 transition"
                                    >
                                        <td className="text-center">{index + 1}</td>

                                        <td className="font-semibold text-center">
                                            {review.mealName}
                                        </td>

                                        <td className="text-center">
                                            <span className="badge badge-warning">
                                                {review.ratings}
                                            </span>
                                        </td>

                                        <td className="max-w-xs truncate text-center">
                                            {review.review}
                                        </td>

                                        <td className="text-center">
                                            {new Date(review.date).toLocaleDateString()}
                                        </td>

                                        <td className="flex gap-2 justify-center">
                                            <button
                                                onClick={() => handleDelete(review._id)}
                                                className="btn btn-sm text-red-500"
                                            >
                                                Delete
                                            </button>

                                            <button
                                                onClick={() =>
                                                    handleUpdate(
                                                        review._id,
                                                        review.review,
                                                        review.ratings
                                                    )
                                                }
                                                className="btn btn-sm text-green-500"
                                            >
                                                Update
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            )}

            {/* UPDATE MODAL */}
            <dialog ref={updateModalRef} className="modal modal-bottom sm:modal-middle">
                <div className="modal-box
                    bg-white dark:bg-gray-800
                    text-gray-800 dark:text-gray-200">

                    <h3 className="font-bold text-lg mb-4">
                        Update Your Review
                    </h3>

                    <form onSubmit={handleUpdateReview} className="space-y-4">

                        <div>
                            <label className="label font-semibold">Rating</label>
                            <select
                                value={currentReview.rating}
                                onChange={(e) =>
                                    setCurrentReview({
                                        ...currentReview,
                                        rating: e.target.value,
                                    })
                                }
                                className="select select-bordered w-full
                                    bg-white dark:bg-gray-700
                                    dark:border-gray-600"
                                required
                            >
                                <option value="">Select rating</option>
                                <option value="1">⭐</option>
                                <option value="2">⭐⭐</option>
                                <option value="3">⭐⭐⭐</option>
                                <option value="4">⭐⭐⭐⭐</option>
                                <option value="5">⭐⭐⭐⭐⭐</option>
                            </select>
                        </div>

                        <div>
                            <label className="label font-semibold">Comment</label>
                            <textarea
                                value={currentReview.comment}
                                onChange={(e) =>
                                    setCurrentReview({
                                        ...currentReview,
                                        comment: e.target.value,
                                    })
                                }
                                className="textarea textarea-bordered w-full
                                    bg-white dark:bg-gray-700
                                    dark:border-gray-600"
                                rows="4"
                                required
                            />
                        </div>

                        <div className="modal-action">
                            <button type="submit" className="btn btn-primary">
                                Update Review
                            </button>

                            <button
                                type="button"
                                onClick={() => updateModalRef.current.close()}
                                className="btn dark:bg-gray-700 dark:text-white"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </dialog>
        </div>
    );
};

export default MyReviewsPage;