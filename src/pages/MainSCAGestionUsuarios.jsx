import React from "react";
import { HeaderSCA } from "../components/HeaderSCA";
import { CampoTexto } from "../components/CampoTexto";
import { DropMenu } from "../components/DropMenu";
import { Boton } from "../components/Boton";
import { BotonBack } from "../components/BotonBack";
import { useNavigate } from "react-router-dom";
import { TableMain } from "../components/TableMain";
import { columnsUser } from "../constants/tablesColumns";
import { useState, useEffect } from "react";
import { message, Space, Popconfirm, Tooltip } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

function MainSCAGestionUsuarios() {
  const navigateTo = useNavigate();
  const handelClickmenu = () => navigateTo("/Main");
  //llamado de la API User and role
  const urlUser = "https://localhost:7140/api/User";
  const urlRole = "https://localhost:7140/api/Role";
  //capturamos los datos de la ventana
  const [body, setBody] = useState({
    id: null,
    name: "",
    username: "",
    email: "",
    password: "",
    roleId: null,
  });

  const [rol, setRol] = useState();
  const [roleValue, setRoleValue] = useState({
    id: null,
    roleName: "",
  });

  const [dataSource, setDataSource] = useState();
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [style, setStyle] = useState("botonInicio");
  const [nameboton, setNameBoton] = useState("Crear Usuario");

  //evaluando cada datos de los campos de texto
  const onChange = ({ target }) => {
    const { name, value } = target;
    setBody({
      ...body,
      [name]: value,
    });
    setLoading(true);
  };

  //evaluando el dato del select
  const onChangeTwo = (roleId) => {
    setBody({
      ...body,
      roleId: roleId,
    });
    body.roleId = roleId;
    setLoading(true);
  };

  const userMethods = () => {
    if (nameboton === "Crear Usuario") {
      onSubmit();
    } else if (nameboton === "Editar Usuario") {
      handleEdit();
    }
  };

  //guardamos los datos
  const onSubmit = () => {
    if (
      body.name === "" ||
      body.username === "" ||
      body.email === "" ||
      body.password === "" ||
      body.roleId === null
    ) {
      message.error("Llene los campos");
    } else {
      postData(
        body.username,
        body.password,
        body.roleId,
        body.email,
        body.name
      );
      window.location.reload();
      setLoading(false);
      message.success("Se Creo El usuario");
    }
  };

  //implementacion del POST con fetch
  const postData = async (username, password, role, email, name) => {
    if (role == "") {
      console.log("El valor del Id es nulo");
      return;
    } else {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      const raw = JSON.stringify({
        Username: username,
        Password: password,
        RoleId: role,
        Email: email,
        Name: name,
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };
      fetch(urlUser, requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.log("error", error));
      console.log("se creo el usuario");
    }
  };

  function handleEdit() {
    if (
      body.name === "" ||
      body.username === "" ||
      body.email === "" ||
      body.password === "" ||
      body.roleId === null
    ) {
      message.success("edite o seleccione el campo a actualizar");
    } else {
      setBody({
        ...body,
      });
      putData(
        body.id,
        body.username,
        body.password,
        body.roleId,
        body.email,
        body.name
      );
      setLoading(false);
      window.location.reload();
    }
  }

  function dataTransfer(record) {
    setStyle("botonInicio_Modificar");
    setNameBoton("Editar Usuario");
    body.id = record.id;
    body.username = record.username;
    body.email = record.email;
    body.password = "";
    body.name = record.personName;
    const roleId = Array.from(rol).find((r) => r.label == record.name).value;
    roleValue.id = roleId;
    roleValue.roleName = record.name;
    body.roleId = roleValue.id;
    setLoading(true);
  }

  //implementacion del PUT con fetch
  const putData = (id, username, password, role, email, name) => {
    var myHeaders = new Headers();
    var urlUserConca = urlUser + "/" + id;
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      Id: id,
      Username: username,
      Password: password,
      roleId: role,
      Email: email,
      Name: name,
    });

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(urlUserConca, requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
    message.success("Se Edito El usuario");
  };

  function handleDelete(record) {
    deleteData(record.id);
    message.success("Se Elimino El usuario");
    window.location.reload();
  }

  function handleDeEdit(record) {
    deleteData(record.id);
  }

  //implementacion del DELETE con fetch
  const deleteData = async (id) => {
    var urlUserConca = urlUser + "/" + id;
    var requestOptions = {
      method: "DELETE",
      redirect: "follow",
    };

    fetch(urlUserConca, requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };

  //cargamos los roles del usuario en el select
  const selectData = async () => {
    const response = await fetch(urlRole);
    const data = await response.json();
    const options = data.$values.map((rol) => {
      return { value: rol.id, label: rol.name };
    });
    setRol(options);
  };

  const tableDataUser = async () => {
    const response = await fetch(urlUser);
    const data = await response.json();
    const tableData = data.$values.map((content) => {
      if (content.role != undefined) {
        const { name } = content.role;
        return {
          id: content.id,
          username: content.username,
          password: content.password,
          name: name,
          personName: content.name,
          email: content.email,
        };
      }
    });
    setDataSource(tableData);
    setTotalPages(response.totalPages);
    setLoading(false);
  };

  useEffect(() => {
    selectData();
    tableDataUser();
  }, []);

  return (
    <div className="MainSCAGestionUsuarios">
      <HeaderSCA titulo={"Gestion de Usuarios"}></HeaderSCA>
      <BotonBack oncl={handelClickmenu} texTooltip={"Regresar"}></BotonBack>

      <div className="InputGroupGestionUsuario">
        <CampoTexto
          onChange={onChange}
          value={body.name}
          ph={"Nombre"}
          nm={"name"}
        ></CampoTexto>
        <CampoTexto
          onChange={onChange}
          value={body.username}
          ph={"Usuario"}
          nm={"username"}
        ></CampoTexto>
        <CampoTexto
          onChange={onChange}
          value={body.email}
          ph={"Correo"}
          nm={"email"}
        ></CampoTexto>
        <CampoTexto
          onChange={onChange}
          value={body.password}
          ph={"Contraseña"}
          nm={"password"}
        ></CampoTexto>
        <DropMenu items={rol} onChange={onChangeTwo} ></DropMenu>
        <Boton
          cl={"BotonCrearUsuario"}
          desc={nameboton}
          oncl={userMethods}
          className={style}
        ></Boton>
      </div>
      <TableMain
        columnsName={[
          ...columnsUser,
          {
            title: "Action",
            key: "action",
            render: (_, record) => (
              <Space size="middle">
                <Tooltip placement="bottom" title="Eliminar" color="red">
                  <Popconfirm
                    title="Seguro de eliminar?"
                    onConfirm={() => handleDelete(record)}
                  >
                    <a>
                      <DeleteOutlined className="icodelete" />
                    </a>
                  </Popconfirm>
                </Tooltip>

                <Tooltip placement="bottom" title="Editar" color="green">
                  <Popconfirm
                    title="desea editar?"
                    onConfirm={() => {
                      dataTransfer(record);
                    }}
                  >
                    <a>
                      <EditOutlined />
                    </a>
                  </Popconfirm>
                </Tooltip>
              </Space>
            ),
          },
        ]}
        loading={loading}
        dataSource={dataSource}
        totalPages={totalPages}
      ></TableMain>
    </div>
  );
}

export default MainSCAGestionUsuarios;
