import { Divider, Image, message } from "antd";
import { CampoTexto } from "../components/CampoTexto";
import { Boton } from "../components/Boton";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { DataContext } from "../Context/DataContext";




function Login() {


  const navigateTo = useNavigate();
  const { respuestatoken, traerToken,userstate, passworstate, setuserstate, setPassworstate, loginauth } = useContext(DataContext);


  //! Verificamos Credenciales y token
  async function VerificacionUsuario() {
    if (userstate === '' || passworstate === '') {
      message.error('Llene los campos');
    } else {
      const valido = await traerToken(userstate, passworstate);
      if (valido.success) {
        message.success(valido.message);
        await respuestatoken(valido.token);
        localStorage.setItem('Token', JSON.stringify(valido.token));
        loginauth();
        navigateTo('/Main');
      } else {
        message.error(valido.message);
        setuserstate('');
        setPassworstate('');
      }
    }
  }


  return (
    <div className="login"
    >

      <form className="LoginForm" onSubmit={ev => {
        ev.preventDefault();
      }}
      >
        <Image className="logoAlcaldia"
          src="../src/assets/logo-alcaldia-de-managua.png"
          preview={false}
        />

        <CampoTexto type={"text"} ph={"Usuario"} nm={"campousuario"} onChange={(e) => setuserstate(e.target.value)} value={userstate} />
        <CampoTexto type={"password"} ph={"Contraseña"} nm={"mypass"} onChange={(e) => setPassworstate(e.target.value)} value={passworstate} />


        <Boton oncl={VerificacionUsuario} cl={"botonInicio"} desc={"Ingresar"} />



        <Divider>
          <a href="#" className="enlaceOl">olvido su contraseña?</a>
        </Divider>
      </form>
    </div>
  );
}



export default Login;