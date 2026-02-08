import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../../hooks/useAuth/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure/useAxiosSecure";
import axios from "axios";
import Swal from "sweetalert2";

const CreateMealPage = () => {
  const { register, handleSubmit, reset } = useForm();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const onSubmit = async (data) => {
    try {
      const {
        foodName,
        chefName,
        price,
        rating,
        ingredients,
        deliveryTime,
        chefExperience,
        chefId,
        userEmail,
        mealImage,
      } = data;

      // ✅ Image check
      const imageFile = mealImage?.[0];
      if (!imageFile) {
        Swal.fire("Error", "Please select an image", "error");
        return;
      }

      // ✅ Upload image to imgbb
      const formData = new FormData();
      formData.append("image", imageFile);

      const imgRes = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMG_API_HOST}`,
        formData
      );

      const mealImg = imgRes.data.data.url;

      // ✅ Ingredients → array
      const ingredientsArray = ingredients
        .split(",")
        .map((item) => item.trim());

      // ✅ Final meal object
      const newMeal = {
        mealName: foodName,
        chefName,
        chefId,
        userEmail,
        mealImg,
        price: Number(price),
        rating: Number(rating),
        ingredients: ingredientsArray,
        estimatedDeliveryTime: Number(deliveryTime),
        chefExperience: Number(chefExperience),
        createdAt: new Date(),
      };

      // ✅ Save to database
      const res = await axiosSecure.post("/meals", newMeal);

      if (res.data.insertedId) {
        Swal.fire("Created!", "Your Meal is Created.", "success");
        reset();
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Something went wrong!", "error");
    }
  };

  if (user.status === "fraud") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center bg-red-50 p-10 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-red-600 mb-4">🚫 Access Denied</h2>
        <p className="text-lg text-red-500 mb-6">
          Your account has been marked as <strong>fraud</strong>. <br />
          You cannot create meals or access this page.
        </p>
        <p className="text-gray-700">
          Please contact <strong>support</strong> if you think this is a mistake.
        </p>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow p-8">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Create New Meal
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Food Name */}
          <div>
            <label className="label font-semibold">Food Name</label>
            <input
              type="text"
              {...register("foodName", { required: true })}
              className="input input-bordered w-full"
            />
          </div>

          {/* Chef Name */}
          <div>
            <label className="label font-semibold">Chef Name</label>
            <input
              type="text"
              {...register("chefName")}
              defaultValue={user?.displayName}
              readOnly
              className="input input-bordered w-full bg-gray-100"
            />
          </div>

          {/* Food Image */}
          <div>
            <label className="label font-semibold">Food Image</label>
            <input
              type="file"
              {...register("mealImage", { required: true })}
              className="file-input file-input-bordered w-full"
            />
          </div>

          {/* Price */}
          <div>
            <label className="label font-semibold">Price ($)</label>
            <input
              type="number"
              {...register("price", { required: true })}
              className="input input-bordered w-full"
            />
          </div>

          {/* Rating */}
          <div>
            <label className="label font-semibold">Rating</label>
            <select
              {...register("rating", { required: true })}
              className="select select-bordered w-full"
            >
              <option value="">Select rating</option>
              <option value="1">⭐ 1</option>
              <option value="2">⭐⭐ 2</option>
              <option value="3">⭐⭐⭐ 3</option>
              <option value="4">⭐⭐⭐⭐ 4</option>
              <option value="5">⭐⭐⭐⭐⭐ 5</option>
            </select>
          </div>

          {/* Ingredients */}
          <div>
            <label className="label font-semibold">Ingredients</label>
            <textarea
              {...register("ingredients", { required: true })}
              placeholder="Rice, Mutton, Potato"
              className="textarea textarea-bordered w-full"
            />
          </div>

          {/* Delivery Time */}
          <div>
            <label className="label font-semibold">
              Estimated Delivery Time (minutes)
            </label>
            <input
              type="number"
              {...register("deliveryTime")}
              className="input input-bordered w-full"
            />
          </div>

          {/* Chef Experience */}
          <div>
            <label className="label font-semibold">
              Chef’s Experience (years)
            </label>
            <input
              type="number"
              {...register("chefExperience")}
              className="input input-bordered w-full"
            />
          </div>

          {/* Chef ID */}
          <div>
            <label className="label font-semibold">Chef ID</label>
            <input
              type="text"
              {...register("chefId")}
              defaultValue={user?.chefId}
              className="input input-bordered w-full bg-gray-100"
            />
          </div>

          {/* User Email */}
          <div>
            <label className="label font-semibold">User Email</label>
            <input
              type="email"
              {...register("userEmail")}
              defaultValue={user?.email}
              readOnly
              className="input input-bordered w-full bg-gray-100"
            />
          </div>

          {/* Submit */}
          <div className="md:col-span-2 text-center mt-6">
            <button type="submit" className="btn btn-primary px-10">
              Create Meal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateMealPage;
