import React from 'react';
import { Link, Outlet } from 'react-router';
import useAuth from '../../hooks/useAuth/useAuth';
import AdminDashboard from './AdminDashboard/AdminDashboard';
import ChefDashboard from './ChefDashboard/ChefDashboard';
import UserDashboard from './UserDashboard/UserDashboard';
import { MdCreateNewFolder, MdFavoriteBorder, MdOutlineReviews, MdOutlineShoppingCart } from 'react-icons/md';
import useRole from '../../hooks/useRole/useRole';
import { CgProfile } from 'react-icons/cg';
import { FaUserAstronaut } from 'react-icons/fa';
import { CiSquareQuestion } from 'react-icons/ci';
import { GiMeal } from 'react-icons/gi';
import { TbCalendarQuestion, TbUserQuestion } from 'react-icons/tb';
import Logo from '../../components/Logo/Logo';
import { RxDashboard } from 'react-icons/rx';

const Dashboard = () => {
    // const { user } = useAuth();
    const { role } = useRole();
    // console.log(role);
    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                {/* Navbar */}
                <nav className="navbar w-full bg-base-300">
                    <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost">
                        {/* Sidebar toggle icon */}
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path><path d="M9 4v16"></path><path d="M14 10l2 2l-2 2"></path></svg>
                    </label>
                    <div className="px-4 text-3xl font-semibold"><Logo /></div>
                </nav>
                {/* Page content here */}
                <div className='w-11/12 mx-auto'>
                    <Outlet />
                </div>
            </div>

            <div className="drawer-side is-drawer-close:overflow-visible">
                <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
                    {/* Sidebar content here */}
                    <ul className="menu w-full grow">
                        {/* List item */}
                        <li>
                            <Link to='/' className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Homepage">
                                {/* Home icon */}
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>
                                <span className="is-drawer-close:hidden">Homepage</span>
                            </ Link>
                        </li>
                        <li>
                            <Link to='/dashboard' className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="DashBoard">
                                <RxDashboard/>
                                <span className="is-drawer-close:hidden">DashBoard</span>
                            </Link>
                        </li>
                        <li>
                            <Link to='/dashboard/my-profile' className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="My Profile">
                                <CgProfile />
                                <span className="is-drawer-close:hidden">My Profile</span>
                            </Link>
                        </li>

                        {/* User List Items */}

                        {
                            role == 'user' &&
                            <li>
                                <Link to='/' className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="My Orders">
                                    <MdOutlineShoppingCart />
                                    <span className="is-drawer-close:hidden">My Orders</span>
                                </Link>
                            </li>
                        }
                        {
                            role == 'user' &&
                            <li>
                                <Link to='/' className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="My Reviews">
                                    <MdOutlineReviews />
                                    <span className="is-drawer-close:hidden">My Reviews</span>
                                </Link>
                            </li>
                        }

                        {
                            role == 'user' &&
                            <li>
                                <Link to='/' className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Favourite Meal">
                                    <MdFavoriteBorder />
                                    <span className="is-drawer-close:hidden">Favourite Meal</span>
                                </Link>
                            </li>
                        }

                        {/* Admin Lists */}
                        {
                            role == 'admin' &&
                            <li>
                                <Link to='/' className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Manage User">
                                    <FaUserAstronaut />
                                    <span className="is-drawer-close:hidden">Manage User</span>
                                </Link>
                            </li>
                        }
                        {
                            role == 'admin' && <li>
                                <Link to='/' className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Mange request">
                                    <TbUserQuestion />
                                    <span className="is-drawer-close:hidden">Mange request</span>
                                </Link>
                            </li>
                        }

                        {/* Chef Related Lists */}
                        {
                            role == 'chef' &&
                            <li>
                                <Link to='/' className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Create meal">
                                    <MdCreateNewFolder />
                                    <span className="is-drawer-close:hidden">Create meal</span>
                                </Link>
                            </li>
                        }
                        {
                            role == 'chef' && <li>
                                <Link to='/' className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="My Meals">
                                    <GiMeal />
                                    <span className="is-drawer-close:hidden">My Meals</span>
                                </Link>
                            </li>
                        }
                        {
                            role == 'chef' && <li>
                                <Link to='/' className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Order requests">
                                    <TbCalendarQuestion />
                                    <span className="is-drawer-close:hidden">Order requests</span>
                                </Link>
                            </li>
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;