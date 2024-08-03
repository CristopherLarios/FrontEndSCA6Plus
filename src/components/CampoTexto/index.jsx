import React from "react";
import { Form, Input, Button, Typography, Divider, Image } from "antd";
import "./index.css"


//pasa como parametro el placeHolder que queremos que se vea y el Name del ForItem
export function CampoTexto(props) {
  const { ph, nm, onChange, value, type, disabled } = props;
  return (
    <Form.Item>
      <div className="inputGroup">
        <Input className="campoTexto" type={type} placeholder={ph} name={nm} onChange={onChange} value={value} disabled={disabled} />
        <label className={value?.length > 0 ? "is-fill" : undefined} htmlFor="campoTexto">{ph}</label>
      </div>
    </Form.Item>



  )
}