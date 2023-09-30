import React from 'react';

const Banner = () => {
    return (
        <section className=' bg-slate-100'>
            <div className=' flex justify-evenly items-center pt-14 w-[90%] mx-auto'>

                <div className='w-[46%] space-y-7'>
                    <h1 className='text-4xl tracking-wider font-bold'>Open new doors with $100 off Visual Bland.</h1>
                    <p className='text-xl text-gray-600 font-semibold'>Gain access to 6,100+ courses from world-class institutions like Google, Microsoft and more. Join the ranks of 1 in 4 learners who completed a Professional Certificate and got a new job. Source: 2023 Coursera Learner Outcome Report</p>
                    <div className='flex gap-4'>
                        <button className='btn bg-sky-400 font-semibold'>start free trail</button>
                        <button className='btn bg-sky-400'>Sevings Your money</button>
                    </div>
                </div>
                <img className='' src="https://i.ibb.co/72XCF6W/Smiling-Business-Man-Standing-PNG-Clipart.png"
                    alt="" />


            </div>
        </section>
    );
};

export default Banner;