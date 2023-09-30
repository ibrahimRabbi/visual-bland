import React, { useEffect, useState } from 'react';
import Title from '../Ui/Title';
import CourseCard from './CourseCard';
import { useAllDataQuery } from '../redux/API/baseApi';

const PopularClass = () => {
    
    const {data=[],isLoading,refetch} = useAllDataQuery()
    
    return (
        <section className='my-28 w-[90%] mx-auto'>
            <Title title="populer courses" />
            <div className='grid lg:grid-cols-4 gap-10 mt-16'>
                {
                    data.map(v => <CourseCard key={v._id} data={v} />)
                }
           </div>
        </section>
    );
};

export default PopularClass;