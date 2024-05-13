import { useState, useEffect } from 'react';
import { createRef } from 'react';
import usePedidos from '../hooks/usePedidos';
import { formatearDinero } from '../helpers/index';
export default function ListarPedidos() {

    const { listarPedidos, finalizarPedido, filtrarPedidos } = usePedidos();
    // Definimos el estado para almacenar los pedidos
    const [pedidos, setPedidos] = useState([]);
    const [name, setName] = useState("")
    /**Formulario para filtros de Busqueda */
    //Definimos los Campos del Formulario
    const estadoRef = createRef();
    const nameRef = createRef();

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const filtrosDeBusqueda = {
            name: nameRef.current.value,
            estado: estadoRef.current.value,
        }
        const data = await filtrarPedidos(filtrosDeBusqueda)
        setPedidos(data)
    }

    const limpiarFiltros = () => {
        obtenerPedidos();
        setName("")
    }
    /** FIN Formulario para filtros de Busqueda */


    // Definimos la función asíncrona para obtener los pedidos
    const obtenerPedidos = async () => {
        const data = await listarPedidos()
        setPedidos(data)
    }
    // Usamos useEffect para llamar a la función obtenerPedidos cuando el componente se monta
    useEffect(() => {
        obtenerPedidos()
    }, [])// El array vacío [] asegura que esto solo se ejecute una vez, equivalente a componentDidMount

    /**Funcion para manejar el FINALIZAR PEDIDO */
    const handleSubmit = async (id) => {
        try {
            // Realizar la operación para finalizar el pedido y obtener los datos actualizados
            const updatedPedido = await finalizarPedido(id);

            // Buscar el índice del pedido actual en el array de pedidos
            const pedidoIndex = pedidos.findIndex(pedido => pedido.id === id);

            // Crear una copia del array de pedidos
            const updatedPedidos = [...pedidos];

            // Reemplazar el pedido antiguo con el pedido actualizado en la copia del array
            updatedPedidos[pedidoIndex] = updatedPedido;

            // Actualizar el estado con el nuevo array de pedidos que contiene el pedido actualizado
            setPedidos(updatedPedidos);
        } catch (error) {
            console.error('Error finalizing pedido:', error);
        }
    }
    return (
        <div className="flex flex-col shadow-xl border border-gray-300 p-5">
            {/*Filtro de Busqueda */}
            <div className='w-full p-2 mb-2 flex flex-col items-center gap-2 lg:flex-row '>


                <form
                    className='flex flex-col flex-1 gap-3 lg:flex-row justify-around items-center w-full'
                    onSubmit={handleFormSubmit}
                    noValidate>

                    <div className='flex items-center flex-1 w-full gap-1'>
                        <label
                            className="text-slate-800 text-nowrap"
                            htmlFor="name"
                        >
                            Buscar por Cliente:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Nombre del Cliente"
                            className="mt-2 w-full p-3 bg-white flex-1"
                            ref={nameRef}
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </div>

                    <div className='flex items-center gap-1 w-full lg:w-auto'>
                        <legend>Filtrar por Estado:</legend>
                        <select name="filtros" id="filtros" ref={estadoRef} className='flex-1'>
                            <option value="2" defaultValue>Todos</option>
                            <option value="0" >Pendientes</option>
                            <option value="1">Completados</option>
                        </select>
                    </div>

                    <input
                        type="submit"
                        value="Buscar"
                        className="bg-indigo-600 hover:bg-indigo-800 text-white h-10 w-full lg:w-auto p-2 uppercase font-bold cursor-pointer rounded-md"
                    />

                </form>

                <button
                    onClick={limpiarFiltros}
                    className="bg-red-600 hover:bg-red-800 text-white h-10 p-2 uppercase font-bold cursor-pointer rounded-md w-full lg:w-auto"
                ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 mx-auto hover:animate-bounce">
                        <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>

            {/* Renderizamos los pedidos */}
            <ul className='gap-5 lg:grid lg:grid-cols-2 bg-white p-3  ' >
                {pedidos.length > 0 && pedidos.map(({ user, productos, ...pedido }) => (

                    <li key={pedido.id} className='shadow-md mb-4 py-4 flex flex-col gap-2 lg:grid lg:grid-cols-4 p-5' >
                        <p className='font-semibold'>Pedido Nro: <span className='font-normal'>{pedido.id}</span></p>
                        <p className='font-semibold'>Cliente: <span className='font-normal'>{user.name}</span></p>
                        <p className='font-semibold'>Email del Cliente: <span className='font-normal'>{user.email}</span></p>
                        <p className='font-semibold'>Estado: <span className={pedido.estado ? "text-green-500" : "text-red-500"}>{pedido.estado ? 'Completado' : 'En Proceso'}</span></p>
                        <ul className='font-semibold col-span-2 mt-1 lg:col-span-4 text-center lg:text-start'>Productos
                            {productos.map(producto =>
                                <li key={producto.id} className='flex flex-col my-2 lg:grid lg:grid-cols-4 text-start'>
                                    <p className='font-semibold col-span-2'>Nombre: <span className='font-normal'>{producto.nombre}</span></p>
                                    <p className='font-semibold'>Cantidad: <span className='font-normal'>{producto.pivot.cantidad}</span></p>
                                    <p className='font-semibold'>Precio: <span className='font-normal'>{producto.precio}</span></p>
                                </li>)}
                        </ul>
                        <button
                            type='submit'
                            onClick={() => {
                                handleSubmit(pedido.id)
                            }}
                            className='bg-blue-500 border border-blue-800 rounded-sm py-1 text-white font-semibold md:w-36 md:h-12'>Finalizar Pedido</button>
                        <p
                            className="font-bold uppercase col-start-3 col-span-2 flex items-center ">Total a pagar:&nbsp;<span className='text-orange-500'>{formatearDinero(pedido.total)}</span></p>
                    </li>
                ))
                }
                {!pedidos.length && (<p className="font-bold uppercase">No hay Pedidos disponibles</p>)}
            </ul >
        </div >
    )
}
