import { Link, useLocation, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth/useAuth";
import Swal from "sweetalert2";
import { useState } from "react";
import LogInLoader from "../../components/LogInLoader/LogInLoader";
import { IoEyeOutline } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa";
import SocialLogIn from "./SocialLogIn";

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const { logInUser, forgetPassword } = useAuth();
    const email = watch("email");

    const handleLogIn = (data) => {
        setLoading(true);
        logInUser(data.email, data.password)
            .then(() => {
                navigate(location?.state || "/");
                setLoading(false);
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "User Log In Successfully",
                    showConfirmButton: false,
                    timer: 1500,
                });
            })
            .catch((err) => {
                setLoading(false);
                Swal.fire({
                    icon: "error",
                    title: "Login Failed",
                    text: err.message,
                });
            });
    };

    const handleForgetPassword = () => {
        forgetPassword(email).catch((err) => console.log(err));
    };

    if (loading) return <LogInLoader />;

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
            <title>Login - LocalBazaar</title>

            <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-xl rounded-xl p-8 border border-gray-200 dark:border-gray-700">

                {/* Header */}
                <h1 className="text-4xl font-bold mb-2 text-gray-800 dark:text-white">
                    Welcome Back
                </h1>
                <p className="mb-6 text-gray-500 dark:text-gray-400">
                    Login with LocalBazaar
                </p>

                {/* Form */}
                <form onSubmit={handleSubmit(handleLogIn)}>
                    <fieldset className="space-y-4">

                        {/* Email */}
                        <div>
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Email
                            </label>
                            <input
                                {...register("email", { required: true })}
                                type="email"
                                placeholder="Email"
                                className="w-full mt-1 px-4 py-2 rounded-lg border
                                bg-white dark:bg-gray-700
                                text-gray-800 dark:text-white
                                border-gray-300 dark:border-gray-600
                                focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm mt-1">
                                    Email is required
                                </p>
                            )}
                        </div>

                        {/* Password */}
                        <div>
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Password
                            </label>

                            <div className="relative mt-1">
                                <input
                                    {...register("password", { required: true })}
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Password"
                                    className="w-full px-4 py-2 rounded-lg border
                                    bg-white dark:bg-gray-700
                                    text-gray-800 dark:text-white
                                    border-gray-300 dark:border-gray-600
                                    focus:outline-none focus:ring-2 focus:ring-primary"
                                />

                                {showPassword ? (
                                    <FaRegEyeSlash
                                        onClick={() => setShowPassword(false)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 dark:text-gray-300"
                                    />
                                ) : (
                                    <IoEyeOutline
                                        onClick={() => setShowPassword(true)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 dark:text-gray-300"
                                    />
                                )}
                            </div>

                            {errors.password && (
                                <p className="text-red-500 text-sm mt-1">
                                    Password is required
                                </p>
                            )}
                        </div>

                        {/* Forgot Password */}
                        <button
                            type="button"
                            onClick={handleForgetPassword}
                            className="text-sm text-primary hover:underline"
                        >
                            Forgot password?
                        </button>

                        {/* Login Button */}
                        <button
                            type="submit"
                            className="w-full py-2.5 rounded-lg font-semibold
                            bg-primary hover:opacity-90
                            text-white transition"
                        >
                            Login
                        </button>
                    </fieldset>
                </form>

                {/* Signup Link */}
                <Link
                    to="/auth/signup"
                    className="block text-center mt-5 text-primary hover:underline"
                >
                    Have no account? Go to signup
                </Link>

                {/* Social Login */}
                <div className="mt-6">
                    <SocialLogIn />
                </div>
            </div>
        </div>
    );
};

export default Login;