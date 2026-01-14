import { Link, useNavigate } from "react-router";
import SocialLogIn from "./SocialLogIn";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth/useAuth";
import Swal from "sweetalert2";

const Login = () => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();
    const { logInUser } = useAuth();
    const handleLogIn = (data) => {

        logInUser(data.email, data.password)
            .then(res => {
                navigate('/')
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "User Log In Successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
                console.log(res.user)
            })
            .catch(err => console.log(err));

    }
    return (
        <div className="w-10/12 flex justify-center items-center mx-auto">
            {/* Form */}
            <div className="w-100 flex flex-col justify-center bg-base-100 shadow-sm p-6 my-10 rounded-lg">
                <h1 className="text-5xl font-bold mb-2">Welcome Back</h1>
                <p className="mb-6">Login with ZapShift</p>

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
                        <input
                            {...register("password", { required: true })}
                            type="password"
                            className="input input-bordered w-full"
                            placeholder="Password"
                        />
                        {errors.password?.type === "required" && (
                            <p className="text-red-500">Password is required</p>
                        )}

                        <div>
                            <a className="link link-hover text-sm">Forgot password?</a>
                        </div>

                        <button className="btn bg-lime-300 w-full mt-4">
                            Login
                        </button>

                        <SocialLogIn />
                    </fieldset>
                </form>

                <Link
                    to="/auth/signup"
                    className="text-center text-blue-400 mt-4 link link-hover"
                >
                    Have no account? Go to signup
                </Link>
            </div>
        </div>
    );
};

export default Login;
