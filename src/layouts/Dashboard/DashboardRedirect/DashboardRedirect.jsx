import { Navigate } from "react-router";
import useRole from "../../../hooks/useRole/useRole";

const DashboardRedirect = () => {
    const { role, roleLoading } = useRole();

    if (roleLoading) return null;

    if (role === 'admin') return <Navigate to="/dashboard/admin" />;
    if (role === 'chef') return <Navigate to="/dashboard/chef" />;
    return <Navigate to="/dashboard/user" />;
};

export default DashboardRedirect;
