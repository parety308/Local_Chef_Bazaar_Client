import React from 'react';
import logo from '../../assets/logo.png'
const Logo = () => {
    return (
        <div className='flex gap-4 items-center p-1 ml-5'>
            <img src={logo} className='w-12' alt="" />
            <h3 className="text-4xl  -ms-3 text-sky-800 logo ">LocalChef</h3>
        </div>
    );
};

export default Logo;