import { Link } from "react-router-dom"
import { createRef, useState } from "react"
import useAuth from "../hooks/useAuth.js";
import Alerta from "../components/Alerta.jsx"
import Spinner from "../components/Spinner.jsx";

export default function Login() {

    const emailRef = createRef();
    const passwordRef = createRef();


    const [errores, setErrores] = useState([]);
    const [cargando, setCargando] = useState(false);
    const { login } = useAuth({
        middleware: 'guest',
        url: '/'
    });

    const handleSubmit = e => {

        e.preventDefault();

        /**Peticion para INICIAR SESIÖN
        * Datos [EMAIL, PASSWORD]
        */
        const datos = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        }
        setCargando(true)
        login(datos, setErrores, setCargando)
    }

    return (
        // <> --> Etiqueta "FRAGMENT" para envolver y retornar un solo "DIV" sin crear una ETIQUETA DIV EXTRA. 
        <>
            <h1 className="text-4xl font-black">Iniciar Sesión</h1>
            <p>Para crear un pedido debes iniciar sesión</p>
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



                    <input
                        type="submit"
                        value="Iniciar Sesión"
                        className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer rounded-md"
                    />

                </form>
            </div>

            <nav className="mt-5 flex flex-col gap-2 md:flex-row md:justify-between ">
                <Link to="/auth/registro">¿Aún no tienes una cuenta? Crea una</Link>
                <Link to="/">Ir hacia la TIENDA</Link>
            </nav>
        </>
    )
}
