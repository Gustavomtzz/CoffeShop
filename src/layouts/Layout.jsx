
/** DEPENDENCIAS O HOOKS DE REACT */
// OUTLET sirve para INJECTAR CODIGO DENTRO de nuestro layout /
import { Outlet } from "react-router-dom";
import Modal from "react-modal";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
/**COMPONENTENS PROPIOS */
import Sidebar from '../components/Sidebar'
import Resumen from '../components/Resumen'
import ModalProducto from "../components/ModalProducto";
/** FUNCIONES O HOOKS PROPIOS */
import useQuiosco from "../hooks/useQuiosco";
import useAuth from "../hooks/useAuth";
/** HOJAS DE ESTILOS */


const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
    },
};

Modal.setAppElement('#root')

export default function Layout() {
    const { modal } = useQuiosco();
    useAuth({ middleware: 'auth' })

    return (
        <>
            <div
                className="md:flex"
            >
                <Sidebar />

                <main
                    className="flex-1 h-screen overflow-y-scroll  p-3"
                >
                    <Outlet />
                </main>
                <Resumen />
            </div>


            <Modal isOpen={modal} style={customStyles}>
                <ModalProducto />
            </Modal>
            <ToastContainer />
        </>
    )
}
