import React from 'react';

const Title = ({title}) => {
    return (
        <div className='uppercase text-sky-500 text-3xl font-semibold w-[30%] text-center mx-auto'>
            <h1>{title}</h1>
            <hr className='mt-2' />
        </div>
    );
};

export default Title;