import * as React from 'react';
import { axiosInstance } from '../axios';

const AuthContext = React.createContext();
const baseUrl = (import.meta.env.MODE) === 'production' ? 'https://server-vn3egejaka-an.a.run.app/api' : 'http://localhost:3301/api'

const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = React.useState(!!localStorage.getItem('sessionToken'))
    const [username, setUsername] = React.useState(localStorage.getItem('username'))
    const [role, setRole] = React.useState(parseInt(localStorage.getItem('role')))
    const [sessionToken, setSessionToken] = React.useState(localStorage.getItem('sessionToken'))

    const login = (username, password) => {
        // Perform login logic here
        try {
            axiosInstance.post('auth/login', {
                username: username,
                password: password
            })
                .then((res) => {
                    if (res.data.result) {
                        setSessionToken(res.data.data.token)
                        setUsername(res.data.data.username)
                        setRole(res.data.data.role)
                        localStorage.setItem('sessionToken', res.data.data.token)
                        localStorage.setItem('username', res.data.data.username)
                        localStorage.setItem('role', res.data.data.role)
                        axiosInstance.defaults.headers.authToken = res.data.data.token
                        setIsLoggedIn(true);
                    } else {
                        alert("Login failed. Wrong credential. ")
                    }
                    return res.data;
                })
        } catch (err) {
            console.log(err)
        }
    };

    const verifySession = () => {
        try {
            axiosInstance.post('auth/verify', {
                token: sessionToken,
            })
                .then((res) => {
                    if (!res.data.result) {
                        alert('Section expired or someone login at another devices.')
                        logout()
                    }
                })
                .catch((rej) => {
                    logout()
                })
        } catch (err) {
            console.log(err)
        }
    }

    const logout = () => {
        setIsLoggedIn(false)
        setSessionToken('')
        setUsername('')
        setRole(0)
        localStorage.clear()
    };

    const authContextValue = {
        isLoggedIn,
        verifySession,
        username,
        role,
        login,
        logout
    };

    return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>;
};

export { AuthProvider, AuthContext };