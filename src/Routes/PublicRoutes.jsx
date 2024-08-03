import React from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import { useDataContext } from '../Context/DataContext'
import { menu } from './Path';

export default function PublicRoutes() {

    const { isAuth } = useDataContext();

    if (isAuth) {
        return <Navigate to={menu}></Navigate>
    }

    return (
        <Outlet />
    )
}
