import { Outlet, useNavigate } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";
import useQuiosco from "../hooks/useQuiosco";
import useAuth from "../hooks/useAuth";
import Modal from "react-modal";
import ModalEditarProducto from "../components/ModalEditarProducto";
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

export default function AdminLayout() {
    const { modal } = useQuiosco();
    useAuth({ middleware: 'admin' });

    return (
        <>
            <div
                className="md:flex"
            >
                <AdminSidebar />

                <main
                    className='flex-1 h-screen overflow-y-scroll bg-gray-100 p-3'
                >
                    <Outlet />
                </main>
            </div>
            <Modal isOpen={modal} style={customStyles}>
                <ModalEditarProducto />
            </Modal>
        </>
    )
}
