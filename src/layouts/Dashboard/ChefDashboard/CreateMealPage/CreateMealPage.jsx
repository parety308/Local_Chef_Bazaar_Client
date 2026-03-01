import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../../hooks/useAuth/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure/useAxiosSecure";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";

const CreateMealPage = () => {
  const { register, handleSubmit, reset } = useForm();
  const { user } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const { data: currentUser = null } = useQuery({
    queryKey: ["user", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users-role/${user.email}`);
      return res.data;
    },
  });

  const onSubmit = async (data) => {
    try {
      const imageFile = data.mealImage?.[0];
      if (!imageFile) {
        Swal.fire("Error", "Please select an image", "error");
        return;
      }

      const formData = new FormData();
      formData.append("image", imageFile);

      const imgRes = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMG_API_HOST}`,
        formData
      );

      const foodImg = imgRes.data.data.url;

      const ingredientsArray = data.ingredients
        .split(",")
        .map((item) => item.trim());

      const newMeal = {
        foodName: data.foodName,
        chefName: data.chefName,
        chefId: data.chefId,
        userEmail: data.userEmail,
        foodImg,
        price: Number(data.price),
        rating: Number(data.rating),
        ingredients: ingredientsArray,
        estimatedDeliveryTime: Number(data.deliveryTime),
        chefExperience: Number(data.chefExperience),
        deliveryArea: currentUser?.address || "Not provided",
        createdAt: new Date(),
      };

      const res = await axiosSecure.post("/meals", newMeal);

      if (res.data.insertedId) {
        Swal.fire("Created!", "Your Meal is Created.", "success");
        reset();
        navigate("/dashboard/my-meals");
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Something went wrong!", "error");
    }
  };

  /* Fraud User Block */
  if (user.status === "fraud") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center 
      bg-red-50 dark:bg-red-950/40 p-10 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-red-600 dark:text-red-400 mb-4">
          🚫 Access Denied
        </h2>
        <p className="text-lg text-red-500 dark:text-red-300 mb-6">
          Your account has been marked as <strong>fraud</strong>.
          <br />
          You cannot create meals or access this page.
        </p>
        <p className="text-gray-700 dark:text-gray-300">
          Please contact <strong>support</strong> if you think this is a mistake.
        </p>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen py-12
      bg-gradient-to-r from-[#fef9f0] to-[#fff6f6]
      dark:from-gray-900 dark:to-gray-950"
    >
      <title>Create Meal | Chef Dashboard</title>

      <div
        className="max-w-5xl mx-auto rounded-3xl shadow-xl p-10 border
        bg-white border-gray-100
        dark:bg-gray-900 dark:border-gray-700"
      >
        {/* Header */}
        <h2 className="text-3xl font-bold text-center mb-8
        text-gray-800 dark:text-gray-100">
          🍽 Create a New Meal
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Food Name */}
          <div>
            <label className="label font-semibold text-gray-700 dark:text-gray-300">
              Food Name
            </label>
            <input
              type="text"
              {...register("foodName", { required: true })}
              placeholder="Ex: Chicken Biryani"
              className="input input-bordered w-full
              bg-white text-gray-800
              dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600
              focus:ring-2 focus:ring-orange-400"
            />
          </div>

          {/* Chef Name */}
          <div>
            <label className="label font-semibold text-gray-700 dark:text-gray-300">
              Chef Name
            </label>
            <input
              type="text"
              {...register("chefName")}
              defaultValue={user?.displayName}
              readOnly
              className="input input-bordered w-full
              bg-gray-100 dark:bg-gray-800
              text-gray-600 dark:text-gray-300 cursor-not-allowed"
            />
          </div>

          {/* Image */}
          <div>
            <label className="label font-semibold text-gray-700 dark:text-gray-300">
              Food Image
            </label>
            <input
              type="file"
              {...register("mealImage", { required: true })}
              className="file-input file-input-bordered w-full
              dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200"
            />
          </div>

          {/* Price */}
          <div>
            <label className="label font-semibold text-gray-700 dark:text-gray-300">
              Price ($)
            </label>
            <input
              type="number"
              {...register("price", { required: true })}
              placeholder="Ex: 12"
              className="input input-bordered w-full
              bg-white dark:bg-gray-800
              text-gray-800 dark:text-gray-100 dark:border-gray-600
              focus:ring-2 focus:ring-green-400"
            />
          </div>

          {/* Rating */}
          <div>
            <label className="label font-semibold text-gray-700 dark:text-gray-300">
              Rating
            </label>
            <select
              {...register("rating", { required: true })}
              className="select select-bordered w-full
              bg-white dark:bg-gray-800
              text-gray-800 dark:text-gray-100 dark:border-gray-600
              focus:ring-2 focus:ring-yellow-400"
            >
              <option value="">Select rating</option>
              {[1, 2, 3, 4, 5].map((i) => (
                <option key={i} value={i}>
                  {"⭐".repeat(i)} {i}
                </option>
              ))}
            </select>
          </div>

          {/* Ingredients */}
          <div>
            <label className="label font-semibold text-gray-700 dark:text-gray-300">
              Ingredients
            </label>
            <textarea
              {...register("ingredients", { required: true })}
              placeholder="Ex: Rice, Mutton, Potato"
              className="textarea textarea-bordered w-full
              bg-white dark:bg-gray-800
              text-gray-800 dark:text-gray-100 dark:border-gray-600
              focus:ring-2 focus:ring-pink-400"
            />
          </div>

          {/* Delivery Time */}
          <div>
            <label className="label font-semibold text-gray-700 dark:text-gray-300">
              Estimated Delivery Time (minutes)
            </label>
            <input
              type="number"
              {...register("deliveryTime")}
              className="input input-bordered w-full
              bg-white dark:bg-gray-800
              text-gray-800 dark:text-gray-100 dark:border-gray-600
              focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Experience */}
          <div>
            <label className="label font-semibold text-gray-700 dark:text-gray-300">
              Chef’s Experience (years)
            </label>
            <input
              type="number"
              {...register("chefExperience")}
              className="input input-bordered w-full
              bg-white dark:bg-gray-800
              text-gray-800 dark:text-gray-100 dark:border-gray-600
              focus:ring-2 focus:ring-purple-400"
            />
          </div>

          {/* Chef ID */}
          <div>
            <label className="label font-semibold text-gray-700 dark:text-gray-300">
              Chef ID
            </label>
            <input
              type="text"
              {...register("chefId")}
              defaultValue={currentUser?.chefId}
              className="input input-bordered w-full
              bg-gray-100 dark:bg-gray-800
              text-gray-600 dark:text-gray-300 cursor-not-allowed"
            />
          </div>

          {/* Email */}
          <div>
            <label className="label font-semibold text-gray-700 dark:text-gray-300">
              User Email
            </label>
            <input
              type="email"
              {...register("userEmail")}
              defaultValue={currentUser?.email}
              readOnly
              className="input input-bordered w-full
              bg-gray-100 dark:bg-gray-800
              text-gray-600 dark:text-gray-300 cursor-not-allowed"
            />
          </div>

          {/* Submit */}
          <div className="md:col-span-2 text-center mt-6">
            <button
              className="btn px-10 py-3 text-lg font-semibold rounded-full
              text-white shadow-lg transition-all
              bg-gradient-to-r from-orange-400 to-pink-500
              hover:from-pink-500 hover:to-orange-400
              dark:from-orange-500 dark:to-pink-600"
            >
              Create Meal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateMealPage;