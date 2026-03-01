import { Link, useLocation, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import axios from "axios";
import useAuth from "../../hooks/useAuth/useAuth";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure/useAxiosSecure";
import { useState } from "react";
import SignUpLoading from "../../components/SignUpLoading/SignUpLoading";
import { IoEyeOutline } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa";
import SocialLogIn from "./SocialLogIn";

const SignUp = () => {
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { createUser, updateUser } = useAuth();
  const password = watch("password");
  const location = useLocation();

  const handleSignUp = (data) => {
    setLoading(true);

    const profileImg = data.photo[0];
    const formData = new FormData();
    formData.append("image", profileImg);

    axios
      .post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMG_API_HOST}`,
        formData
      )
      .then((res) => {
        const photoUrl = res.data.data.url;

        const newUser = {
          name: data.name,
          email: data.email,
          photoUrl,
          address: data.address,
          status: "active",
          role: "user",
        };

        createUser(data.email, data.password).then(() => {
          axiosSecure.post("/users", newUser).then((res) => {
            if (res.data.insertedId) {
              const userProfile = {
                displayName: data.name,
                photoUrl,
              };

              updateUser(userProfile).then(() => {
                navigate(location?.state || "/");
                setLoading(false);

                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "User Sign Up Successfully",
                  showConfirmButton: false,
                  timer: 1500,
                });
              });
            }
          });
        });
      });
  };

  if (loading) return <SignUpLoading />;

  return (
    <div className="w-11/12 mx-auto flex justify-center items-center min-h-screen
    bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <title>Sign Up - LocalBazaar</title>

      <div
        className="w-full max-w-md p-8 rounded-2xl shadow-xl
        bg-white dark:bg-gray-800
        text-gray-800 dark:text-gray-100"
      >
        <h1 className="text-4xl font-bold mb-2 text-center">
          Create an Account
        </h1>
        <p className="mb-6 text-center text-gray-500 dark:text-gray-400">
          Sign Up with LocalBazaar
        </p>

        <form onSubmit={handleSubmit(handleSignUp)}>
          <fieldset className="space-y-4">
            {/* Name */}
            <div>
              <label className="label-text">Name</label>
              <input
                {...register("name", { required: true })}
                type="text"
                placeholder="Your Name"
                className="w-full mt-1 px-4 py-2 rounded-lg border
                bg-white dark:bg-gray-700
                border-gray-300 dark:border-gray-600
                focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  Name is required
                </p>
              )}
            </div>

            {/* Photo */}
            <div>
              <label className="label-text">Photo</label>
              <input
                {...register("photo", { required: true })}
                type="file"
                className="w-full mt-1 file:px-4 file:py-2
                file:border-0 file:rounded-lg
                file:bg-primary file:text-white
                bg-white dark:bg-gray-700
                border border-gray-300 dark:border-gray-600 rounded-lg"
              />
              {errors.photo && (
                <p className="text-red-500 text-sm mt-1">
                  Photo is required
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="label-text">Email</label>
              <input
                {...register("email", { required: true })}
                type="email"
                placeholder="Email"
                className="w-full mt-1 px-4 py-2 rounded-lg border
                bg-white dark:bg-gray-700
                border-gray-300 dark:border-gray-600
                focus:ring-2 focus:ring-primary outline-none"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  Email is required
                </p>
              )}
            </div>

            {/* Address */}
            <div>
              <label className="label-text">Address</label>
              <input
                {...register("address", { required: true })}
                type="text"
                placeholder="Your Address"
                className="w-full mt-1 px-4 py-2 rounded-lg border
                bg-white dark:bg-gray-700
                border-gray-300 dark:border-gray-600
                focus:ring-2 focus:ring-primary outline-none"
              />
              {errors.address && (
                <p className="text-red-500 text-sm mt-1">
                  Address is required
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="label-text">Password</label>
              <div className="relative mt-1">
                <input
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                    pattern: {
                      value:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{6,}$/,
                      message:
                        "Must contain uppercase, lowercase, number & symbol",
                    },
                  })}
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="w-full px-4 py-2 rounded-lg border
                  bg-white dark:bg-gray-700
                  border-gray-300 dark:border-gray-600
                  focus:ring-2 focus:ring-primary outline-none"
                />
                {showPassword ? (
                  <FaRegEyeSlash
                    onClick={() => setShowPassword(false)}
                    className="absolute right-3 top-3 cursor-pointer"
                  />
                ) : (
                  <IoEyeOutline
                    onClick={() => setShowPassword(true)}
                    className="absolute right-3 top-3 cursor-pointer"
                  />
                )}
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="label-text">Confirm Password</label>
              <div className="relative mt-1">
                <input
                  {...register("confirmPassword", {
                    required: "Confirm Password is required",
                    validate: (value) =>
                      value === password || "Passwords do not match",
                  })}
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  className="w-full px-4 py-2 rounded-lg border
                  bg-white dark:bg-gray-700
                  border-gray-300 dark:border-gray-600
                  focus:ring-2 focus:ring-primary outline-none"
                />
                {showConfirmPassword ? (
                  <FaRegEyeSlash
                    onClick={() => setShowConfirmPassword(false)}
                    className="absolute right-3 top-3 cursor-pointer"
                  />
                ) : (
                  <IoEyeOutline
                    onClick={() => setShowConfirmPassword(true)}
                    className="absolute right-3 top-3 cursor-pointer"
                  />
                )}
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-2 rounded-lg font-semibold text-white
              bg-primary hover:opacity-90 transition"
            >
              Sign Up
            </button>
          </fieldset>
        </form>

        <Link
          to="/auth/login"
          className="block text-center mt-6 text-primary hover:underline"
        >
          Already have an account? Login
        </Link>

        <div className="mt-6">
          <SocialLogIn />
        </div>
      </div>
    </div>
  );
};

export default SignUp;