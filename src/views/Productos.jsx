import ListarProductos from '../components/ListarProductos'

export default function Productos() {
    return (
        <div>
            <h1 className="text-4xl font-black">Productos</h1>
            <p className="text-2xl my-10">
                Maneja la disponibilidad de productos desde aquí.
            </p>

            <ListarProductos />

        </div>
    )
}
