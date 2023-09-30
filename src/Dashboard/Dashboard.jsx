import React, { useContext } from 'react';
import { Context } from '../Authentication/AuthContext';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { FaHome, FaSignOutAlt, FaUserGraduate } from 'react-icons/fa'
import { BiSolidBookReader, BiBookAdd } from 'react-icons/bi'
import { BsBookmarkHeartFill } from 'react-icons/bs'
import { useUserQuery } from '../redux/API/baseApi';
import { Roller } from 'react-spinners-css';
 
const Dashboard = () => {
    const { signout,user } = useContext(Context)
    const navigate = useNavigate()
     
    const {data=null} = useUserQuery(user?.email)
 

    const signoutHandler = () => {
        signout()
        localStorage.removeItem('token')
        navigate('/')
    }

    if (!data) {
        return <Roller className='mt-48 block mx-auto' />
    }


    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center justify-center">
               <Outlet/>
                <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>

            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu p-4 text-lg font-semibold w-80 min-h-full bg-base-200 text-base-content">
                    <li> <Link className="btn btn-ghost normal-case text-red-600 font-bold text-2xl"><span className='text-sky-500'>VISUAL</span> BLAND</Link></li>
                    <li className='mt-8'><Link to='/'><FaHome /> Home</Link></li>
                    {
                        data?.role == 'mentor' ? <div>
                            <li><Link to='addcourse'><BiBookAdd/> Add Course</Link></li>
                            <li><Link to='mycourse'><FaUserGraduate/> My Course</Link></li>
                             
                        </div> : <div>
                            <li><Link to='myclass'> <BiSolidBookReader />My Classes</Link></li>
                            <li><Link to='savecourse'><BsBookmarkHeartFill /> Save Courses</Link></li>
                        </div>
                    }
                    <li><button className='mx-auto px-16 text-sm bg-sky-500 mt-10' onClick={signoutHandler}>Sign Out <FaSignOutAlt/></button></li>
                </ul>
            </div>
        </div>
    );
};

export default Dashboard;