import { Link, Outlet } from 'react-router';
import {
  MdCreateNewFolder,
  MdFavoriteBorder,
  MdOutlineReviews,
  MdOutlineShoppingCart,
} from 'react-icons/md';
import useRole from '../../hooks/useRole/useRole';
import { CgProfile } from 'react-icons/cg';
import { FaChartLine, FaHome, FaUserAstronaut } from 'react-icons/fa';
import { GiMeal } from 'react-icons/gi';
import { TbCalendarQuestion, TbUserQuestion } from 'react-icons/tb';
import Logo from '../../components/Logo/Logo';
import { RxDashboard } from 'react-icons/rx';

const Dashboard = () => {
  const { role } = useRole();

  return (
    <div className="drawer lg:drawer-open bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 min-h-screen">
      <title>Dashboard</title>

      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

      {/* ================= CONTENT ================= */}
      <div className="drawer-content">

        {/* Navbar */}
        <nav className="navbar w-full sticky top-0 z-50
          bg-white dark:bg-gray-800
          border-b border-gray-200 dark:border-gray-700
          shadow-sm">

          <label
            htmlFor="my-drawer-4"
            className="btn btn-square btn-ghost dark:text-gray-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeWidth="2"
              fill="none"
              stroke="currentColor"
              className="size-5"
            >
              <path d="M4 4h16v16H4z" />
              <path d="M9 4v16" />
              <path d="M14 10l2 2l-2 2" />
            </svg>
          </label>

          <div className="px-4 text-3xl font-semibold">
            <Logo />
          </div>
        </nav>

        {/* Page Content */}
        <div className="w-11/12 mx-auto py-6">
          <Outlet />
        </div>
      </div>

      {/* ================= SIDEBAR ================= */}
      <div className="drawer-side">
        <label htmlFor="my-drawer-4" className="drawer-overlay"></label>

        <div
          className="flex min-h-full flex-col
          bg-white dark:bg-gray-800
          border-r border-gray-200 dark:border-gray-700
          is-drawer-close:w-14 is-drawer-open:w-64
          transition-all duration-300"
        >
          <ul className="menu w-full grow gap-1">

            {/* Home */}
            <li>
              <Link
                to="/"
                className="hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              >
                <FaHome />
                 <span className='is-drawer-close:hidden'>Homepage</span>
              </Link>
            </li>

            {/* Dashboard */}
            <li>
              <Link
                to="/dashboard"
                className="hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              >
                <RxDashboard />
                 <span className='is-drawer-close:hidden'>Dashboard</span>
              </Link>
            </li>

            {/* Profile */}
            <li>
              <Link
                to="/dashboard/my-profile"
                className="hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              >
                <CgProfile />
                 <span className='is-drawer-close:hidden'>My Profile</span>
              </Link>
            </li>

            {/* USER MENU */}
            {role === 'user' && (
              <>
                <li>
                  <Link
                    to="/dashboard/my-orders"
                    className="hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                  >
                    <MdOutlineShoppingCart />
                     <span className='is-drawer-close:hidden'>My Orders</span>
                  </Link>
                </li>

                <li>
                  <Link
                    to="/dashboard/my-reviews"
                    className="hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                  >
                    <MdOutlineReviews />
                     <span className='is-drawer-close:hidden'>My Reviews</span>
                  </Link>
                </li>

                <li>
                  <Link
                    to="/dashboard/my-favorites"
                    className="hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                  >
                    <MdFavoriteBorder />
                     <span className='is-drawer-close:hidden'>Favourite Meal</span>
                  </Link>
                </li>
              </>
            )}

            {/* ADMIN MENU */}
            {role === 'admin' && (
              <>
                <li>
                  <Link
                    to="/dashboard/manage-users"
                    className="hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                  >
                    <FaUserAstronaut />
                     <span className='is-drawer-close:hidden'>Manage User</span>
                  </Link>
                </li>

                <li>
                  <Link
                    to="/dashboard/manage-requests"
                    className="hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                  >
                    <TbUserQuestion />
                     <span className='is-drawer-close:hidden'>Manage Request</span>
                  </Link>
                </li>

                <li>
                  <Link
                    to="/dashboard/platform-statistics"
                    className="hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                  >
                    <FaChartLine />
                     <span className='is-drawer-close:hidden'>Platform Statistics</span>
                  </Link>
                </li>
              </>
            )}

            {/* CHEF MENU */}
            {role === 'chef' && (
              <>
                <li>
                  <Link
                    to="/dashboard/create-meals"
                    className="hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                  >
                    <MdCreateNewFolder />
                     <span className='is-drawer-close:hidden'>Create Meal</span>
                  </Link>
                </li>

                <li>
                  <Link
                    to="/dashboard/my-meals"
                    className="hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                  >
                    <GiMeal />
                     <span className='is-drawer-close:hidden'>My Meals</span>
                  </Link>
                </li>

                <li>
                  <Link
                    to="/dashboard/order-request"
                    className="hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                  >
                    <TbCalendarQuestion />
                     <span className='is-drawer-close:hidden'>Order Requests</span>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;