import React, { useContext, useState, useEffect } from "react";
import { HeaderSCA } from "../components/HeaderSCA";
import { useNavigate, useSearchParams } from "react-router-dom";
import { BotonBack } from "../components/BotonBack";
import { CampoTexto } from "../components/CampoTexto";
import { DropMenu } from "../components/DropMenu";
import { Boton } from "../components/Boton";
import "../App.css";
import { TableMain } from "../components/TableMain";
import { columnsDespLubricos } from "../constants/tablesColumns";
import CampoNum from "../components/CampoNumerico";
import { DataContextMain } from "../Context/DataContextMain";
import IconBusqueda from "../components/IconBusqueda";
import { message, Space, Popconfirm, Tooltip } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

function MainSCARegistroDespachoLubricos() {

  //Contexto que trae La UA
  const { UnidadesAdministrativas } = useContext(DataContextMain);


  const navigateTo = useNavigate();
  const handelClickmenu = () => navigateTo("/Main");

  //Manejo de estados
  const [optionUAselection, setOtionUAselection] = useState('');//UA Seleccionada
  const [VehicleFilter, setVehicleFilter] = useState();//Vehiculos de UA seleccionada
  const [isSearch, setIsSearch] = useState('');//placa buscada
  const [isFound, setIsFound] = useState(false);//Si encontro la placa
  const [campoCuota, setCampoCuota] = useState('');//Cuota a registrar
  const [dataSource, setDataSource] = useState([]);//Datasource de tabla
  const [Vehicule, setVehicule] = useState();
  const [itemsLubrico, setitemsLubrico] = useState([]);
  const [isFoundDataSource, setisFoundDataSource] = useState(false);

  const [hojaRuta, setHojaRuta] = useState();
  const [OptionLubSelection, setOptionLubSelection] = useState();


  const urlVehicle = ' http://localhost:3000/vehicles';
  const iduserlog = JSON.parse(localStorage.getItem('dataToken'));


  //Efecto que se ejecuta en cada cambio del dropUA
  function OnchangeDropUA(...e) {
    setOtionUAselection(e[1]);
  }

  function OnchangeLub(...e) {
    setOptionLubSelection(e[0])
  }

  useEffect(() => {
    const traerVehicleUA = async () => {
      const response = await fetch(`${urlVehicle}/?id_administrative_units=${optionUAselection.value}`)
      const data = await response.json();
      setVehicleFilter(data);
      console.log('Estos son los vehiculos filtrados por la UA seleccionada', data);
    };
    traerVehicleUA();
  }, [optionUAselection])

  useEffect(() => {
    const traerVehicleUA = async () => {
      const response = await fetch(urlVehicle)
      const data = await response.json();
      let busqueda = "Lubrico";
      let expresion = new RegExp(`${busqueda}.*`, "i");
      var lubricos = data.filter(data => expresion.test(data.brand));
      const option = lubricos.map((vehi) => {
        return { value: vehi.id, label: vehi.brand };
      });
      setitemsLubrico(option);
      setVehicule(data);
    };
    traerVehicleUA();
  }, [])


  //Se verifica que lo que esta escribiendo se encuentre en los vehiculos de esa UA
  function OnchangePlaca(e) {
    setIsSearch(e.target.value);
    var index = VehicleFilter.findIndex(k => k.plate == e.target.value);
    index != -1 ? setIsFound(true) : setIsFound(false);

    var indexdatasource = dataSource.findIndex(k => k.placa == e.target.value);
    indexdatasource != -1 ? setisFoundDataSource(true) : setisFoundDataSource(false);

  }

  function AgregarRegistro() {
    if (campoCuota != '' && isSearch != '') {
      console.log(isFoundDataSource)
      if (isFound && isFoundDataSource == false) {
        var Vehicle = VehicleFilter.filter(e => e.plate == isSearch);
        setDataSource(current => [...current, {
          uni_adm: optionUAselection.label,
          model: Vehicle[0]?.brand,
          placa: isSearch,
          cuota: campoCuota
        }]);
        message.success('Se agrego al registro');
        setCampoCuota('');
        setIsSearch('');
        setIsFound(false);
      } else {
        message.error('Verifique la Placa del Vehiculo');
      }
    } else {
      message.error('Llene Los campos');
    }
  }

  function handleDelete(record) {
    const newData = dataSource.filter((item) => (item.placa !== record.placa || item.cuota !== record.cuota))
    setDataSource(newData);
  };

  function handleEdit(record) {
    setIsSearch(record.placa);
    setCampoCuota(record.cuota);
    setIsFound(true);
    handleDelete(record);
  }


  async function GenerarHojadeRuta() {

    if (dataSource.length > 0 && hojaRuta !== '' && OptionLubSelection !== '') {

      const id = iduserlog.result.id;

      let datadetails = [];

      for (let index = 0; index < dataSource.length; index++) {
        let idveh = Vehicule.find((e) => e.plate == dataSource[index].placa);
        datadetails.push({
          "vehicleId": idveh.id,
          "quantity": dataSource[index].cuota
        });
      }

      const data = {
        "lubricId": OptionLubSelection,//id del vehiculo lubrico que seleccione
        "routeSheetId": hojaRuta,
        "createdById": id,
        "lubricDispatchDetails": datadetails
      }

      const response = await fetch('https://localhost:7140/api/LubricDispatch', {
        method: 'POST',
        headers: {
          'Acept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      setDataSource([]);
      setHojaRuta('');
      setOptionLubSelection("Seleccione Lubrico");
      console.log(response)
      message.success('Se Genero La Hoja de Ruta');
    } else {
      message.error('Llene Los campos');
    }


  }

  return (
    <div className="MainSCARegistroDespachoLubricos">
      <HeaderSCA titulo={"Registro Despacho Lubricos"}></HeaderSCA>
      <BotonBack oncl={handelClickmenu} texTooltip={'Regresar'}></BotonBack>

      <div id="position">
        <div>
          <div className="intputgroup1">
            <div className="CampoTexto">
              <CampoTexto nm={"MyHojaRuta"} ph={"N Hoja Ruta"} onChange={(e) => { setHojaRuta(e.target.value) }} value={hojaRuta}></CampoTexto>
              <div className="menu">
                <DropMenu text={"Seleccione Lubrico"} items={itemsLubrico} onChange={OnchangeLub} value={OptionLubSelection} defaultOpen={OptionLubSelection}></DropMenu>
                <Boton desc={'Generar'} disabled={dataSource.length > 0 ? false : true} oncl={GenerarHojadeRuta}></Boton>
              </div>
            </div>

          </div>

          <div className="intputgroup2">
            <div className="CampoTexto">
              <div className="menu">
                <DropMenu text={'Unidad Administrativa'} items={UnidadesAdministrativas} onChange={OnchangeDropUA} value={optionUAselection}></DropMenu>
              </div>

              <div className="intputPlaca">
                <CampoTexto nm={"MyPlaca"} ph={"Placa"} onChange={OnchangePlaca} value={isSearch} disabled={optionUAselection == '' ? true : false} ></CampoTexto>
                <IconBusqueda className='IconBusqueda' value={isSearch} isFound={isFound}></IconBusqueda>
              </div>

              <CampoNum um='GL' ph={'Cuota'} min={0} max={10000} onChange={(e) => { setCampoCuota(e) }} value={campoCuota} disabled={optionUAselection == '' ? true : false}></CampoNum>
              <div className="boton">
                <Boton cl={"MyAgregar"} oncl={AgregarRegistro} desc={"Agregar"}></Boton>
              </div>
            </div>
          </div>
        </div>


        <TableMain
          columnsName={[...columnsDespLubricos, {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
              <Space size="middle">
                <Tooltip placement='bottom' title='Eliminar' color='red'>
                  <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record)}>
                    <a><DeleteOutlined className="icodelete" /></a>
                  </Popconfirm>
                </Tooltip>

                <Tooltip placement='bottom' title='Editar' color='green'>
                  <Popconfirm title="Sure to delete?" onConfirm={() => handleEdit(record)}>
                    <a><EditOutlined /></a>
                  </Popconfirm>
                </Tooltip>
              </Space>
            )
          }]}
          dataSource={dataSource}
          pageSize={8}
        ></TableMain>

      </div>
    </div>
  );
}

export default MainSCARegistroDespachoLubricos;
