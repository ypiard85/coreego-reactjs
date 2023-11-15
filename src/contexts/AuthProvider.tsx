'use client'

import { ReactNode, createContext, useCallback, useContext, useEffect, useState } from 'react';
import { apiFetch } from '../http-common/apiFetch';
import { redirect, useLocation, useNavigate } from "react-router"
import useSWR from 'swr';
import axios from '../http-common/axiosInstance';

const AuthContext = createContext({});

interface AuthProviderProps {
    children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {

    const [user, setUser] = useState<any>(null)
    const navigate = useNavigate()

    useEffect(()=>{
        authentification()
    }, [])

    const authentification = useCallback(()=>{
          new Promise((resolve:any, reject) => {
            axios.get('/me').then((response:any) => {
                resolve(response)
                setUser(response.data)
            }).catch((error:any) => {
                console.log(error)
                reject(error)
            })
          })
    }, [])

    const logout = useCallback(async()=>{
        try {
            await axios.post('/logout')
            navigate('/login')
        } catch (error:any) {
            console.error(error.message)
        }
    }, [])

    return (
        <AuthContext.Provider value={{ user, setUser, logout, authentification }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => useContext(AuthContext);
