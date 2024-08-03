
import { Cards_menu } from "../components/Cards_Menu";
import { TableMain } from "../components/TableMain";
import { HeaderSCA } from "../components/HeaderSCA";
import { BotonBack } from "../components/BotonBack";
import { useNavigate, useSearchParams } from "react-router-dom";
import { columnsMain } from "../constants/tablesColumns";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "../Context/DataContext";
import { Progress } from "antd";
import "../App.css";




function MainSCA() {

  //Se declara DataContext
  const { logoutauth } = useContext(DataContext);
  //
  const [consumo, setConsumo] = useState();
  const [Datassorceconsumtion, setDatassorceconsumtion] = useState([]);

  const [reload, setReload] = useState(false);

  const navigateTo = useNavigate();
  const handelClickmenu = () => {
    //Logout
    navigateTo("/");
    logoutauth();
  }



  useEffect(() => {
    setTimeout(alertFunc, 180000);
  }, [reload])



  function alertFunc() {
    reload !== true ? setReload(true) : setReload(false)
    console.log(reload)
  }


  const urldashboard = 'https://localhost:7140/api/Reports/dashboard';

  useEffect(() => {
    const traerconsumtion = async () => {
      const response = await fetch(urldashboard)
      const data = await response.json();
      setConsumo(data.$values);
    };
    traerconsumtion();
  }, [reload])



  function cargardata() {

    if (consumo != undefined) {
      setDatassorceconsumtion([]);

      consumo.sort(((a, b) =>
        ((b.gasto * 100) / b.presu).toFixed(2) - ((a.gasto * 100) / a.presu).toFixed(2)
      ));
      //consumo?.length  --- Toda la data cargarla a la tabla
      for (let i = 0; i < 10; i++) {
        const element = consumo[i];
        // console.log(element);
        let ua = element.uni_Adm;
        let presu = element.presu;
        let gast = element.gasto;
        let dif = element.dife;
        let eje = ((element.gasto * 100) / element.presu)
        setDatassorceconsumtion(current => [...current, {
          Uni_Adm: ua,
          presu: `C$ ${presu.toFixed(2)}`,
          gasto: `C$ ${gast.toFixed(2)}`,
          dife: `C$ ${dif.toFixed(2)}`,
          ejepresup: eje.toFixed(1)
        }]);
      }
    }


  }

  useEffect(() => {
    cargardata();
  }, [consumo])

  return (
    <div className="App">
      <HeaderSCA titulo={"Menú Principal"}></HeaderSCA>
      <BotonBack oncl={handelClickmenu} texTooltip={'Cerrar Sesion'}></BotonBack>
      <Cards_menu ></Cards_menu>
      <TableMain
        size={'small'}
        columnsName={[...columnsMain,
        {
          title: 'Ejecucion Presupuestaria',
          key: 'ejepresup',
          render: (_, record) => (
            <Progress strokeColor={record.ejepresup >= 80 ? 'red' : '#1BB55C'} status="active" percent={record.ejepresup} size='small' />
          )
        }]}
        dataSource={Datassorceconsumtion}
        pageSize={5}
      ></TableMain>
    </div>
  );
}

export default MainSCA;
