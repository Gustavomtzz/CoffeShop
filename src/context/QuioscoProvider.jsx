/**
 * Un PROVIDER es una "FUNCION", normal o arrow function
 * y siempre retorna algo
 * @returns 
 * lo que coloques en este return, van a ser variables o funciones
 * cuando lo mandes a llamar vas a tener acceso
*/

// El contexto (context) en React se utiliza para compartir datos que son relevantes en toda la aplicación, especialmente cuando hay múltiples componentes que necesitan acceder a esos datos. Si tienes datos que son específicos de un componente o que no necesitan ser compartidos a nivel global, no es obligatorio incluirlos en el contexto.

/**
 * useSTATE es un hook incluido en react, el mas utilizado de todos
 * en tu STATE vas a ir definiendo los datos que pueden cambiar a futuro en tu aplicacion
 * en base a ciertas interacciones de los usuarios
 * EJ: Si un usuario esta autenticado o no. puede ser que al inicio no este autenticado
 * pero haciendo ciertas acciones, puede cambiar su estado a autenticado
 * EJ: un carrito de compras su estado del arreglo puede ser vacio
 * e irse llenando con ciertas acciones
 */

import { createContext, useEffect, useState } from "react"
import { toast } from 'react-toastify';
import clienteAxios from "../config/axios";
const QuioscoContext = createContext();


const QuioscoProvider = ({ children }) => {

    //CONVENCION al utilizar useState
    const [categorias, setCategorias] = useState([]);
    const [categoriaActual, setCategoriaActual] = useState({});
    const [modal, setModal] = useState(false);
    const [producto, setProducto] = useState({})
    const [pedido, setPedido] = useState([])


    const obtenerCategorias = async () => {

        try {
            const { data } = await clienteAxios('/api/categorias')
            setCategorias(data.data)
            setCategoriaActual(data.data[0])

        } catch (error) {
            console.log(error);
        }
    }

    //Cuando cargue este COMPONENTE mandamos a llamar Categoria APi
    useEffect(() => {
        obtenerCategorias()
    }, [])


    //CONVENCION cuando hay un evento en este caso "click", debemos comenzar con "handle"
    const handleClickCategoria = id => {
        const categoria = categorias.filter(categoria => categoria.id === id)[0]
        setCategoriaActual(categoria)
    }

    //Funcion reutilizable tanto para mostrar como ocultar modal
    const handleClickModal = () => {
        setModal(!modal)
    }

    //Setear Producto a mostrar en el Modal
    const handleSetProducto = producto => {
        setProducto(producto)
    }

    //Agregar producto al pedido
    const handleAgregarPedido = ({ categoria_id, ...producto }) => {

        if (pedido.some(pedidoState => pedidoState.id === producto.id)) {
            const pedidoActualizado = pedido.map(pedidoState => pedidoState.id === producto.id ? producto : pedidoState)
            setPedido(pedidoActualizado)
            toast.warn('Actualizado correctamente', {
                icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                </svg>
            })
            return;
        }

        //Agregar un nuevo elemento al carrito
        setPedido([...pedido, producto])
        toast.success('Agregado al Pedido')
    }

    const handleEditarCantidad = id => {
        const productoActualizar = pedido.filter(producto => producto.id === id)[0]
        setProducto(productoActualizar)
        setModal(!modal)
    }

    const handleEliminarProductoPedido = id => {
        const pedidoActualizado = pedido.filter(producto => producto.id !== id)
        setPedido(pedidoActualizado)
        toast.error('Producto eliminado correctamente')
    }

    return (
        <QuioscoContext.Provider
            value={{
                categorias,
                categoriaActual,
                handleClickCategoria,
                modal,
                handleClickModal,
                handleSetProducto,
                producto,
                pedido,
                setPedido,
                handleAgregarPedido,
                handleEditarCantidad,
                handleEliminarProductoPedido
            }}
        >{children}</QuioscoContext.Provider>

    )
}

export {
    QuioscoProvider
}

export default QuioscoContext