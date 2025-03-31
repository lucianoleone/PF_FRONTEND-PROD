import React from "react";
import { useForm } from "../hooks/useForm";
import useApiRequest from "../hooks/useApiRequest";
import ENVIROMENT from "../config/ENVIROMENT";
import { Link } from "react-router-dom";
import logo from '../assets/images/logo-stack.jpg'

const ResetPasswordScreen = () => {
    const formInitialState = {
        email: ''
    }
    const { formState, handleChangeInput } = useForm(formInitialState)
    const { responseApiState, postRequest } = useApiRequest(ENVIROMENT.URL_API + '/api/auth/reset-password')
    const handleSubmitForm = async (e) => {
        e.preventDefault()
        await postRequest(formState)
    }
    return (
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
                    <Link className={"btn-dark"} to={'/login'}>
                        INGRESAR
                    </Link>
                    <button className="btn-nav">
                        <i className="bi bi-list"></i>
                    </button>
                </div>
            </header>
        <div className="login-screen">
            <h1>Reset Password</h1>
            <form onSubmit={handleSubmitForm}>
                <div className="input-container">
                    <label htmlFor="email">Email</label>
                    <input 
                        placeholder="Email" 
                        type="email" 
                        id="email" 
                        name='email' 
                        value={formState.email} 
                        onChange={handleChangeInput} />
                </div>
                <div className="input-container">
                    { responseApiState.loading 
                        ? <span>Loading...</span> 
                        :( responseApiState.payload
                            ? <span>Se envio un correo a {formState.email} para resetear tu contraseña</span>
                            :<button className='btn-dark' type='submit'>Reestablecer contraseña</button> 
                        )
                    }
                </div>
            </form>
        </div>
        </div>
    );
}
export default ResetPasswordScreen