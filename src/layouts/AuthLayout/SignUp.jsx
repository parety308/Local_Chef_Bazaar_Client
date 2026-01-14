import { Link, useNavigate } from "react-router";
import SocialLogIn from "./SocialLogIn";
import { useForm } from "react-hook-form";
import axios from "axios";
import useAuth from "../../hooks/useAuth/useAuth";
import Swal from "sweetalert2";

const SignUp = () => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const { createUser } = useAuth();

    const handleSingUp = (data) => {
        const profileImg = data.photo[0];
        const formData = new FormData();
        formData.append('image', profileImg);
        axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMG_API_HOST}`, formData)
            .then(res => {
                const photoUrl = res.data.data.url;
                console.log(photoUrl, data);
                const newUser = {
                    displayName: data.name,
                    email: data.email,
                    photoUrl: photoUrl
                };
                createUser(data.email, data.password)
                    .then(res => {
                        navigate('/');
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "User Log In Successfully",
                            showConfirmButton: false,
                            timer: 1500
                        });
                        console.log(res.user);
                    })
                    .catch(err => console.log(err));

            });
        // console.log(data)
    }
    return (
        <div className="w-10/12 flex justify-center items-center mx-auto">
            {/* Form */}
            <div className="w-100 bg-base-100 shadow-sm p-6 my-10 rounded-lg">
                <h1 className="text-4xl font-bold mb-2">Create an Account</h1>
                <p className="mb-6">Sign Up with ZapShift</p>

                <form onSubmit={handleSubmit(handleSingUp)}>
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
                        {/* Password */}
                        <label className="label">Password</label>
                        <input
                            {...register("password", { required: true })}
                            type="password"
                            className="input input-bordered w-full"
                            placeholder="Password"
                        />
                        {errors.password?.type === "required" && (
                            <p className="text-red-500">Password is required</p>
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
