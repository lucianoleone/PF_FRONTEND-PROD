import { createContext, useEffect, useState } from "react";


export const AuthContext = createContext();
const AuthContextProvider = ({ children }) => {
    let isAuthenticatedInitialState = sessionStorage.getItem('authorization_token')
    
    const [isAuthenticatedState, setIsAuthenticatedState] = useState(isAuthenticatedInitialState)
    useEffect(() => {
        const token = sessionStorage.getItem('authorization_token')
        if (token) {
            setIsAuthenticatedState(true)
            //console.log(' Se obtuvo un token, el valor de isAuthenticatedState es', isAuthenticatedState)
        }
    }, [])
    const logout = () => {
        sessionStorage.removeItem('authorization_token')
        sessionStorage.removeItem('username')
        sessionStorage.removeItem('user_id')
        setIsAuthenticatedState(false)
        //console.log(' Funcion de logout, el valor de isAuthenticatedState es', isAuthenticatedState)
    }

    const login = (authorization_token) => {
        sessionStorage.setItem('authorization_token', authorization_token)
        setIsAuthenticatedState(true)
        
        //console.log(' Funcion de login, el valor de isAuthenticatedState es', isAuthenticatedState)
    }
    return (
        <AuthContext.Provider value={{ isAuthenticatedState, logout, login }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider