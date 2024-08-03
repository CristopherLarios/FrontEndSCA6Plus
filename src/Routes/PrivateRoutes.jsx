import { message } from 'antd';
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useDataContext } from '../Context/DataContext'
import { login, menu } from "./Path";

export default function PrivateRoutes({ allowroled }) {

    const { isAuth, datatoken } = useDataContext();
    const dataResposeToken = datatoken;


    const notpermission = () => {
        message.open({ key: 'notpermission', type: 'error', content: 'No Tiene Permiso' });
            return  <Navigate to={menu}></Navigate>;
    };

    return (
        !isAuth ?
            <Navigate to={login}></Navigate> :
            allowroled.includes(dataResposeToken?.result?.roleId) ?
                <Outlet /> :
                notpermission()
    );






}
