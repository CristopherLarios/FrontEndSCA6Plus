import React from 'react'
import './index.css'
import { Card } from "antd";
import { DashboardFilled,DollarCircleFilled,PieChartFilled,InteractionFilled,ReconciliationFilled } from '@ant-design/icons';


export function Cards_reportes() {
  return (
    <div className="InputGroupCards">

      <Card className="cards">
      <PieChartFilled className="cardsico" />
        <span className='textcard'>Consumo Presupuestario</span>
      </Card>

      <Card className="cards">
      <DashboardFilled className="cardsico"/>
        <span className='textcard'>Entradas Combustible</span>
      </Card>

      <Card className="cards">
      <InteractionFilled className="cardsico"/>
        <span className='textcard'>Variacion de Precio</span>
      </Card>

      <Card className="cards">
      <DollarCircleFilled className="cardsico" />
        <span className='textcard'>Asignacion Presupuestaria</span>
      </Card>

      <Card className="cards">
      <ReconciliationFilled className="cardsico"/>
        <span className='textcard'>Registro Lubricos</span>
      </Card>


    </div>

  )
}
