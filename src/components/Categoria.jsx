import useQuiosco from "../hooks/useQuiosco";
export default function Categoria({ categoria }) {

    const { icono, nombre, id } = categoria;

    const { handleClickCategoria, categoriaActual } = useQuiosco()

    /**CATEGORIA ACTIVA? */
    let activo = (id == categoriaActual.id) ? "className='flex  items-center p-3 border-b border-slate-400 w-full bg-amber-400 cursor-pointer'" : "className='flex  items-center p-3 border-b border-slate-400 w-full  hover:bg-amber-400 cursor-pointer'"

    return (
        <div
            className={activo}
        >

            <div
                className="flex flex-1 items-center justify-center md:justify-normal  gap-2 my-5"
            >
                <img
                    src={`/img/icono_${icono}.svg`}
                    alt={`Icono ${nombre}`}
                    className="w-10"
                ></img>

                <button
                    type="button"
                    onClick={() => handleClickCategoria(id)}
                    className="text-lg font-bold uppercase"
                >{nombre}</button>

            </div>

        </div >
    )
}
