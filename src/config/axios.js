/** IMPORTAMOS AXIOS
 * MODIFICAMOS SU URL BASE
 * BASICAMENTE CUANDO LLAMAMOS A UNA API, SIEMPRE UTILIZAMOS LA MISMA RUTA EN EL COMIENZO
 * EJ: http://localhost:3000, y le agregamos a por ejemplo /api/categorias
 * BUENO CON ESTE ARCHIVO GENERAMOS UN CLIENTEAXIOS, QUE CONTIENE LA RUTA BASE QUE DEFINIMOS EN LA VARIABLE DE ENTORNO LOCAL
 * DE VITE_API_URL, PARA NO TENER QUE ANDAR ESCRIBIENDOLA REPETIDAS VECES
 * EJ DE COMO QUEDARIA EN EL ARCHIVO QUE LA UTILIZIMOS
 * PRIMERO IMPORTAMOS import clienteAxios from "/config/axios.js"
 * y despues la utilizamos asi por ejemplo.
 * const { data } = await clienteAxios(`/api/categorias`)
 */


import axios from "axios";

const clienteAxios = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
    },
    withCredentials: true,
    withXSRFToken: true,
})

export default clienteAxios