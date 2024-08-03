import React from 'react'
import { InputNumber } from 'antd';
import './index.css';

export default function CampoNum({um, min, max, ph, onChange, value,disabled}) {

    // const { um='aaa', min, max, ph, onChange, value,disabled } = props;
    return (
        <div className='inputgrouplabel'>
            <div className='inputGroupcamponum'>
                <InputNumber
                    className='campoNum'
                    addonBefore={um}
                    max={max}
                    min={min}
                    onChange={onChange}
                    value={value}
                    placeholder={ph}
                    disabled= {disabled}
                />  
            </div>
        </div>

    )
}
