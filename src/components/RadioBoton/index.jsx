import React from 'react'
import { Radio, Space } from 'antd';
import './index.css'


export function RadioBoton({className,title,content1,content2,onChange,value}) {

    return (
        <div>
            <Radio.Group className={className} onChange={onChange} value={value}>
                <Space direction='vertical'>
                    <span className='Title'>{title}</span>
                    <Radio value={content1} className='Radio1' >{content1}</Radio>
                    <Radio value={content2} className='Radio2' >{content2}</Radio>
                </Space>
            </Radio.Group>
        </div>
    )
}
