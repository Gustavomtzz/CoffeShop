import clienteAxios from "../config/axios";
import { toast } from "react-toastify";
import useQuiosco from "./useQuiosco";

const usePedidos = () => {

    const token = localStorage.getItem('AUTH_TOKEN');
    const { pedido, setPedido } = useQuiosco();


    const listarPedidos = async () => {
        try {
            const { data } = await clienteAxios({
                url: '/api/pedidos',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            return data.pedidos;
        } catch (error) {
            console.log(error)
        }
    }


    const storePedido = async (total, setErrores) => {

        const datos = {
            productos: pedido.map(producto => {
                return {
                    id: producto.id,
                    cantidad: producto.cantidad,
                }
            }),
            total: total,
        }

        try {
            const { data } = await clienteAxios.post('/api/pedidos', datos, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            toast.success('Pedido realizado correctamente, su pedido esta en proceso...')
            setErrores([])
            setTimeout(() => {
                setPedido([])
            }, 1000);
        } catch (error) {
            // setErrores(Object.values(error.response.data));
            console.log(error)
        }

    }

    const finalizarPedido = async (id) => {
        try {
            const { data } = await clienteAxios.patch(`api/pedidos/${id}`, null, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            return data.pedido
        } catch (error) {
            console.log(error)
        }
    }


    const filtrarPedidos = async (filtros) => {

        //Objeto con los parametros de Filtro

        //Convertir en un QueryParameters
        const parametros = new URLSearchParams(filtros).toString();
        try {
            const { data } = await clienteAxios(`/api/pedidos/?${parametros}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            return data.pedidos;
        } catch (error) {
            console.log(error)
        }
    }


    return {
        listarPedidos,
        storePedido,
        finalizarPedido,
        filtrarPedidos,
    }

}

export default usePedidos