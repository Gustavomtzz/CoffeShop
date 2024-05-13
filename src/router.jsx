import { createBrowserRouter } from 'react-router-dom'
/** COMPONENTES LAYOUTS A IMPORTAR */
import Layout from './layouts/Layout'
import AuthLayout from './layouts/AuthLayout'
import AdminLayout from './layouts/AdminLayout'
/** COMPONENTES HIJOS A IMPORTAR */
import Inicio from './views/Inicio'
import Login from './views/Login'
import Registro from './views/Registro'
import Productos from './views/Productos'
import Ordenes from './views/Ordenes'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />, /**LLamamos el componente a renderizar */
        children: [
            {
                /** "INDEX: true" Carga el COMPONENTE HIJO cuando visito la RUTA ESPECIFICADA Ej:'/'
                 * si NO lo pongo, debo especificar una NUEVA RUTA para cargar el COMPONENTE HIJO
                 * Ejemplo: path: '/inicio'
                 */
                index: true,
                element: <Inicio />
            }
        ]
    },
    {
        path: '/auth',
        element: <AuthLayout />,
        children: [
            {
                /** "INDEX: true" Carga el COMPONENTE HIJO cuando visito la RUTA ESPECIFICADA Ej:'/auth'
                 * si NO lo pongo, debo especificar una NUEVA RUTA para cargar el COMPONENTE HIJO
                 * Ejemplo: path: '/auth/login'
                 */
                path: '/auth/login',
                element: <Login />
            },
            {
                path: '/auth/registro',
                element: <Registro />
            }
        ]
    },
    {
        path: '/admin',
        element: <AdminLayout />,
        children: [
            {
                index: true,
                element: <Ordenes />
            },
            {
                path: '/admin/productos',
                element: <Productos />
            }
        ]
    }

])

export default router