import React from 'react';
import Navber from '../navbar/Navbar';
import Footer from '../Footer/Footer';
import { Outlet } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Layout = () => {
    return (
        <div>
            <Navber />
            <Outlet />
            <ToastContainer/>
            <Footer/>
         </div>
    );
};

export default Layout;