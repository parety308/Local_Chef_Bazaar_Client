import React from 'react';
import useRole from '../../hooks/useRole/useRole';
import Loading from '../../components/Loading/Loading';
import AccessDenied from '../../pages/AccessDenied/AccessDenied';

const ChefRoute = ({ children }) => {
    const { role, isLoading } = useRole();

    if (isLoading) {
        return <Loading />;
    }

    if (role === 'chef') {
        return children;
    }

    return <AccessDenied />;
};

export default ChefRoute;