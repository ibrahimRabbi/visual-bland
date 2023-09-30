import React from 'react';

const Title = ({title}) => {
    return (
        <div className='uppercase text-sky-500 text-3xl font-semibold lg:w-[30%] w-[70%] text-center mx-auto'>
            <h1>{title}</h1>
            <hr className='mt-2' />
        </div>
    );
};

export default Title;