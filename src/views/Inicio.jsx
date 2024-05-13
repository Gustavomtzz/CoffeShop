// import { productos } from '../data/productos'
import Producto from '../components/Producto'
import useQuiosco from '../hooks/useQuiosco'
import useSWR from 'swr'
import clienteAxios from '../config/axios'
import { useEffect, useState } from 'react'


export default function Inicio() {

    const { categoriaActual } = useQuiosco()


    const token = localStorage.getItem('AUTH_TOKEN');

    const fetcher = () => {
        return clienteAxios('/api/productos', { headers: { Authorization: `Bearer ${token}` } })
            .then(datos => datos.data)
    }

    const { data: productos, error, isLoading } = useSWR('/api/productos', fetcher, { refreshInterval: 10000 })


    return (
        <>
            <h1
                className='text-4xl font-black text-center md:text-left my-4'
            >{categoriaActual.nombre}</h1>
            <p
                className='text-2xl my-5 text-center md:text-left'
            >Elíge y personaliza tu pedido a continuación</p>

            <div
                className='grid gap-4 grid-cols-1  lg:grid-cols-3'
            >
                {productos?.data.filter(producto => producto.categoria_id === categoriaActual.id && producto.disponibilidad === 1).map(producto => (
                    // <p>{categoria.nombre}</p> //Las llaves "{}" sirven para especificar que ese codigo es de JAVASCRIPT

                    /**PROPS */
                    /*
                    * Para pasarle datos a un COMPONENTE
                    * en este caso pasariamos cada Objeto "PRODUCTO" al componente "Producto"
                    * "KEY" siempre que iteramos un arreglo, React espera una "Prop" que sea KEY con un identificador unico
                    * en este caso le pasamos el ID de cada producto
                    */
                    <Producto
                        key={producto.id}
                        producto={producto}
                        botonAgregar={true}
                    />
                ))}
            </div>
        </>
    )
}
