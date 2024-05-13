import { useEffect } from 'react';
import Swal from 'sweetalert2';

const SweetAlert = ({ onConfirm, onDismiss }) => {
    useEffect(() => {
        Swal.fire({
            title: "Deseas realizar el Pedido?",
            text: "Presiona 'Si, lo quiero' para confirmar.",
            icon: "warning",
            showCancelButton: true,
            cancelButtonText: "Cancelar",
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, lo quiero!"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Pedido Confirmado!",
                    text: "Tu pedido ya esta en proceso. Que lo disfrutes!",
                    icon: "success"
                });
                onConfirm(); //Llama a la funcion confirm si el usuario acepta
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                onDismiss(); // Llama a la función de descarte si el usuario cancela
            }

        });
    }, [onConfirm, onDismiss]);


    return null; // No necesitamos renderizar nada en este componente
};

export default SweetAlert;