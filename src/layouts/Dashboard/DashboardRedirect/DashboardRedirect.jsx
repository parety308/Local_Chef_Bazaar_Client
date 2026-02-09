import { Navigate } from "react-router";
import useRole from "../../../hooks/useRole/useRole";
import Loading from "../../../components/Loading/Loading";

const DashboardRedirect = () => {
    const { role, isLoading } = useRole();
    if (isLoading) return <Loading />
    if (role === 'admin') return <Navigate to="/dashboard/admin" />;
    if (role === 'chef') return <Navigate to="/dashboard/chef" />;
    return <Navigate to="/dashboard/user" />;
};

export default DashboardRedirect;
