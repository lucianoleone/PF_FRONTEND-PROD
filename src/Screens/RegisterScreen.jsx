import React, { useState } from "react";
import { useForm } from "../hooks/useForm";
import '../styles/global.css';
import ENVIROMENT from '../config/ENVIROMENT.js';
import useApiRequest from "../hooks/useApiRequest";
import { Link } from "react-router-dom";
import LinkLogo from "../Components/LinkLogo.jsx";


const RegisterScreen = () => {
    const formInitialState = {
        username: '',
        email: '',
        password: '',
        profile_img_base64: ''
    }
    const { formState, handleChangeInput } = useForm(formInitialState)
    const { responseApiState, postRequest } = useApiRequest(ENVIROMENT.URL_API+'/api/auth/register')
    
    const handleSubmitForm = async (e) => {
        e.preventDefault()
        await postRequest(formState)
        console.log(responseApiState)
    }
    return (
        <div>
            <header>
                <LinkLogo />
                <div className="brand-logo">
                    <Link className={"btn-dark"} to={'/login'}>
                        INGRESAR
                    </Link>
                    <button className="btn-nav">
                        <i className="bi bi-list"></i>
                    </button>
                </div>
            </header>

            <div className="register-screen">
                <h1>Registrate en stack</h1>
                <form onSubmit={handleSubmitForm}>
                    {/* <div>
                    <label htmlFor='profile_img_base64'></label>
                    <input type="file" name='profile_img_base64' id="profile_img_base64" onChange={handleChangeInput}/>
                </div> */}
                    <div className="input-container">
                        <label htmlFor="username">Username</label>
                        <input 
                            placeholder="Username" 
                            type="text" 
                            id="username" 
                            name='username' 
                            value={formState.username} 
                            onChange={handleChangeInput} 
                        />
                    </div>
                    <div className="input-container">
                        <label htmlFor="email">Email</label>
                        <input 
                            placeholder="Email" 
                            type="email" 
                            id="email" 
                            name='email' 
                            value={formState.email} 
                            onChange={handleChangeInput} 
                        />
                    </div>
                    <div className="input-container">
                        <label htmlFor="password">Password</label>
                        <input 
                            placeholder="Password" 
                            type="password" 
                            id="password" 
                            name='password' 
                            value={formState.password} 
                            onChange={handleChangeInput} 
                        />
                    </div>
                    <div className="input-container">
                    {
                    responseApiState.loading 
                    ? <span>Cargando...</span> 
                    : <button className="btn-dark" type="submit">Registrar</button>
                }               
                    </div>
                    <div className="input-container">
                        {responseApiState.error && <span>{responseApiState.error}</span>}
                    </div>
                    

                </form>
            </div>
        </div>
    );
}
export default RegisterScreen