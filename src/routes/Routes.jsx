import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout/RootLayout";
import HomeLayout from "../layouts/HomeLayout/HomeLayout";
import AuthLayout from "../layouts/AuthLayout/AuthLayout";
import Login from "../layouts/AuthLayout/Login";
import SignUp from "../layouts/AuthLayout/SignUp";
import Dashboard from "../layouts/Dashboard/Dashboard";
import MealsPage from "../pages/MealsPage/MealsPage";

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
        Component: Dashboard,
        children: [
            {
                // path:'/dashboard/'
            }
        ]
    }
]);