import React, { useState } from 'react';
import { Link, NavLink } from 'react-router';
import Logo from '../Logo/Logo';
import useAuth from '../../hooks/useAuth/useAuth';
import Loading from '../Loading/Loading';

const Navbar = () => {
    const { user, logOut } = useAuth();
    const [loading, setLoading] = useState(false);
    const handleLogOut = () => {
        setLoading(true);
        logOut().then(() => {
            setLoading(false);
        })
            .catch(err => console.log(err));
    }
    if (loading) {
        return <Loading />
    }

    const links = <>
        <li>
            <NavLink
                to='/'
                className={({ isActive }) =>
                    isActive ? "text-primary underline" : "text-gray-500"
                }
            >
                Home
            </NavLink>
        </li>

        <li>
            <NavLink
                to='/meals'
                className={({ isActive }) =>
                    isActive ? "text-primary underline" : "text-gray-500"
                }
            >
                Meals
            </NavLink>
        </li>

        {user && (
            <li>
                <NavLink 
                    to='/dashboard'
                    className={({ isActive }) =>
                        isActive ? "text-primary underline" : "text-gray-500"
                    }
                >
                    Dashboard
                </NavLink>
            </li>
        )}
    </>

    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex="-1"
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 lg:p-2 shadow">
                        {
                            links
                        }
                    </ul>
                </div>
                <Logo />
            </div>
            <div className="navbar-start hidden lg:flex">
                <ul className="menu menu-horizontal px-1 gap-10">
                    {
                        links
                    }
                </ul>
            </div>
            {
                user ? (
                    <div className="navbar-end gap-5 mr-5">
                        <img src={user?.photoUrl} className='w-10 h-10 rounded-full' alt="" />
                        <button onClick={handleLogOut} className="btn btn-accent">
                            Sign Out
                        </button>
                    </div>
                ) : (
                    <div className="navbar-end gap-5 lg:mr-5 ">
                        <Link to="/auth/login" className="btn btn-primary">Login</Link>
                        <Link to="/auth/signup" className="btn btn-accent hidden lg:flex md:flex">Sign Up</Link>
                    </div>
                )
            }

        </div>
    );
};

export default Navbar;