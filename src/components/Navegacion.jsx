import { Link } from 'react-router-dom'

export default function Navegacion() {
    return (
        <>
            <ul
                className="flex items-center flex-1 justify-end gap-3 p-3 "
            >
                <li><Link to="/auth/login">Iniciar Sesión</Link></li>
                <li><Link to="/auth/registro">Registro</Link></li>
            </ul>
        </>
    )
}
