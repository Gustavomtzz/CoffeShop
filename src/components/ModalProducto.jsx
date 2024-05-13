import { useState, useEffect } from "react";
import useQuiosco from "../hooks/useQuiosco";
import { createRef } from 'react';
import { formatearDinero } from "../helpers";



export default function ModalProducto() {

    const { producto, handleClickModal, handleAgregarPedido, pedido } = useQuiosco();
    const { categoria_id, id, imagen, nombre, precio } = producto;
    const [cantidad, setCantidad] = useState(1);
    const [edicion, setEdicion] = useState(false);

    useEffect(() => {
        if (pedido.some(pedidoState => pedidoState.id === producto.id)) {
            const productoEdicion = pedido.filter(pedidoState => pedidoState.id === producto.id)[0]
            setCantidad(productoEdicion.cantidad)
            setEdicion(true)
        }
    }, [pedido])

    const handleClickCantidad = (operacion) => {
        if (!operacion) {

            if (cantidad <= 1) return

            setCantidad(cantidad - 1)
            return;
        }

        if (cantidad >= 5) return

        setCantidad(cantidad + 1)
    }

    return (
        <>
            <div
                className="flex justify-end "
            >
                <button
                    onClick={handleClickModal}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z" clipRule="evenodd" />
                    </svg>

                </button>

            </div>
            <div
                className="text-center md:text-left  md:flex gap-5"
            >
                <div
                    className="md:w-1/3"
                >

                    <img
                        src={`/img/${imagen}`}
                        alt={`Imagen ${nombre}`}
                        className="w-96  mx-auto"
                    />
                </div>


                <div
                    className="md:w-2/3"
                >


                    <h3
                        className="text-3xl font-bold "
                    >{nombre}</h3>

                    <p
                        className="mt-5 font-black text-5xl text-amber-500"
                    >{formatearDinero(precio)}</p>

                    <div className="flex gap-4 mt-5">
                        <button
                            onClick={() => {
                                handleClickCantidad(false)
                            }}
                        >

                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>



                        </button>

                        <p className="font-semibold text-2xl" >{cantidad}</p>

                        <button
                            onClick={() => {
                                handleClickCantidad(true)
                            }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>

                        </button>

                    </div>

                    <button
                        onClick={() => {
                            handleAgregarPedido({ ...producto, cantidad: cantidad })
                            handleClickModal()
                        }}
                        type="button"
                        className="bg-indigo-600 hover:bg-indigo-800 px-5 py-2 mt-5 text-white font-bold uppercase rounded"
                    >{edicion === false ? "Añadir Pedido" : "Guardar Cambios"}</button>
                </div>

            </div >
        </>
    )
}
