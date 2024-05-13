import { useEffect } from "react";
import useSWR from "swr"
import { useNavigate } from 'react-router-dom'
import clienteAxios from "../config/axios"
/**
 * Hook useAuth
 * @param {middleware -> especificar en que parte de la aplicación utilizamos el hook, url } param0 
 * @returns @Promise
 */

const useAuth = ({ middleware, url }) => {

    const token = localStorage.getItem('AUTH_TOKEN');
    const navigate = useNavigate();

    const { data: user, error, mutate } = useSWR('/api/user', () =>
        clienteAxios('/api/user', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }, { refreshInterval: 1000 })
            .then(response => response.data)
            .catch(error => {
                throw Error(error?.response?.data?.errors)
            })
    )

    const registro = async (datos, setErrores, setCargando) => {

        try {
            const { data } = await clienteAxios.post('/api/registro', datos)
            localStorage.setItem('AUTH_TOKEN', data.token);
            await mutate()
            setErrores([])
            setCargando(false)
        } catch (error) {
            setErrores(Object.values(error.response.data.errors));
            setCargando(false)
        }
    }


    const login = async (datos, setErrores, setCargando) => {
        try {
            const { data } = await clienteAxios.post('/api/login', datos)
            localStorage.setItem('AUTH_TOKEN', data.token)
            await mutate()
            setErrores([])
            setCargando(false)
        } catch (error) {
            setCargando(false)
            setErrores(Object.values(error?.response?.data?.errors))
        }
    }

    const logout = async () => {

        try {
            await clienteAxios.post('/api/logout', null, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            await mutate(undefined)
            localStorage.removeItem("AUTH_TOKEN")
        } catch (error) {
            throw Error(error?.response?.data?.errors)
        }
    }

    /** ROLES Y PERMISOS DE ACCESO */
    useEffect(() => {
        if (middleware === 'guest' && url && user && !error) {
            navigate(url)
        }
        if (middleware === 'guest' && user && user.admin) {
            navigate('/admin')
        }

        if (middleware === 'admin' && user && !user.admin) {
            navigate('/')
        }

        if (middleware === 'auth' && error) {
            navigate('/auth/login')
        }
    }, [user, error])


    console.log(user)
    return {
        login,
        logout,
        registro,
        user,
        error
    }

}
export default useAuth