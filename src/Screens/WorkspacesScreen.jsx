import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthContextProvider, {AuthContext} from '../Context/AuthContext';
import useApiRequest from '../hooks/useApiRequest';
import ENVIROMENT from '../config/ENVIROMENT';
import { useForm } from '../hooks/useForm';


const WorkspacesScreen = () => {
    const initialFormState = { 
        workspace: ''
    }
    const username = sessionStorage.getItem('username')
    const user_id = sessionStorage.getItem('user_id')
    const url=`${ENVIROMENT.URL_API}/api/workspace/${user_id}`
    const authorization_token = sessionStorage.getItem('authorization_token')

    const {responseApiState, getRequest} = useApiRequest(url)

    const {formState, handleChangeInput} = useForm(initialFormState)
    
    useEffect(() => {
        const getWorkspaces = async () => {
            try {
                await getRequest(authorization_token); // Ejecuta la petición
            } catch (error) {
                console.error("Error al obtener workspaces:", error);
            }
        };
    
        getWorkspaces(); // Llamada inicial
    }, []); //
    

    
    console.log('respone: ', responseApiState.payload);
    const workspaces = responseApiState.payload?.data?.workspaces || [];


    return (
        <div>
            <h1>WorkspaceScreen</h1>
            <h2>Bienvenido {username}</h2>
            <div>
                {responseApiState.loading && <p>Cargando...</p>}
                {responseApiState.error && <p>Error: {responseApiState.error}</p>}
                {workspaces.length > 0 ? (
                    <ul>
                        {workspaces.map((workspace) => (
                            <li key={workspace._id}>
                                {/* Solo mostrar el nombre del workspace */}
                                {workspace.name}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No tienes workspaces.</p>
                )}
            </div>
            <div>
                <form>
                    <div className='input-container'>
                        <label htmlFor="workspace">Crea un nuevo workspace </label>
                        <input
                            type="text"
                            id="workspace"
                            name="workspace"
                            value={formState.workspace}
                            onChange={handleChangeInput}
                        />
                    </div>
                    <div className='input-container'>
                        <button className='btn-dark' type="submit">Crear</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default WorkspacesScreen

