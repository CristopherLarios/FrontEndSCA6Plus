import React from "react";
import { Form, Input, Button, Typography, Divider, Image } from "antd";
import "./index.css";

export function Boton({ cl, oncl, desc,className='botonInicio',disabled=false}) {
  return (
    <Button className={className} onClick={oncl} name={cl} type="primary" htmlType="submit" disabled={disabled} block>
      <span className="spanInicio">{desc}</span>
    </Button>
  );
}
