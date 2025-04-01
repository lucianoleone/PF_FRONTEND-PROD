import React, { use, useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../styles/global.css'
import { useForm } from '../hooks/useForm'
import useApiRequest from '../hooks/useApiRequest'
import LinkLogo from '../Components/LinkLogo'
import StartButton from '../Components/StartButton'
import ENVIROMENT from '../config/ENVIROMENT'
import AuthContextProvider, { AuthContext } from '../Context/AuthContext'


const LoginScreen = () => {
    const initialFormState = { 
        email: '', 
        password: '' 
    }
    //con el hook useForm se obtiene el estado del formulario y se va alamcenando de modo de al momento de realizar el submit se tiene la informacion actualizada y se muestra en la pantalla
    const {formState, handleChangeInput} = useForm(initialFormState)
    //con este hook se obtiene el estado de la respuesta de la api
    const {responseApiState, postRequest} = useApiRequest(ENVIROMENT.URL_API+'/api/auth/login')
    const {username, logout,login}= useContext(AuthContext)
    const navigate = useNavigate()
    useEffect(() => {
        if(responseApiState.payload){
            login(responseApiState.payload.payload.authorization_token)
            if(responseApiState.payload.ok===true){
                let username = sessionStorage.setItem('username',responseApiState.payload.payload.username)
                let user_id = sessionStorage.setItem('user_id',responseApiState.payload.payload.user_id)
                navigate('/workspaces')
            }
        }
    },[responseApiState]) 
    
    const handleSubmitForm = async (e) => {
        e.preventDefault()
        await postRequest(formState) 
       
    }
    return (
        <div>
            <header>
                <LinkLogo />
                <StartButton />
            </header>

            <div className={"login-screen"}>
                <h1>Ingresa ahora</h1>
                <form onSubmit={handleSubmitForm}>
                    <div className='input-container'>
                        <label htmlFor="email">Email: </label>
                        <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            value={formState.email} 
                            onChange={handleChangeInput}
                        />
                    </div>
                    <div className='input-container'>
                        <label htmlFor="password">Contraseña: </label>
                        <input 
                            type="password" 
                            id="password" 
                            name="password" 
                            value={formState.password} 
                            onChange={handleChangeInput}
                        />
                    </div>
                    <div className='input-container'>
                        {responseApiState.error && <span>{responseApiState.error}</span>}
                        {responseApiState.loading
                            ? <span>Cargando...</span>
                            : <button className='btn-dark'type="submit">Iniciar Sesion</button>
                        }
                    </div>
                    <div className='input-container'>
                        <Link to={'/reset-password'}>Olvide mi contraseña</Link>
                    </div>
                </form>
                {/* <div className='input-container'>
                        <button className='btn-dark'onClick={logout}>Cerrar Sesion</button>
                        
                    </div> */}
            </div>
        </div>
    )
}

export default LoginScreen