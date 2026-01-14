import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../../components/Navbar/Navbar';

const RootLayout = () => {
    return (
        <div>
            <Navbar />
            <h1 className="text-4xl">Root Layout</h1>
            <Outlet />

        </div>
    );
};

export default RootLayout;