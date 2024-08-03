import React from 'react'
import './index.css'
import { Card } from "antd";
import { ScheduleFilled, FundFilled, FireFilled, DollarCircleFilled, ContactsFilled } from '@ant-design/icons';
import { Navigate, useNavigate } from "react-router-dom";


export function Cards_menu() {
  
  const navigateTo = useNavigate();
  const handleClick = () => (navigateTo('/MainReports'));
  const handleClickIngresoCombustible = () => (navigateTo('/MainSCAIngresoCombustible'));
  const handleClickGestionUsuarios = () => (navigateTo('/MainSCAGestionUsuarios'));
  const handleClickRegistroDespachoLubrico = () => (navigateTo('/MainSCARegistroDespachoLubricos'));
  const handleClickPresupuestoUnidadAdministrativa = () => (navigateTo('/MainSCAPresupuestoUnidadAdministrativa'));



  return (
    <div className="InputGroupCards">

      <Card className="cards" onClick={handleClickIngresoCombustible}>
        <FireFilled className="cardsico" />
        <span className='textcard'>Ingreso Combustible</span>
      </Card>

      <Card className="cards" onClick={handleClickRegistroDespachoLubrico}>
        <ScheduleFilled className="cardsico" />
        <span className='textcard'>Registro Lubricos</span>
      </Card>

      <Card className="cards" onClick={handleClickPresupuestoUnidadAdministrativa}>
        <DollarCircleFilled className="cardsico" />
        <span className='textcard'>Presupuesto</span>
      </Card>

      <Card className="cards" onClick={handleClick}>
        <FundFilled className="cardsico" />
        <span className='textcard'>Reportes</span>
      </Card>

      <Card className="cards" onClick={handleClickGestionUsuarios}>
        <ContactsFilled className="cardsico" />
        <span className='textcard'>Gestión de Usuarios</span>
      </Card>


    </div>

  )
}
