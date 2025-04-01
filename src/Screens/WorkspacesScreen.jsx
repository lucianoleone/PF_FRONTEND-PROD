import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthContextProvider, { AuthContext } from '../Context/AuthContext';
import useApiRequest from '../hooks/useApiRequest';
import ENVIROMENT from '../config/ENVIROMENT';
import { useForm } from '../hooks/useForm';
import logo from '../assets/images/logo-stack.jpg'
import '../styles/global.css'
import LinkLogo from '../Components/LinkLogo';

const WorkspacesScreen = () => {
    const initialFormState = {
        workspace: ''
    }
    const username = sessionStorage.getItem('username')
    const user_id = sessionStorage.getItem('user_id')
    const url = `${ENVIROMENT.URL_API}/api/workspace/${user_id}`
    const authorization_token = sessionStorage.getItem('authorization_token')

    const { responseApiState, getRequest } = useApiRequest(url)

    const { formState, handleChangeInput } = useForm(initialFormState)

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
    const workspaces = responseApiState.payload?.data?.workspaces || [];


    return (
        <div>
            <header>
                
                    <LinkLogo />
                
                <div className="brand-logo">
                    <button className="btn-nav">
                        <i className="bi bi-list"></i>
                    </button>
                </div>
            </header>
            <div className='register-screen'>
                <div>
                    <h2>Bienvenido {username}</h2>
                </div>
                <div className='input-container'>
                    {responseApiState.loading && <p>Cargando...</p>}
                    {responseApiState.error && <p>Error: {responseApiState.error}</p>}
                    {workspaces.length > 0 ? (
                        <ul>
                            {workspaces.map((workspace) => (
                                <li style={{ listStyle: 'none' }} key={workspace._id}>
                                    <Link to={`/workspace/${workspace._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                        {workspace.name}
                                    </Link>
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
            <div>
                <header>
                    <div className="brand-logo">
                        <div className="brand-logo-icon">
                            <img src={logo} alt="" />
                        </div>
                        <div className="brand-logo-text">
                            <h2>stack</h2>
                        </div>
                    </div>
                    <div className="brand-logo">
                        <button className="btn-nav">
                            <i className="bi bi-list"></i>
                        </button>
                    </div>
                </header>

                <div className='input-container'>
                    <h1>WorkspaceScreen</h1>
                    <h2>Bienvenido {username}</h2>
                </div>
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
        </div>
    );
}
export default WorkspacesScreen

