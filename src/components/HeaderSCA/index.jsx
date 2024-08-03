import React from "react";
import { Form, Input, Button, Typography, Divider, Image } from "antd";

import "./index.css";

export function HeaderSCA({titulo}) {
  return (
    <header className="headerSCA">
      <div className="column">
        <Image
          className="logoAlcaldiaHeader"
          src="../src/assets/logo-alcaldia-de-managua.png"
          preview={false}
        />
      </div>
      <div className="column">
        <h1>Dirección Específica de Almacenes</h1>
        <h2>{titulo}</h2>
      </div>
    </header>
  );
}
