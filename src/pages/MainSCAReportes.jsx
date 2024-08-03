import { Card, DatePicker, Space, message, Switch } from "antd";
import { BotonBack } from "../components/BotonBack";
import { HeaderSCA } from "../components/HeaderSCA";
import { useNavigate } from "react-router-dom";
import Modal_report from "../components/ModalReport";
import React, { useContext, useState, useEffect } from 'react'
import { DashboardFilled, DollarCircleFilled, PieChartFilled, InteractionFilled, ReconciliationFilled } from '@ant-design/icons';
import { DropMenu } from '../components/DropMenu'
import "../App.css";
import { DataContextMain } from "../Context/DataContextMain";
import AutoComp from "../components/Autocompletar";
import { RadioBoton } from '../components/RadioBoton'


function MainSCAReports() {

    const navigateTo = useNavigate();
    const handelClickmenu = () => navigateTo('/Main');

    var today = new Date();
    var monthAct = today.getMonth() + 1;
    var yearAct = today.getFullYear();

    const { RangePicker } = DatePicker;
    //Se Declara El Contexto
    const { UnidadesAdministrativas } = useContext(DataContextMain)
    const [Titlemodal, setTitlemodal] = useState();


    const iduserlog = JSON.parse(localStorage.getItem('dataToken'));
    const id = iduserlog.result.roleId;

    //Estado que controla el Modal
    const [isModalOpenConsumo, setisModalOpenConsumo] = useState();
    const [isModalOpenEntradaCombustible, setisModalOpenEntradaComsbutible] = useState();
    const [isModalOpenEntradaVaricacionPrecio, setisModalOpenVariacionPrecio] = useState();
    const [isModalOpenEntradaAsignacionPresupuestaria, setisModalOpenAsignacionPresupuestaria] = useState();
    const [isModalOpenEntradaRegistroLubrico, setisModalOpenRegistroLubrico] = useState();

    const [OptionUa, setOptionUa] = useState();
    const [MesSelection, setMesSelection] = useState();
    const [TipoCombustible, setTipoCombustible] = useState();
    const [YearSelection, setYearSelection] = useState();
    const [UaIdSelection, setUaIdSelection] = useState();
    const [lubricDipatch, setLubricDipatch] = useState();
    const [NoLubricDipatch, setNoLubricDipatch] = useState();
    const [checkedCons, setcheckedCons] = useState(false)

    const urlEntradaComb = 'https://localhost:7140/api/Reports/fuel-income?month=';
    const urlVariacionPrecio = 'https://localhost:7140/api/Reports/price-changes?month=';
    const urlBudgetUAyear = 'https://localhost:7140/api/Reports/budget?uaid=';
    const urlLubricDispatch = 'https://localhost:7140/api/LubricDispatch';
    const urlLubricDispatchReport = 'https://localhost:7140/api/Reports/lubric-dipatch?route_sheet';
    const urlConsumoPresupuestario = 'https://localhost:7140/api/Reports/budget-consumption?year=';

    //OkModal
    const handleOk = (e) => {
        setisModalOpenConsumo(false);
        console.log(e.target);
    };
    async function handleOkEntradaCombustible() {

        if (MesSelection !== undefined) {
            console.log(MesSelection?.$y);
            console.log((MesSelection?.$M) + 1);
            let year = MesSelection?.$y;
            let month = (MesSelection?.$M) + 1;
            const response = await fetch(`${urlEntradaComb}${month}&year=${year}`)
                .then((response) => response.blob())
                .then((blob) => {
                    const url = window.URL.createObjectURL(blob);//Crampos una url apartit del objeto Blob
                    const link = document.createElement('a');//Cramos un Link para asignarle la descarga
                    link.setAttribute('href', url);
                    link.setAttribute("target", "_blank");
                    document.body.appendChild(link);//aperturamos el link en el DOM
                    link.click();//Forzamos la ejecucion del link que creamos
                    link.parentNode.removeChild(link);//eliminamos el link del DOM
                })
            setMesSelection();
            setisModalOpenEntradaComsbutible(false);
        } else {
            message.error('Ingrese la fecha del reporte que desea descargar')
        }
    };

    async function handleOklVariacionPrecio() {
        if (MesSelection !== undefined && TipoCombustible !== undefined) {
            let year = MesSelection?.$y;
            let month = (MesSelection?.$M) + 1;
            const response = await fetch(`${urlVariacionPrecio}${month}&year=${year}&type=${TipoCombustible}`)
                .then((response) => response.blob())
                .then((blob) => {
                    const url = window.URL.createObjectURL(blob);//Crampos una url apartit del objeto Blob
                    const link = document.createElement('a');//Cramos un Link para asignarle la descarga
                    link.setAttribute('href', url);
                    link.setAttribute("target", "_blank");
                    document.body.appendChild(link);//aperturamos el link en el DOM
                    link.click();//Forzamos la ejecucion del link que creamos
                    link.parentNode.removeChild(link);//eliminamos el link del DOM
                })
            setTipoCombustible();
            setMesSelection();
            setisModalOpenVariacionPrecio(false);
        } else {
            message.error('Ingrese los datos del reporte que desea descargar');
        }
    };

    async function handleOkAsignacionPresupuestaria() {

        if (YearSelection !== undefined && UaIdSelection !== undefined) {
            let year = YearSelection?.$y;
            let idua = UaIdSelection[0]?.value;


            const response = await fetch(`${urlBudgetUAyear}${idua}&year=${year}`)
                .then((response) => response.blob())
                .then((blob) => {
                    const url = window.URL.createObjectURL(blob);//Crampos una url apartit del objeto Blob
                    const link = document.createElement('a');//Cramos un Link para asignarle la descarga
                    link.setAttribute('href', url);
                    link.setAttribute("target", "_blank");
                    document.body.appendChild(link);//aperturamos el link en el DOM
                    link.click();//Forzamos la ejecucion del link que creamos
                    link.parentNode.removeChild(link);//eliminamos el link del DOM
                })



            setYearSelection();
        } else {
            message.error('Llene los campos Correctamente para descargar el reporte');
        }


    }

    async function handleOkDespachosLubricos() {
        if (NoLubricDipatch === undefined || NoLubricDipatch === "") {
            message.error('Llene los campos Correctamente para descargar el reporte');
        } else {
            var requestOptions = {
                method: 'GET',
                redirect: 'follow'
            };

            var urlConcactLubricDipatch = urlLubricDispatchReport + "=" + NoLubricDipatch;

            const response = await fetch(urlConcactLubricDipatch, requestOptions)
                .then((response) => response.blob())
                .then((blob) => {
                    const url = window.URL.createObjectURL(blob);//Crampos una url apartit del objeto Blob
                    const link = document.createElement('a');//Cramos un Link para asignarle la descarga
                    link.setAttribute('href', url);
                    link.setAttribute("target", "_blank");
                    document.body.appendChild(link);//aperturamos el link en el DOM
                    link.click();//Forzamos la ejecucion del link que creamos
                    link.parentNode.removeChild(link);//eliminamos el link del DOM
                })
        }
    }

    async function handleOklConsumoPresupuestario() {
        // Consolidado UA
        if (checkedCons && UaIdSelection !== undefined && YearSelection !== undefined) {
            let year = YearSelection?.$y;
            let idua = UaIdSelection[0]?.value;
            const response = await fetch(`${urlConsumoPresupuestario}${year}&uaid=${idua}`)
                .then((response) => response.blob())
                .then((blob) => {
                    console.log(blob)
                    const url = window.URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.setAttribute('href', url);
                    link.setAttribute("target", "_blank");
                    document.body.appendChild(link);//aperturamos el link en el DOM
                    link.click();//Forzamos la ejecucion del link que creamos
                    link.parentNode.removeChild(link);//eliminamos el link del DOM
                })
        } else {
            // Mensual UA
            if (UaIdSelection !== undefined && MesSelection !== undefined) {
                let year = MesSelection?.$y;
                let month = (MesSelection?.$M) + 1;
                let idua = UaIdSelection[0]?.value;
                const response = await fetch(`${urlConsumoPresupuestario}${year}&month=${month}&uaid=${idua}`)
                    .then((response) => response.blob())
                    .then((blob) => {
                        const url = window.URL.createObjectURL(blob);//Crampos una url apartit del objeto Blob
                        const link = document.createElement('a');//Cramos un Link para asignarle la descarga
                        link.setAttribute('href', url);
                        link.setAttribute("target", "_blank");
                        document.body.appendChild(link);//aperturamos el link en el DOM
                        link.click();//Forzamos la ejecucion del link que creamos
                        link.parentNode.removeChild(link);//eliminamos el link del DOM
                    })
            }
            message.error('Llene los campos correctamente');
        }

        setMesSelection();
        setisModalOpenConsumo(false);

    };


    //CancelModal
    const handleCancel = () => {
        setisModalOpenConsumo(false);
        setisModalOpenEntradaComsbutible(false);
        setisModalOpenVariacionPrecio(false);
        setisModalOpenAsignacionPresupuestaria(false);
        setisModalOpenRegistroLubrico(false);
    };


    //Abrir los modales
    function AbrirModalConsumo() {
        if (id == 1 || id == 2 || id == 3) {
            setisModalOpenConsumo(true);
            setTitlemodal('Consumo Presupuestario');
            setOptionUa(UnidadesAdministrativas.map((ua) => {
                return { value: ua.label, id: ua.value };
            }))
        } else {
            message.error('No tiene permiso');
        }
    }
    function AbrirModalEntradaCombustible() {
        if (id == 1 || id == 3 || id == 4) {
            setisModalOpenEntradaComsbutible(true);
            setTitlemodal('Entradas de Combustible');
        } else {
            message.error('No tiene permiso');
        }
    }
    function AbrirModalVariacionPrecio() {
        if (id == 1 || id == 3 || id == 4) {
            setisModalOpenVariacionPrecio(true);
            setTitlemodal('Historial de Precio');
        } else {
            message.error('No tiene permiso');
        }
    }
    function AbrirModalAsignacionPresupuestaria() {
        if (id == 1 || id == 2 || id == 3) {
            setisModalOpenAsignacionPresupuestaria(true);
            setTitlemodal('Asignacion Presupuestaria');
            setOptionUa(UnidadesAdministrativas.map((ua) => {
                return { value: ua.label, id: ua.value };
            }))
        } else {
            message.error('No tiene permiso');
        }
    }
    function AbrirModalRegistroLubrico() {
        if (id == 1 || id == 3 || id == 4) {
            setisModalOpenRegistroLubrico(true);
            setTitlemodal('Registro despachos Lubricos');
        } else {
            message.error('No tiene permiso');
        }
    }



    //Funcionamiento
    function OnchangeOptionUA(e) {
        // console.log(e)
        // console.log(UnidadesAdministrativas.filter((i) => i.label == e))
        const id = UnidadesAdministrativas.filter((i) => i.label == e);
        setUaIdSelection(id);
        // console.log('este es el id ', id[0]?.value)
        // console.log('este es la ua ', id[0]?.label)
    }
    function OnchangeDropMesEntradasCombustible(...e) {
        if (e[0]?.$y > yearAct || e[0]?.$M + 1 > monthAct) {
            message.error('Seleccione una Fecha valida');
            setMesSelection();
        } else {
            setMesSelection(e[0]);
        }
    }
    function OnchangeDropyearEntradasCombustible(...e) {
        if (e[0]?.$y > yearAct) {
            message.error('Seleccione una Fecha valida');
            setYearSelection();
        } else {
            setYearSelection(e[0]);
        }
    }


    //despacho de lubricos
    const completeDataLubricos = async () => {
        const response = await fetch(urlLubricDispatch);
        const data = await response.json();
        const complete = data.$values.map((route_sheet) => {
            return { value: route_sheet.routeSheetId.toString() };
        });
        setLubricDipatch(complete);
    };

    function OnchangeOptionlubricDipatch(e) {
        setNoLubricDipatch("");
        if (e != "") {
            console.log(e);
            setNoLubricDipatch(e);
        }
    }

    useEffect(() => {
        completeDataLubricos();
    }, []);

    const onChange = (checked) => {
        console.log(`switch to ${checked}`);
        setcheckedCons(checked);
    };

    return (
        <div className="MainReportes">

            <HeaderSCA titulo={"Menú De Reportes"}></HeaderSCA>
            <BotonBack oncl={handelClickmenu} texTooltip={'Regresar'}></BotonBack>

            {/* Cards */}
            <div className="InputGroupCards">

                <Card className="cards" onClick={AbrirModalConsumo} >
                    <PieChartFilled className="cardsico" />
                    <span className='textcard'>Consumo Presupuestario</span>
                </Card>

                <Card className="cards" onClick={AbrirModalEntradaCombustible}>
                    <DashboardFilled className="cardsico" />
                    <span className='textcard'>Entradas Combustible</span>
                </Card>

                <Card className="cards" onClick={AbrirModalVariacionPrecio}>
                    <InteractionFilled className="cardsico" />
                    <span className='textcard'>Historial de Precio</span>
                </Card>

                <Card className="cards" onClick={AbrirModalAsignacionPresupuestaria}>
                    <DollarCircleFilled className="cardsico" />
                    <span className='textcard'>Asignacion Presupuestaria</span>
                </Card>

                <Card className="cards" onClick={AbrirModalRegistroLubrico}>
                    <ReconciliationFilled className="cardsico" />
                    <span className='textcard'>Registro Lubricos</span>
                </Card>

            </div>

            {/* Reporte Consumo Presupuestario */}
            <Modal_report className='ModalReport' isModalOpen={isModalOpenConsumo} handleOk={handleOklConsumoPresupuestario} handleCancel={handleCancel} Title={Titlemodal} >
                <AutoComp placeholder={"Unidad Administrativa"} Options={OptionUa} onChange={OnchangeOptionUA}></AutoComp>
                <Space>
                    <span>Consolidado</span>
                    <Switch size="small" defaultChecked={false} onChange={onChange} />
                </Space>
                <br></br>

                <DatePicker size={"large"} picker="month" onChange={OnchangeDropMesEntradasCombustible} value={MesSelection} style={{
                    marginTop: 25
                }}
                    disabled={checkedCons ? true : false}
                />

                <DatePicker size={"large"} picker="year" onChange={OnchangeDropyearEntradasCombustible} value={YearSelection} style={{
                    marginTop: 25
                }}
                    disabled={checkedCons ? false : true}
                />

            </Modal_report>

            <Modal_report className='ModalReport' isModalOpen={isModalOpenEntradaCombustible} handleOk={handleOkEntradaCombustible} handleCancel={handleCancel} Title={Titlemodal} >
                <DatePicker size={"large"} picker="month" onChange={OnchangeDropMesEntradasCombustible} value={MesSelection} style={{
                    marginTop: 25
                }} />
            </Modal_report>

            <Modal_report className='ModalReport' isModalOpen={isModalOpenEntradaVaricacionPrecio} handleOk={handleOklVariacionPrecio} handleCancel={handleCancel} Title={Titlemodal} >
                <DatePicker size={"large"} picker="month" onChange={OnchangeDropMesEntradasCombustible} value={MesSelection} style={{
                    marginBottom: 20,
                    marginTop: 25
                }} />

                <div className='RadioButtonGroup'>
                    <RadioBoton className={'RadioGroupprod'} title={'Combustible'} content1={'Diesel'} content2={'Gasolina'} onChange={(e) => setTipoCombustible(e.target.value)} value={TipoCombustible}></RadioBoton>
                </div>
            </Modal_report>

            <Modal_report className='ModalReport' isModalOpen={isModalOpenEntradaAsignacionPresupuestaria} handleOk={handleOkAsignacionPresupuestaria} handleCancel={handleCancel} Title={Titlemodal} >
                <AutoComp placeholder={"Unidad Administrativa"} Options={OptionUa} onChange={OnchangeOptionUA}></AutoComp>
                <DatePicker size={"large"} picker="year" onChange={OnchangeDropyearEntradasCombustible} value={YearSelection} style={{
                    marginBottom: 20,
                    marginTop: 25
                }} />
            </Modal_report>

            <Modal_report className='ModalReport' isModalOpen={isModalOpenEntradaRegistroLubrico} handleOk={handleOkDespachosLubricos} handleCancel={handleCancel} Title={Titlemodal} >
                <AutoComp placeholder={"Hoja de ruta"} Options={lubricDipatch} onChange={OnchangeOptionlubricDipatch}></AutoComp>
            </Modal_report>


        </div>
    );
}

export default MainSCAReports;