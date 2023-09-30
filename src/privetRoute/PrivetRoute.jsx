import React, { useContext } from 'react';
import { Context } from '../Authentication/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';
import { Roller } from 'react-spinners-css';

const PrivetRoute = ({ children }) => {

    const { user, loading } = useContext(Context)
    const location = useLocation()

    if (loading) {
        return <Roller className='mt-48 block mx-auto' />
    }
    if (user) {
        return children
    }

    return <Navigate state={{ redi: location.pathname }} to='/signin' />

};

export default PrivetRoute;