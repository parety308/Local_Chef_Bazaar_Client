import React from 'react';
import useAuth from '../../hooks/useAuth/useAuth';
import useRole from '../../hooks/useRole/useRole';
import AccessDenied from '../../pages/AccessDenied/AccessDenied';
import Loading from '../../components/Loading/Loading';

const AdminRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const { role, loading: roleLoading } = useRole();
    if (loading || roleLoading) {
        return <Loading />;
    }
    if (user && role === 'admin') {
        return children;
    }
    return <AccessDenied />;

};

export default AdminRoute;