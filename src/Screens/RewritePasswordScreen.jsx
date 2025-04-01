import React, { useEffect, useState } from "react";
import { useForm } from "../hooks/useForm";
import useApiRequest from "../hooks/useApiRequest";
import ENVIROMENT from "../config/ENVIROMENT";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import LinkLogo from "../Components/LinkLogo";
import StartButton from "../Components/StartButton";
import '../styles/global.css'



const RewritePasswordScreen = () => {
    const navigate = useNavigate()

    const [searchParams] = useSearchParams(window.location.search)
    const reset_token = searchParams.get('reset_token')
    useEffect(() => {
        if (!reset_token) {
            navigate('/login')
        }
    },
        []
    )
    const formInitialState = {
        password: ''
    }
    const { formState, handleChangeInput } = useForm(formInitialState)
    const { responseApiState, putRequest } = useApiRequest(ENVIROMENT.URL_API + '/api/auth/rewrite-password')

    useEffect(() => {
        if (responseApiState.payload) {
            navigate('/login')
        }
    },
        [responseApiState]
    )
    const handleSubmitForm = async (e) => {
        e.preventDefault()
        await putRequest({ password: formState.password, reset_token })

    }
    return (
        <div>
            <header>
                <LinkLogo />
                <StartButton />
            </header>
            <div className="login-screen">
                <h1>Reestablecer Constraseña</h1>
                <form onSubmit={handleSubmitForm}>
                    <div className="input-container">
                        <label htmlFor="password">Nuevo password</label>
                        <input
                            type="text"
                            name="password"
                            id="password"
                            value={formState.password}
                            onChange={handleChangeInput}
                        />
                    </div>
                    <div className="input-container">
                        {responseApiState.error && <span color="red">{responseApiState.error}</span>}
                        {
                            responseApiState.loading
                                ? <span>Cargando...</span>
                                : (
                                    responseApiState.payload
                                        ? <span>Contraseña Reestablecido</span>
                                        : <button className="btn-dark" type="submit">Restore Password</button>
                                )

                        }

                    </div>
                </form>
            </div>
        </div>
    )
}
export default RewritePasswordScreen

