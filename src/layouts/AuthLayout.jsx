/**OUTLET sirve para INJECTAR CODIGO DENTRO de nuestro layout */
import { Outlet } from 'react-router-dom'
import Navegacion from '../components/Navegacion'

export default function AuthLayout() {
    return (
        <div>
            <nav>
                <Navegacion />
            </nav>

            <main
                className='max-w-4xl mx-auto mt-10 md:mt-28 flex flex-col md:flex-row md:items-center'
            >
                <img
                    src="../img/logo.svg"
                    alt="Imagen Logotipo"
                    className='max-w-xs p-10 md:p-0'
                />

                <div
                    className='p-10 w-full text-center md:text-left'
                >
                    <Outlet />
                </div>
            </main>
        </div>
    )
}
