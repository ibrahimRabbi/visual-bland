import React, { useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../Authentication/AuthContext';

const Navbar = () => {

    const ref = useRef(null)
    const {user} = useContext(Context)

    const searchHandler = () => {
        console.log('hello')
    }

     
    return (
        <div className='bg-slate-100'>

            <div className="navbar w-[90%] flex justify-between mx-auto py-4">
                {/* start */}
                <div className="">
                    <Link className="btn btn-ghost normal-case text-red-600 font-bold text-2xl"><span className='text-sky-500'>VISUAL</span> BLAND</Link>
                </div>

                {/* middle */}
                <div className="lg:w-[600px] px-5">
                    <div className="form-control hidden lg:block w-full">
                        <div className="input-group">
                            <input
                                type="text"
                                ref={ref}
                                placeholder="Search product...."
                                className="input  w-full input-bordered" />
                            <button onClick={searchHandler} className="btn bg-amber-500 btn-square">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* end */}
                <div className="">
                    {
                        user ? <div className='flex items-center gap-5'>
                            <ul>
                                <li className='font-semibold text-sm'><Link to='/dashboard'>DEASHBOARD</Link></li>
                            </ul>
                            <label tabIndex={0} className="btn btn-ghost btn-circle avatar ring-1">
                                <div className="w-10 rounded-full">
                                    <img src={user?.photoURL} />
                                </div>
                            </label>
                        </div>: <Link to='/signin' className='bg-sky-400 text-slate-200 p-2 hover:bg-sky-600 rounded-lg'>Sign In</Link>
                    }
                    
                </div> 
            </div>
        </div>
    );
};

export default Navbar;