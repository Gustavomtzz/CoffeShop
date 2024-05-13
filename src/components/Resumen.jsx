import { useEffect, useState } from "react";
import useQuiosco from "../hooks/useQuiosco"
import usePedidos from "../hooks/usePedidos";
import ResumenProducto from "./ResumenProducto";
import Alerta from '../components/Alerta';
import SweetAlert from "./SweetAlert";
import { formatearDinero } from "../helpers";


export default function Resumen() {

    const { pedido, setPedido } = useQuiosco();
    const { storePedido } = usePedidos();
    const [total, setTotal] = useState(0);
    const [sweetAlert, setSweetAlert] = useState(false);
    const [errores, setErrores] = useState([]);


    const comprobarPedido = () => pedido.length === 0;

    useEffect(() => {
        const total = pedido.reduce((acumulador, elemento) => {
            return acumulador + (elemento.precio * elemento.cantidad)
        }, 0)
        setTotal(total)
    }, [pedido])

    /**SWEET ALERT 2 */
    const handleSubmitPedido = (e) => {
        e.preventDefault();
        setSweetAlert(true);
    }
    const handleConfirm = () => {
        // Función que se ejecutará después de que el usuario confirme la alerta
        storePedido(total, setErrores);
        // Cerramos SweetAlert
        setSweetAlert(false)
    };
    const handleDismiss = () => {
        // Cerramos SweetAlert
        setSweetAlert(false)
    };
    /**FIN SWEET ALERT 2 */



    return (
        <aside
            className="md:w-72 h-auto overflow-y-scroll p-3 md:h-screen md:flex md:flex-col md:justify-between"
        >
            <h1 className="text-4xl font-black text-center md:text-left my-4">
                Mi Pedido
            </h1>

            <p className="text-2xl my-5">
                Aquí podrás ver el resumen y totales de tu pedido
            </p>

            {errores ? errores.map((error, i) => <Alerta key={i}> {error}</Alerta>) : null}
            <div className="py-10">
                {pedido.length === 0 ? (

                    <p className="text-sm text-slate-600 text-center">Agrega algun producto al carrito de compras</p>

                ) : (

                    pedido.map(producto => (
                        <ResumenProducto
                            key={producto.id}
                            producto={producto}
                        />
                    ))

                )}

            </div>

            <p className="text-xl mt-10">
                Total:{formatearDinero(total)}
            </p>
            <div>
                {sweetAlert && (<SweetAlert onConfirm={handleConfirm} onDismiss={handleDismiss} />)}
            </div>
            <form
                onSubmit={handleSubmitPedido}
                className="w-full"
            >
                <div className="mt-5">
                    <input type="submit"
                        className={`${comprobarPedido() ? 'bg-indigo-100' : 'bg-indigo-600 hover:bg-indigo-800'} px-5 py-2 rounded uppercase font-bold text-white text-center w-full cursor-pointer`} value="Confirmar Pedido"
                        disabled={comprobarPedido()} />
                </div>
            </form>

        </aside >
    )
}
