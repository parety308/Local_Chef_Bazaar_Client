import React from 'react';
import useAuth from '../../hooks/useAuth/useAuth';
import { Navigate, useLocation } from 'react-router';
import Loading from '../../components/Loading/Loading';

const PrivateRoutes = ({ children }) => {
    const { user, loading } = useAuth();
    const loaction = useLocation();
    if (loading) {
        return <Loading />
    }
    if (!user) {
        return <Navigate to="/auth/login" state={loaction.pathname} />;
    }
    return children;
};

export default PrivateRoutes;