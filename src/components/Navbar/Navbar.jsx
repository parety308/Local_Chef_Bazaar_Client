import { useState } from 'react';
import { Link, NavLink } from 'react-router';
import Logo from '../Logo/Logo';
import useAuth from '../../hooks/useAuth/useAuth';
import Loading from '../Loading/Loading';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure/useAxiosSecure';

const Navbar = () => {
    const { user, logOut } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [logoutLoading, setLogoutLoading] = useState(false);

    const handleLogOut = () => {
        setLogoutLoading(true);
        logOut()
            .then(() => setLogoutLoading(false))
            .catch(err => {
                console.log(err);
                setLogoutLoading(false);
            });
    };

    if (logoutLoading) return <Loading />;

    const { data: currentUser = null } = useQuery({
        queryKey: ['user', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users-role/${user.email}`);
            return res.data;
        }
    });

    const links = (
        <>
            <li>
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        isActive ? 'text-primary underline' : 'text-gray-500'
                    }
                >
                    Home
                </NavLink>
            </li>

            <li>
                <NavLink
                    to="/meals"
                    className={({ isActive }) =>
                        isActive ? 'text-primary underline' : 'text-gray-500'
                    }
                >
                    Meals
                </NavLink>
            </li>

            {user && (
                <li>
                    <NavLink
                        to="/dashboard"
                        className={({ isActive }) =>
                            isActive ? 'text-primary underline' : 'text-gray-500'
                        }
                    >
                        Dashboard
                    </NavLink>
                </li>
            )}
        </>
    );

    return (
        <div className="navbar bg-base-100 shadow-sm px-3">
            {/* -------- LEFT -------- */}
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16"
                            />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow z-50"
                    >
                        {links}
                    </ul>
                </div>
                <Logo />
            </div>

            {/* -------- CENTER -------- */}
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal gap-10">{links}</ul>
            </div>

            {/* -------- RIGHT -------- */}
            {user && currentUser ? (
                <div className="navbar-end gap-4">
                    {/* Avatar dropdown */}
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                            <img
                                src={currentUser?.photoUrl}
                                alt="user"
                                className="w-10 h-10 rounded-full"
                            />
                        </div>

                        <ul className="menu dropdown-content bg-base-100 rounded-box w-44 p-2 shadow z-1">
                            <li className='border-gray-300 font-semibold'>
                                <NavLink to="/dashboard/my-profile">Profile</NavLink>
                            </li>
                            <li className='border-gray-300 font-semibold'>
                                <NavLink to="/dashboard">Dashboard</NavLink>
                            </li>
                        </ul>
                    </div>

                    <button onClick={handleLogOut} className="btn btn-accent">
                        Sign Out
                    </button>
                </div>
            ) : (
                <div className="navbar-end gap-3">
                    <Link to="/auth/login" className="btn btn-primary">
                        Login
                    </Link>
                    <Link
                        to="/auth/signup"
                        className="btn btn-accent hidden lg:flex"
                    >
                        Sign Up
                    </Link>
                </div>
            )}
        </div>
    );
};

export default Navbar;
