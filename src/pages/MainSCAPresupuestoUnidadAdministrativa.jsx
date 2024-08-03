import React, { useState, useEffect, useContext } from 'react'
import { BotonBack } from '../components/BotonBack'
import { HeaderSCA } from '../components/HeaderSCA'
import { DropMenu } from '../components/DropMenu'
import { json, useNavigate } from "react-router-dom";
import CampoNum from '../components/CampoNumerico';
import { Boton } from '../components/Boton';
import '../App.css'
import { TableMain } from "../components/TableMain";
import { columnsPresUniAdm } from "../constants/tablesColumns";
import { DataContextMain } from '../Context/DataContextMain';
import { message } from 'antd';



function MainSCAPresupuestoUnidadAdministrativa() {

  //Se Declara el contexto Main
  const { UnidadesAdministrativas } = useContext(DataContextMain);

  const navigateTo = useNavigate();
  const handelClickmenu = () => navigateTo('/Main');

  //Estado para capurar el estado del campo presupuesto
  const [campoPresupuesto, setCampoPresupuesto] = useState('');

  //Estado para capurar el estado de la respuesta de la API
  const [BudgetUA, setBudgetUA] = useState();//data para el calculo
  const [dataUA, setDataUA] = useState();//data para el envio
  const [DataSource, setDataSource] = useState();//data para la tabla



  //Estados para capturar la seleccion de los dropmenu
  const [optionselec, setOptionselec] = useState('');
  const [MesSelection, setMesSelection] = useState('');

  //Estado para renderizado Condicional
  const [classNameButton, setclassNameButton] = useState('botonInicio');
  const [descButton, setdescButton] = useState('Asignar presupuesto');
  const [PlaceHolderMes, setPlaceHolderMes] = useState('');
  const [botonstate, setbotonstate] = useState(true);

  const itemsMeses = [
    {
      value: '1',
      label: ("Enero"),
    },
    {
      value: '2',
      label: ("Febrero"),
    },
    {
      value: '3',
      label: ("Marzo"),
    },
    {
      value: '4',
      label: ("Abril"),
    },
    {
      value: '5',
      label: ("Mayo"),
    },
    {
      value: '6',
      label: ("Junio"),
    },
    {
      value: '7',
      label: ("Julio"),
    },
    {
      value: '8',
      label: ("Agosto"),
    },
    {
      value: '9',
      label: ("Septiembre"),
    },
    {
      value: '10',
      label: ("Octubre"),
    },
    {
      value: '11',
      label: ("Noviembre"),
    },
    {
      value: '12',
      label: ("Diciembre"),
    },
    {
      value: '13',
      label: ("Partes Iguales"),
    }
  ];

  var today = new Date();
  var month = today.getMonth() + 1;
  const urlBudgetUA = 'https://localhost:7140/api/Budget';

  async function OnchangeDropUA(...e) {
    setOptionselec(e[1]);
    const response = await fetch(`${urlBudgetUA}/${e[1].value}`)
    const data = await response.json();

    let newdata = JSON.parse(data.data)
    let claves = Object.keys(newdata);

    for (let i = 0; i < claves.length; i++) {
      newdata[claves[i]] = `C$ ${newdata[claves[i]]}`
    }
    setBudgetUA(JSON.parse(data.data));
    setDataSource(newdata);
    setDataUA(data);
  }

  async function Cargardata() {
    const response = await fetch(`${urlBudgetUA}/${optionselec?.value}`)
    const data = await response.json();
    let newdata = JSON.parse(data.data)
    let claves = Object.keys(newdata);
    for (let i = 0; i < claves.length; i++) {
      newdata[claves[i]] = `C$ ${newdata[claves[i]]}`
    }
    setDataSource(newdata);
  }

  //Efecto que se ejecuta en cada cambio del dropMes
  function OnchangeDropMes(...e) {
    setMesSelection(e[1]);
  }
  useEffect(() => {
    if (MesSelection.label != undefined) {
      BudgetUA[MesSelection.label] > 0 ? setclassNameButton('botonInicio_Modificar') : setclassNameButton('botonInicio');
      BudgetUA[MesSelection.label] > 0 ? setdescButton('Modificar Presupuesto') : setdescButton('Asignar Presupuesto');
      MesSelection.label !== 'Partes Iguales' ? setPlaceHolderMes(MesSelection.label) : setPlaceHolderMes('Presupuesto Anual');

      const resul = itemsMeses.filter(e => e.label == MesSelection.label);
      resul[0].value >= month ? setbotonstate(false) : setbotonstate(true);

    }
  }, [MesSelection])

  async function AsignarPresupuesto() {
    
    

    if (optionselec !== '' && MesSelection !== '' && campoPresupuesto > 0) {
      const mes = MesSelection.label;

      if (MesSelection.label !== 'Partes Iguales') {
        //Caso de que sea un mes que se va a modificar
        const resul = itemsMeses.filter(e => e.label == mes);
        if (resul[0].value >= month) {
          //caso de que en el mes actual no sea menor al que queremos modificar
          let bod = {
            "id": dataUA.id,
            "administrativeUnitId": dataUA.administrativeUnitId,
            "year": 2023,
            "data": JSON.stringify({
              ...BudgetUA,
              [mes]: campoPresupuesto
            })
          }

          let sum = 0;
          for (let key in JSON.parse(bod.data)) {
            console.log(parseFloat(JSON.parse(bod.data)[key]))
            if (key !== 'Total') {
              sum += parseFloat(JSON.parse(bod.data)[key]);
            }
          }

          bod = {
            "id": dataUA.id,
            "administrativeUnitId": dataUA.administrativeUnitId,
            "year": 2023,
            "data": JSON.stringify({
              ...BudgetUA,
              [mes]: campoPresupuesto,
              ['Total']: sum.toFixed(2)
            })
          }

          setBudgetUA(JSON.parse(bod.data));
          const response = await fetch(`${urlBudgetUA}/${dataUA.id}/${dataUA.administrativeUnitId}`, {
            method: 'PUT',
            headers: {
              'Acept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(bod)
          })
          setCampoPresupuesto('');
          Cargardata();
          message.success('Presupuesto Asignado');
        } else {
          //Caso que queramos asignar a un mes anterior que no se puede
          message.error('No puede Modificar presupuestos Anteriores');
        }
      }
      else {
        //Caso  que seleccione partes iguales
        if (month <= 2) {
          //Caso de que partes iguales se ejecute, solo en enero, febrero y marzo
          const PartesIguales = (campoPresupuesto / 12);
          const totalmes = PartesIguales.toFixed(2);

          const meses = {
            "Enero": totalmes,
            "Febrero": totalmes,
            "Marzo": totalmes,
            "Abril": totalmes,
            "Mayo": totalmes,
            "Junio": totalmes,
            "Julio": totalmes,
            "Agosto": totalmes,
            "Septiembre": totalmes,
            "Octubre": totalmes,
            "Noviembre": totalmes,
            "Diciembre": totalmes,
            "Total": campoPresupuesto,
          }
          const bod = {
            "id": dataUA.id,
            "administrativeUnitId": dataUA.administrativeUnitId,
            "year": 2023,
            "data": JSON.stringify(meses)
          }
          setBudgetUA(meses);
          const response = await fetch(`${urlBudgetUA}/${dataUA.id}/${dataUA.administrativeUnitId}`, {
            method: 'PUT',
            headers: {
              'Acept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(bod)
          })
          setCampoPresupuesto('');
          Cargardata();
        } else {
          //Caso que estemos en marzo 
          message.error('No esta permitido en el mes Actual');
          setCampoPresupuesto('');

        }
      }
    } else {
      message.error('Llene los campos correctamente');
    }
  }



  return (
    <div className='MainSCAPresupuestoUnidadAdministrativa'>
      <HeaderSCA titulo={'Presupuesto Unidad Administrativa'}></HeaderSCA>
      <BotonBack oncl={handelClickmenu} texTooltip={'Regresar'}></BotonBack>

      <div className='InputGroupAsignarPresupuesto'>

        <div className='DropMenu'>
          <DropMenu clasname='dropmenuUA' text={'Unidad Administrativa'} items={UnidadesAdministrativas} onChange={OnchangeDropUA}></DropMenu>
          <DropMenu clasname='dropmenumes' text={'Mes'} items={itemsMeses.filter(e=> e.value >= month)} onChange={OnchangeDropMes} disabled={optionselec == '' ? true : false}></DropMenu>
        </div>


        <div className='CampoPresup'>
          <CampoNum um='C$' ph={PlaceHolderMes} min={0} max={1000000000} onChange={(e) => { setCampoPresupuesto(e) }} value={campoPresupuesto}></CampoNum>
        </div>


        <Boton className={classNameButton} oncl={AsignarPresupuesto} cl={'BotonAsignarPresupuestoUA'} desc={descButton} disabled={botonstate}></Boton>

      </div>

      <TableMain columnsName={columnsPresUniAdm} dataSource={[DataSource]} ></TableMain>

    </div>
  )
}

export default MainSCAPresupuestoUnidadAdministrativa