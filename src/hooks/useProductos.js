import autoprefixer from "autoprefixer";
import clienteAxios from "../config/axios";

const useProductos = () => {

    const token = localStorage.getItem('AUTH_TOKEN');

    const updateProducto = async ({ id, ...producto }) => {
        try {
            const { data } = await clienteAxios.put(`/api/productos/${id}`, producto, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log(data)
            return data
        } catch (error) {
            return error
        }
    }

    const deleteProducto = async (id) => {
        try {
            const { data } = await clienteAxios.delete(`/api/productos/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log(data)

        } catch (error) {
            return error
        }
    }



    return {
        updateProducto,
        deleteProducto,
    }

}

export default useProductos;