import React from 'react';

const Banner = () => {
    return (
        <section className=' bg-slate-100'>
            <div className=' flex justify-evenly items-center lg:pt-14 py-14 lg:py-0 w-[90%] mx-auto'>

                <div className='lg:w-[46%] text-center lg:text-start space-y-7'>
                    <h1 className='text-4xl tracking-wider font-bold'>Open new doors with $100 off Visual Bland.</h1>
                    <p className='text-xl text-gray-600 font-semibold'>Gain access to 6,100+ courses from world-class institutions like Google, Microsoft and more. Join the ranks of 1 in 4 learners who completed a Professional Certificate and got a new job. Source: 2023 Coursera Learner Outcome Report</p>
                    <div className='lg:flex space-x-4 text-center lg:gap-4'>
                        <button className='btn bg-sky-400 font-semibold'>start free trail</button>
                        <button className='btn bg-sky-400'>Sevings Your money</button>
                    </div>
                </div>
                <img className='hidden lg:block' src="https://i.ibb.co/72XCF6W/Smiling-Business-Man-Standing-PNG-Clipart.png"
                    alt="" />


            </div>
        </section>
    );
};

export default Banner;