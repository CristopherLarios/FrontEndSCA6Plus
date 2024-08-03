import React, { useState } from 'react'
import { HeaderSCA } from "../components/HeaderSCA";
import { useNavigate } from "react-router-dom";
import { BotonBack } from '../components/BotonBack';
import { CampoTexto } from '../components/CampoTexto';
import { Boton } from "../components/Boton";
import '../App.css'
import { RadioBoton } from '../components/RadioBoton';
import CampoNum from '../components/CampoNumerico';
import { message } from 'antd';





function MainSCAIngresoCombustible() {

  const navigateTo = useNavigate();
  const handelClickmenu = () => navigateTo('/Main');



  const [Proveedor, setProveedor] = useState('');
  const [TipoCombustible, setTipoCombustible] = useState('');
  const [campoNoFactura, setCampoNoFactura] = useState('');
  const [campoCant, setCampoCant] = useState(0);
  const [campomonet, setCampomonet] = useState(0);

  const iduserlog = JSON.parse(localStorage.getItem('dataToken'));
  const urlIngresoComb = 'https://localhost:7140/api/FuelIncome';

  async function IngresarCombustible() {
    
    if (Proveedor !== '' && TipoCombustible !== '' && campoNoFactura !== '' && campoCant !== '' && campomonet !== '') {
      const join = Proveedor + campoNoFactura;
      const id = iduserlog.result.id;
      const data =
      {
        "invoiceNo": join,
        "fuelType": TipoCombustible,
        "provider":Proveedor,
        "quantity": campoCant,
        "cost": campomonet,
        "createdById": id
      }
      const response = await fetch(urlIngresoComb, {
        method: 'POST',
        headers: {
          'Acept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      setProveedor('');
      setTipoCombustible('');
      setCampoNoFactura('');
      setCampoCant(0);
      setCampomonet(0);
      message.success('Se Realizo Entrada de Combustible');
    } else {
      message.error('Llene los Campos')
    }
  }

  return (
    <div className='MainSCAIngresoCombustible'>

      <div className='Header'>
        <HeaderSCA titulo={"Ingreso de Combustible"}></HeaderSCA>
        <BotonBack oncl={handelClickmenu} texTooltip={'Regresar'}></BotonBack>
      </div>

      <div className='InputGroup'>

        <div className='RadioButtonGroup'>
          <RadioBoton className={'RadioGroupProv'} title={'Proveedor'} content1={'DNP'} content2={'PUMA'} onChange={(e) => setProveedor(e.target.value)} value={Proveedor}></RadioBoton>
          <RadioBoton className={'RadioGroupprod'} title={'Combustible'} content1={'Diesel'} content2={'Gasolina'} onChange={(e) => setTipoCombustible(e.target.value)} value={TipoCombustible}></RadioBoton>
        </div>

        {/* <CampoTexto ph={'No Factura'} nm={'MyNumeroFactura'} onChange={(e) => setCampoNoFactura(e.target.value)} value={campoNoFactura}></CampoTexto> */}
        <CampoNum um={Proveedor == '' ? '---':Proveedor} ph={'Nº Factura'} min={0} max={10000} onChange={(e) => setCampoNoFactura(e)} value={campoNoFactura}></CampoNum>
        <CampoNum um='GL' ph={'Cantidad'} min={0} max={10000} onChange={(e) => { setCampoCant(e) }} value={campoCant}></CampoNum>
        <CampoNum um='C$' ph={'Precio'} min={0} max={10000} onChange={(e) => { setCampomonet(e) }} value={campomonet}></CampoNum>

        <div className='hola'>
          <Boton oncl={IngresarCombustible} cl="BotonIngComb" desc={"Ingresar"}></Boton>
        </div>

      </div>

    </div>
  )
}


export default MainSCAIngresoCombustible;