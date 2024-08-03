import React from 'react'
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button, Tooltip } from "antd";
import './index.css'

export function BotonBack({ oncl,texTooltip }) {
    return (
        <div className='iconbackgroup'>
            <Tooltip placement='bottom' title={texTooltip} color='pink'>
                <Button className='learn-more' type="dashed" shape="round" onClick={oncl} >
                    <span className="circle" aria-hidden="true">
                        <ArrowLeftOutlined className='icon' />
                    </span>
                </Button>
            </Tooltip>

        </div>

    )
}
