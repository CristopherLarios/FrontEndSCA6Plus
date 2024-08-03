import React from 'react'
import { StopOutlined,CheckCircleOutlined } from '@ant-design/icons';
import './index.css'

function IconBusqueda({ value, isFound }) {
    return (
        value != '' ?
            isFound == true ?
                <span className="circle">
                    <CheckCircleOutlined className='iconbusqueda-tr' />
                </span>
                :
                <span className="circle">
                    <StopOutlined className='iconbusqueda-f' />
                </span>
            :
            <span className="circle">
                <StopOutlined className='iconbusqueda-t' />
            </span>


    )
}

export default IconBusqueda