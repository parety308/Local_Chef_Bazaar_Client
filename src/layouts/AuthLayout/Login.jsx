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
    const email = watch('email');
    const handleLogIn = (data) => {
        setLoading(true);
        logInUser(data.email, data.password)
            .then(res => {
                navigate(location?.state || "/");
                setLoading(false);
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "User Log In Successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
            })
            .catch(err => {
                setLoading(false);
                Swal.fire({
                    icon: "error",
                    title: "Login Failed",
                    text: err.message
                });
            });


    }
    const handleForgetPassword = () => {
        forgetPassword(email)
            .then(() => {

            })
            .catch(err => console.log(err));
    }
    if (loading) {
        return <LogInLoader />
    }
    return (
        <div className="w-10/12 flex justify-center items-center mx-auto">
            <title>Login - LocalBazaar</title>
            {/* Form */}
            <div className="w-100 flex flex-col justify-center bg-base-100 shadow-sm p-6 my-10 rounded-lg">
                <h1 className="text-5xl font-bold mb-2">Welcome Back</h1>
                <p className="mb-6">Login with LocalBazaar</p>

                <form onSubmit={handleSubmit(handleLogIn)}>
                    <fieldset className="fieldset space-y-3">
                        {/* Email */}
                        <label className="label">Email</label>
                        <input
                            {...register("email", { required: true })}
                            type="email"
                            className="input input-bordered w-full"
                            placeholder="Email"
                        />
                        {errors.email?.type === "required" && (
                            <p className="text-red-500">Email is required</p>
                        )}

                        {/* Password */}
                        <label className="label">Password</label>
                        <div className="flex items-center text-xl relative"> <input
                            {...register("password", { required: true })}
                            type={showPassword ? "text" : "password"}
                            className="input input-bordered w-full"
                            placeholder="Password"
                        />
                            {
                                !showPassword ? <IoEyeOutline onClick={() => setShowPassword(!showPassword)} className="absolute right-3" /> :
                                    <FaRegEyeSlash onClick={() => setShowPassword(!showPassword)} className="absolute right-3" />
                            }
                        </div>
                        {errors.password?.type === "required" && (
                            <p className="text-red-500">Password is required</p>
                        )}

                        <button type="button" onClick={handleForgetPassword}>
                            <a className="link link-hover text-sm">Forgot password?</a>
                        </button>

                        <button className="btn bg-lime-300 w-full mt-4">
                            Login
                        </button>
                    </fieldset>
                </form>

                <Link
                    to="/auth/signup"
                    className="text-center text-blue-400 mt-4 link link-hover"
                >
                    Have no account? Go to signup
                </Link>
                <SocialLogIn />
            </div>

        </div>
    );
};

export default Login;
