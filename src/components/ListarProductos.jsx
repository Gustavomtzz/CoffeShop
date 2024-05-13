import useSWR from 'swr';
import clienteAxios from '../config/axios'

import Producto from '../components/Producto'

export default function ListarProductos() {


    const token = localStorage.getItem('AUTH_TOKEN');

    const fetcher = () => {
        return clienteAxios('/api/productos', { headers: { Authorization: `Bearer ${token}` } })
            .then(datos => datos.data)
    }

    const { data: productos, error, isLoading } = useSWR('/api/productos', fetcher, { refreshInterval: 10000 })

    //**MANEJAR ACTUALIZAR Y BORRAR PRODUCTO */

    console.log(productos)

    // El array vacío [] asegura que esto solo se ejecute una vez, equivalente a componentDidMount
    return (
        <div className='flex flex-col p-3 bg-white divide-y-4'>
            {/* Verificamos si hay productos y los mostramos */}
            {isLoading && (<p>Cargando...</p>)}
            {productos?.data.length > 0 && productos?.data.map(producto => (
                < Producto
                    key={producto.id}
                    producto={producto}
                    botonEditar={true}
                />
            ))
            }
        </div>
    )
}
