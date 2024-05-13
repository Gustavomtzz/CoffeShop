/** Funciones Helpers */
// Aqui van todas las Funciones Helpers que necesitemos

export const formatearDinero = cantidad => {
    return cantidad.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD'
    })
}

