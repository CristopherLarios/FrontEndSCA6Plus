import React, { createContext, useState, useEffect } from "react";

export const DataContextMain = createContext();

export const DataProvider = ({ children }) => {

    //Estado para capurar el estado de la respuesta de la API
    const [UnidadesAdministrativas, setUnidadesAdministrativas] = useState('');
    const urlUA = ' http://localhost:3000/administrative_units';

    //Traemos las UA
    useEffect(() => {
        const traerUA = async () => {
            const response = await fetch(urlUA)
            const data = await response.json()
            const option = data.map((ua) => {
                return { value: ua.id, label: ua.name };
            });
            setUnidadesAdministrativas(option);
        };
        traerUA();
    }, [])


    return (
        <DataContextMain.Provider value={{UnidadesAdministrativas}}>
            {children}
        </DataContextMain.Provider>
    )
}