import React, { createContext, useState, useCallback, useMemo, useContext } from "react";


export const DataContext = createContext();

export const DataProvider = ({ children }) => {

  //*Capturamos los estados *
  const [userstate, setuserstate] = useState('');
  const [passworstate, setPassworstate] = useState('');
  const [isAuth, setIsAuth] = useState(localStorage.getItem('AuthAPP') ?? false);
  const [token, setToken] = useState(JSON.parse(localStorage.getItem('Token')) ?? '');
  const [datatoken, setDatatoken] = useState(JSON.parse(localStorage.getItem('dataToken')) ?? '');


  //*Hacemos el llamado a la Api para traer el toke
  async function traerToken(username, password) {
    const user = {
      username,
      password
    }
    const response = await fetch('https://localhost:7140/api/Auth/login', {
      method: 'POST',
      headers: {
        'Acept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user),
    });
    const data = await response.json();
    setToken(data);
    return data;
  }
  //*Hacemos el llamado a la Api para traer la respuesta mandar el token 
  async function respuestatoken(token) {
    const response = await fetch('https://localhost:7140/api/Auth/me', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    const data = await response.json();
    setDatatoken(data);
    localStorage.setItem('dataToken', JSON.stringify(data));
  }

  const loginauth = useCallback(function () {
    localStorage.setItem('AuthAPP', true);
    setIsAuth(true);
  });

  const logoutauth = useCallback(function () {
    localStorage.removeItem('AuthAPP');
    localStorage.removeItem('Token');
    localStorage.removeItem('dataToken');
    setIsAuth(false);
    setuserstate('');
    setPassworstate('');
  });

  const value = useMemo(() => ({
    setToken,
    setuserstate,
    setPassworstate,
    userstate,
    passworstate,
    datatoken,
    token,
    loginauth,
    logoutauth,
    isAuth,
    traerToken,
    respuestatoken
  }), [setToken,
    setuserstate,
    setPassworstate,
    userstate,
    passworstate,
    datatoken,
    token,
    loginauth,
    logoutauth,
    isAuth,
    traerToken,
    respuestatoken
  ])

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  )
}

export function useDataContext() {
  return useContext(DataContext);
}

