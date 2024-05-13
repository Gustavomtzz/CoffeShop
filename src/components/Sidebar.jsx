import useQuiosco from '../hooks/useQuiosco'
import useAuth from '../hooks/useAuth'
import Categoria from './Categoria'

export default function Sidebar() {

    const { categorias } = useQuiosco()
    const { logout, user } = useAuth({ middleware: 'auth' })


    /** Lo que se encuentra dentro del RETURN es lo que se muestra en pantalla */
    return (
        <aside
            className="md:w-72 h-auto overflow-y-scroll md:h-screen md:flex md:flex-col md:justify-around"
        >
            <div
                className="mt-5"
            >
                <img
                    src="img/logo.svg"
                    alt="Imagen Logotipo"
                    className="w-40 mx-auto"
                />
            </div>

            <div
                className='mt-10 p-1 '
            >
                <p className='mx-2 mb-5 text-lg text-center md:text-start'>Bienvenido: <span className='font-bold uppercase text-xl'>{user?.name}</span></p>
                {/* /* /* Utilizamos MAP para ITERAR y CREAR un nuevo arreglo del archivo JSON "categorias"
                * utilizamos "()" en vez de "{}" en el ARROW FUNCTION, ya que hace que RETORNEMOS O MOSTREMOS CIERTA INFORMACION
                * en caso de tener LOGICA, utilizamos las "{}" y despues RETORNAMOS O MOSTRAMOS con un "return( aqui lo que mostramos)"
                */ }
                {categorias.map(categoria => (
                    // <p>{categoria.nombre}</p> //Las llaves "{}" sirven para especificar que ese codigo es de JAVASCRIPT

                    /**PROPS */
                    /*
                    * Para pasarle datos a un COMPONENTE
                    * en este caso pasariamos cada Objeto "CATEGORIA" al componente "Categoria"
                    * "KEY" siempre que iteramos un arreglo, React espera una "Prop" que sea KEY con un identificador unico
                    * en este caso le pasamos el ID de cada categoria
                    */
                    <Categoria
                        categoria={categoria}
                        key={categoria.id}
                    />
                ))}

            </div>

            <div
                className='my-5 px-5'
            >
                <button
                    type='button'
                    className='text-center bg-red-500 w-full font-bold p-3 text-white truncate'
                    onClick={logout}
                >
                    Cancelar Orden </button>

            </div>

        </aside>
    )
}
