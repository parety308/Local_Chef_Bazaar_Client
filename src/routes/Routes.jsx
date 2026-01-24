import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout/RootLayout";
import HomeLayout from "../layouts/HomeLayout/HomeLayout";
import AuthLayout from "../layouts/AuthLayout/AuthLayout";
import Login from "../layouts/AuthLayout/Login";
import SignUp from "../layouts/AuthLayout/SignUp";
import Dashboard from "../layouts/Dashboard/Dashboard";
import MealsPage from "../pages/MealsPage/MealsPage";
import PrivateRoutes from "./PrivateRoutes/PrivateRoutes";
import MealDetails from "../pages/MealDetails/MealDetails";
import UserDashboard from "../layouts/Dashboard/UserDashboard/UserDashboard";
import AdminDashboard from "../layouts/Dashboard/AdminDashboard/AdminDashboard";
import ChefDashboard from "../layouts/Dashboard/ChefDashboard/ChefDashboard";
import DashboardRedirect from "../layouts/Dashboard/DashboardRedirect/DashboardRedirect";
import OrderForm from "../pages/OrderForm/OrderForm";
import MyOrderPage from "../layouts/Dashboard/UserDashboard/MyOrderPage/MyOrderPage";
import MyReviewsPage from "../layouts/Dashboard/UserDashboard/MyReviewsPage/MyReviewsPage";
import MyFavouriteMeal from "../layouts/Dashboard/UserDashboard/MyFavouriteMeal/MyFavouriteMeal";
import MyProfilePage from "../layouts/Dashboard/MyProfilePage";
import CreateMealPage from "../layouts/Dashboard/ChefDashboard/CreateMealPage/CreateMealPage";
import MyMealsPage from "../layouts/Dashboard/ChefDashboard/MyMealsPage/MyMealsPage";
import OrderRequest from "../layouts/Dashboard/ChefDashboard/OrderRequest/OrderRequest";

export const router = createBrowserRouter([
    {
        path: '/',
        Component: RootLayout,
        children: [
            {
                index: true,
                Component: HomeLayout
            },
            {
                path: '/meals',
                Component: MealsPage
            },
            {
                path: '/meal-details/:id',
                element: <PrivateRoutes><MealDetails /></PrivateRoutes>
            },
            {
                path: '/order/:id',
                element: <PrivateRoutes><OrderForm /></PrivateRoutes>
            }
        ]
    },
    {
        path: "/auth",
        Component: AuthLayout,
        children: [
            {
                path: "/auth/login",
                Component: Login
            },
            {
                path: '/auth/signup',
                Component: SignUp
            }
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoutes><Dashboard /></PrivateRoutes>,
        children: [
            {
                index: true,
                Component: DashboardRedirect
            }
            ,
            {
                path: 'user',
                element: <UserDashboard />
            },
            {
                path: 'admin',
                element: <AdminDashboard />
            },
            {
                path: 'chef',
                element: <ChefDashboard />
            },
            // User Lists
            {
                path: '/dashboard/my-orders',
                Component: MyOrderPage
            },
            {
                path: '/dashboard/my-favorites',
                Component: MyFavouriteMeal
            },
            {
                path: '/dashboard/my-reviews',
                Component: MyReviewsPage
            },
            {
                path: '/dashboard/my-profile',
                Component: MyProfilePage
            },

            //Chef Lists
            {
                path: '/dashboard/create-meals',
                Component: CreateMealPage
            },
            {
                path: '/dashboard/my-meals',
                Component: MyMealsPage
            },
            {
                path: '/dashboard/order-request',
                Component: OrderRequest
            }
        ]
    }
]);