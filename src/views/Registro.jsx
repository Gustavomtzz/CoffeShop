/** LINK es un componente de REAC ROUTER DOM
 * es similar a un ENLACE "<a>"
 * tiene la ventaja de que al presionar un enlace la PAGINA NO SE RECARGA
 * es como si se actualizar el DOM VIRTUAL con la NUEVA INFORMACION
 */
import { createRef, useState } from 'react'
import useAuth from '../hooks/useAuth';
/**COMPONENTES */
import { Link } from "react-router-dom"
import Alerta from '../components/Alerta';
import Spinner from '../components/Spinner';


export default function Registro() {


    const nameRef = createRef();
    const emailRef = createRef();
    const passwordRef = createRef();
    const password_confirmationRef = createRef();

    const [errores, setErrores] = useState([]);
    const [cargando, setCargando] = useState(false);

    const { registro } = useAuth(
        {
            middleware: 'guest',
            url: '/'
        })

    const handleSubmit = async (e) => {
        e.preventDefault();

        const datos = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: password_confirmationRef.current.value,
        }
        setCargando(true)
        registro(datos, setErrores, setCargando)

    }

    return (
        // <> --> Etiqueta "FRAGMENT" para envolver y retornar un solo "DIV" sin crear una ETIQUETA DIV EXTRA. 
        <>
            <h1 className="text-4xl font-black">Crea tu Cuenta</h1>
            <p>Crea tu cuenta llenando el formulario</p>
            {errores ? errores.map((error, i) => <Alerta key={i}>{error}</Alerta>) : null}

            <div className="bg-white shadow-md rounded-md mt-10 px-5 py-10">
                {cargando && <Spinner />}
                <form
                    onSubmit={handleSubmit}
                    noValidate
                >

                    <div>
                        <label
                            className="text-slate-800"
                            htmlFor="name"
                        >
                            Nombre:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Tu Nombre"
                            className="mt-2 w-full p-3 bg-gray-100"
                            ref={nameRef}
                        />
                    </div>

                    <div>
                        <label
                            className="text-slate-800"
                            htmlFor="email"
                        >
                            Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Tu Email"
                            className="mt-2 w-full p-3 bg-gray-100"
                            ref={emailRef}
                        />
                    </div>

                    <div>
                        <label
                            className="text-slate-800"
                            htmlFor="password"
                        >
                            Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Tu Password"
                            className="mt-2 w-full p-3 bg-gray-100"
                            ref={passwordRef}
                        />
                    </div>

                    <div>
                        <label
                            className="text-slate-800"
                            htmlFor="password_confirmation"
                        >
                            Repetir Password:</label>
                        <input
                            type="password"
                            id="password_confirmation"
                            name="password_confirmation"
                            placeholder="Repite tu Password"
                            className="mt-2 w-full p-3 bg-gray-100"
                            ref={password_confirmationRef}
                        />
                    </div>

                    <input
                        type="submit"
                        value="Crear Cuenta"
                        className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer rounded-md"
                    />

                </form>
            </div>

            <nav className="mt-5">
                <Link to="/auth/login">¿Ya tienes una cuenta? Inicia sesión</Link>
            </nav>

        </>
    )
}
