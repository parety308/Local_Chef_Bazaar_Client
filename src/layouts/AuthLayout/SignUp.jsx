import { Link, useLocation, useNavigate } from "react-router";
import SocialLogIn from "./SocialLogIn";
import { useForm } from "react-hook-form";
import axios from "axios";
import useAuth from "../../hooks/useAuth/useAuth";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure/useAxiosSecure";
import { useState } from "react";
import SignUpLoading from "../../components/SignUpLoading/SignUpLoading";
import { IoEyeOutline } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa";

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
    const password = watch('password');
    const location = useLocation();
    const handleSignUp = (data) => {
        setLoading(true);
        const profileImg = data.photo[0];
        const formData = new FormData();
        formData.append('image', profileImg);
        axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMG_API_HOST}`, formData)
            .then(res => {
                const photoUrl = res.data.data.url;
                console.log(photoUrl, data);

                //create new user 
                const newUser = {
                    name: data.name,
                    email: data.email,
                    photoUrl,
                    address: data.address,
                    status: "active"
                };

                createUser(data.email, data.password)
                    .then(res => {

                        axiosSecure.post('/users', newUser)
                            .then(res => {
                                if (res.data.insertedId) {
                                    console.log('user created in database');
                                }
                            })
                            .catch(err => console.log(err));

                        const userProfile = {
                            displayName: data.name,
                            photoUrl: photoUrl
                        };

                        updateUser(userProfile)
                            .then(() => {
                                navigate(location?.state || "/");
                                setLoading(false)
                                Swal.fire({
                                    position: "top-end",
                                    icon: "success",
                                    title: "User Sign Up Successfully",
                                    showConfirmButton: false,
                                    timer: 1500
                                });
                            });
                    })
                    .catch(err => console.log(err));
            });

    }

    if (loading) {
        return <SignUpLoading />
    }
    return (
        <div className="w-10/12 flex justify-center items-center mx-auto">
            {/* Form */}
            <div className="w-100 bg-base-100 shadow-sm p-6 my-10 rounded-lg">
                <h1 className="text-4xl font-bold mb-2">Create an Account</h1>
                <p className="mb-6">Sign Up with ZapShift</p>

                <form onSubmit={handleSubmit(handleSignUp)}>
                    <fieldset className="fieldset space-y-3">
                        {/* Name */}
                        <label className="label">Name</label>
                        <input
                            {...register("name", { required: true })}
                            type="text"
                            className="input input-bordered w-full"
                            placeholder="Your Name"

                        />
                        {errors.name?.type === "required" && (
                            <p className="text-red-500">Name is required</p>
                        )}
                        {/* Photo */}
                        <label className="label">Photo</label>
                        <input
                            {...register("photo", { required: true })}
                            type="file"
                            className="file-input file-input-bordered w-full"
                        />
                        {errors.photo?.type === "required" && (
                            <p className="text-red-500">Photo is required</p>
                        )}
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
                        {/* Address */}
                        <label className="label">Address</label>
                        <input
                            {...register("address", { required: true })}
                            type="text"
                            className="input input-bordered w-full"
                            placeholder="Your Name"
                        />
                        {errors.address?.type === "required" && (
                            <p className="text-red-500">Address is required</p>
                        )}
                        {/* Password */}
                        <label className="label">Password</label>
                        <div className="flex items-center text-xl relative"> <input
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 6,
                                    message: "Password must be at least 6 characters"
                                },
                                pattern: {
                                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/,
                                    message:
                                        "Password must contain uppercase, lowercase, number, and special character"
                                }
                            })}

                            type={showPassword ? "text" : "password"}
                            className="input input-bordered w-full"
                            placeholder="Password"
                        />
                            {
                                !showPassword ? <IoEyeOutline onClick={() => setShowPassword(!showPassword)} className="absolute right-3" /> :
                                    <FaRegEyeSlash onClick={() => setShowPassword(!showPassword)} className="absolute right-3" />
                            }
                        </div>
                        {errors.password && (
                            <p className="text-red-500">{errors.password.message}</p>
                        )}
                        {/* Confirm password */}
                        <label className="label"> Confirm Password</label>
                        <div className="flex items-center text-xl relative">
                            <input
                                {...register("confirmPassword", {
                                    required: "Confirm Password is required",
                                    validate: value => value === password || "Passwords do not match"
                                })}
                                type={showConfirmPassword ? "text" : "password"}
                                className="input input-bordered w-full"
                                placeholder="Confirm Password"
                            />
                            {
                                !showConfirmPassword ? <IoEyeOutline onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3" /> :
                                    <FaRegEyeSlash onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3" />
                            }
                        </div>
                        {errors.confirmPassword && (
                            <p className="text-red-500">{errors.confirmPassword.message}</p>
                        )}

                        <button type="submit" className="btn bg-lime-300 w-full mt-4">
                            Sign Up
                        </button>

                        <SocialLogIn />
                    </fieldset>
                </form>

                <Link
                    to="/auth/login"
                    className="text-blue-500 text-center block mt-4"
                >
                    Already have an account? Login
                </Link>
            </div>

        </div>
    );
};

export default SignUp;
