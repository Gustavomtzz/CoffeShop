import { useState } from "react";
import useQuiosco from "../hooks/useQuiosco";
import useProductos from '../hooks/useProductos';
import { createRef } from 'react';

export default function ModalEditarProducto() {

    const { producto, handleClickModal, categorias } = useQuiosco();
    const { updateProducto } = useProductos();
    const { categoria_id, id, imagen, nombre, precio, disponibilidad } = producto;
    const [precioDefault, setPrecioDefault] = useState(precio)
    const [nombreDefault, setNombreDefault] = useState(nombre)
    const [errores, setErrores] = useState([])
    const [disponible, setDisponible] = useState(disponibilidad)


    //Definimos los Campos del Formulario
    const precioRef = createRef();
    const nameRef = createRef();
    const categoriaRef = createRef();

    /**UPDATE */
    const handleSubmitUpdate = async () => {

        const productoActualizado = {
            ...producto,
            nombre: nameRef.current.value,
            precio: precioRef.current.value,
            categoria_id: categoriaRef.current.value,
            disponibilidad: disponible,
        }

        try {
            const data = await updateProducto(productoActualizado);
            if (data?.producto) {
                handleClickModal()
            }
        } catch (error) {
            console.log(error)
            setErrores(error?.errors)
        }
    }
    /**FIN UPDATE*/


    return (
        <div className="overflow-y-scroll">
            {errores?.length > 0 && errores.errors && errores.errors.map((error, index) => (
                <p key={index}>{error}</p>))}
            <div className="flex justify-end">
                <button
                    onClick={handleClickModal}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>

            <div className="mb-5">
                <img
                    src={`/img/${imagen}`}
                    alt={`Imagen ${nombre}`}
                    className="w-72 h-auto mx-auto"
                />
            </div>



            <div>
                <form
                    onSubmit={e => {
                        e.preventDefault();
                        handleSubmitUpdate()
                    }}
                    className="flex flex-col gap-5 ">
                    <div className="flex gap-2">
                        <label htmlFor="nombre">Editar Nombre:</label>
                        <input type="text" name="nombre" id="nombre" value={nombreDefault} ref={nameRef} onChange={(e) => setNombreDefault(e.target.value)} />
                    </div>
                    <div className="flex gap-2">
                        <label htmlFor="precio">Editar Precio: $</label>
                        <input type="number" name="precio" id="precio" min={0} step="any" value={precioDefault} ref={precioRef}
                            onChange={(e) => setPrecioDefault(e.target.value)}
                            onWheel={(e) => e.target.blur()}
                        />
                    </div>

                    <div className="text-center flex flex-col">
                        <legend>Seleccionar Categoria</legend>
                        <select className="flex-1" name="categoria" id="categoria" ref={categoriaRef}>
                            <option defaultValue={categoria_id} value={categoria_id}>{categorias.map(categoria => categoria.id === categoria_id && categoria.nombre)}</option>
                            {categorias.map(categoria => (
                                (categoria.id !== categoria_id &&
                                    <option key={categoria.id} value={categoria.id}>{categoria.nombre}</option>)
                            ))}
                        </select>
                    </div>

                    <div className="flex justify-evenly">
                        <div>
                            <input type="radio" id="opcion1" name="disponibilidad" value="1" defaultChecked={disponibilidad === 1} onClick={(e) => setDisponible(e.target.value)} />
                            <label htmlFor="opcion1">Disponible</label>

                        </div>
                        <div>
                            <input type="radio" id="opcion2" name="disponibilidad" value="0" defaultChecked={disponibilidad === 0} onClick={(e) => setDisponible(e.target.value)} />
                            <label htmlFor="opcion2">Agotado</label>

                        </div>
                    </div>
                    <button
                        type="submit"
                        className="bg-indigo-600 hover:bg-indigo-800 px-5 py-2 mt-5 text-white font-bold uppercase rounded"
                    >Finalizar Edición</button>

                </form>
            </div >

        </div>
    )
}
