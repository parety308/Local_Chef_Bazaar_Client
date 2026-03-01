import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router';
import Logo from '../Logo/Logo';
import useAuth from '../../hooks/useAuth/useAuth';
import Loading from '../Loading/Loading';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure/useAxiosSecure';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/firebase.init';

const Navbar = () => {

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const [logoutLoading, setLogoutLoading] = useState(false);

    /* ===============================
       🌙 DARK MODE STATE
    =============================== */
    const [theme, setTheme] = useState(
        localStorage.getItem("theme") || "light"
    );

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };

    /* ===============================
       LOGOUT
    =============================== */
    const handleLogOut = () => {
        setLogoutLoading(true);
        signOut(auth)
            .then(() => setLogoutLoading(false))
            .catch(err => {
                console.log(err);
                setLogoutLoading(false);
            });
    };

    /* ===============================
       USER ROLE QUERY
    =============================== */
    const { data: currentUser } = useQuery({
        queryKey: ['user', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users-role/${user?.email}`);
            return res.data;
        }
    });

    /* ===============================
       NAV LINKS
    =============================== */
    const links = (
        <>
            <li>
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        isActive
                            ? 'text-primary underline'
                            : 'text-base-content/70'
                    }
                >
                    Home
                </NavLink>
            </li>

            <li>
                <NavLink
                    to="/meals"
                    className={({ isActive }) =>
                        isActive
                            ? 'text-primary underline'
                            : 'text-base-content/70'
                    }
                >
                    Meals
                </NavLink>
            </li>

            <li>
                <NavLink
                    to="/about-us"
                    className={({ isActive }) =>
                        isActive
                            ? 'text-primary underline'
                            : 'text-base-content/70'
                    }
                >
                    About Us
                </NavLink>
            </li>

            {user && (
                <li>
                    <NavLink
                        to="/dashboard"
                        className={({ isActive }) =>
                            isActive
                                ? 'text-primary underline'
                                : 'text-base-content/70'
                        }
                    >
                        Dashboard
                    </NavLink>
                </li>
            )}
        </>
    );

    if (logoutLoading) return <Loading />;

    return (
        <div className="navbar bg-base-100 shadow-sm px-3 sticky top-0 z-50">

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

                    <ul className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow z-50">
                        {links}
                    </ul>
                </div>

                <Link to="/">
                    <Logo />
                </Link>
            </div>

            {/* -------- CENTER -------- */}
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal gap-10">
                    {links}
                </ul>
            </div>

            {/* -------- RIGHT -------- */}
            {user ? (
                <div className="navbar-end gap-4">

                    {/* Avatar Dropdown */}
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                            <img
                                src={currentUser?.photoUrl}
                                alt="user"
                                className="w-10 h-10 rounded-full"
                            />
                        </div>

                        <ul className="menu dropdown-content bg-base-100 rounded-box w-56 p-2 shadow z-10">

                            <li className="font-semibold">
                                <NavLink to="/dashboard/my-profile">
                                    Profile
                                </NavLink>
                            </li>

                            <li className="font-semibold">
                                <NavLink to="/dashboard">
                                    Dashboard
                                </NavLink>
                            </li>

                            {/* 🌙 DARK MODE TOGGLE */}
                            <li>
                                <button
                                    onClick={toggleTheme}
                                    className="flex justify-between items-center"
                                >
                                    Theme
                                    <span>
                                        {theme === "light"
                                            ? "🌙 Dark"
                                            : "☀️ Light"}
                                    </span>
                                </button>
                            </li>

                        </ul>
                    </div>

                    <button
                        onClick={handleLogOut}
                        className="btn btn-secondary"
                    >
                        Sign Out
                    </button>
                </div>
            ) : (
                <div className="navbar-end gap-3">
                    <Link to="/auth/login" className="btn btn-secondary">
                        Login
                    </Link>

                    <Link
                        to="/auth/signup"
                        className="btn btn-secondary hidden lg:flex"
                    >
                        Sign Up
                    </Link>
                </div>
            )}
        </div>
    );
};

export default Navbar;