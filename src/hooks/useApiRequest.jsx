import { useState } from "react";
import { ServerError } from "../utils/error.util";

const useApiRequest = (url) => {
    //nos conviene guardarlo en el hoook porque no va a a variar entre componentes
    const initialResponseApiState = {
        loading: false,
        error: null,
        payload: null
    }
    const [responseApiState, setResponseApiState] = useState(initialResponseApiState)


    const postRequest = async (body) => {
        try {
            event.preventDefault()
            setResponseApiState((prevstate) => {
                return { ...prevstate, loading: true }
            })
            const response = await fetch(
                url,
                {
                    method: 'POST', //si no se indica por defecto el metodo es GET
                    headers: { //son las cabeceras de la consulta
                        "Content-Type": 'application/json'
                    },//el content type le dice al backend que tipo de archivo vamos a mandar, en este caso json
                    body: JSON.stringify(body)
                }
            )

            const data = await response.json()
            if (data.ok) {
                setResponseApiState((prevstate) => {

                    return { ...prevstate, payload: data }
                })
            }
            else {

                throw new ServerError(data.message, data.status)
            }
        }
        catch (error) {
            setResponseApiState((prevstate) => {
                if (error.status) {//verificamos si es un error de servidor
                    return { ...prevstate, error: error.message }
                }
                return { ...prevstate, error: 'No se pudo enviar la informacion al servidor' }
            })
        }
        finally {
            setResponseApiState((prevstate) => {
                return { ...prevstate, loading: false }
            })
        }
        //enviar el fomrulario (el estado) al backend
    }


    const putRequest = async (body) => {
        try {
            setResponseApiState({ ...initialResponseApiState, loading: true }) //la clonacion es al pedo pero resutla mas sencillo
            const response = await fetch(
                url, //ENVIROMENT.URL_API+ '/api/auth/rewrite-password'
                {
                    method: 'PUT', //si no se indica por defecto el metodo es GET
                    headers: { //son las cabeceras de la consulta
                        "Content-Type": 'application/json'
                    },//el content type le dice al backend que tipo de archivo vamos a mandar, en este caso json
                    body: JSON.stringify(body)
                }
            )

            const data = await response.json()
            if (data.ok) {
                setResponseApiState((prevstate) => {
                    return { ...prevstate, payload: data }
                })
            }
            else {
                throw new ServerError(data.message, data.status)
            }
        }
        catch (error) {
            setResponseApiState((prevstate) => {
                if (error.status) {//verificamos si es un error de servidor
                    return { ...prevstate, error: error.message }
                }
                return { ...prevstate, error: 'No se pudo enviar la informacion al servidor' }
            })
        }
        finally {
            setResponseApiState((prevstate) => {
                return { ...prevstate, loading: false }
            })
        }
    }

    const getRequest = async (authorization_token) => {
        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${authorization_token}`
                }
            });

            if (!response.ok) {
                throw new ServerError(data.message, data.status)
            }

            const data = await response.json();
            console.log('en el getRequest', data)
            setResponseApiState((prevstate) => {
                
                return { ...prevstate, payload: data }
            })
        }
        catch (error) {
            setResponseApiState((prevstate) => {
                if (error.status) {//verificamos si es un error de servidor
                    return { ...prevstate, error: error.message }
                }
                return { ...prevstate, error: 'No se pudo enviar la informacion al servidor' }
            })
        }
        finally {
            setResponseApiState((prevstate) => {
                
                return { ...prevstate, loading: false }
            })
        }

    }
    return { responseApiState, postRequest, putRequest, getRequest }



}

export default useApiRequest