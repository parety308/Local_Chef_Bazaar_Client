import React from 'react';
import Banner from '../../components/Banner/Banner';
import DailyMeals from '../../components/DailyMeals/DailyMeals';

const HomeLayout = () => {
    return (
        <div className='w-11/12 mx-auto my-10'>
            <div className='rounded-xl'> <Banner /></div>
            <div><DailyMeals /></div>
        </div>
    );
};

export default HomeLayout;