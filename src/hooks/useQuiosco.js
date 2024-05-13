import { useContext } from "react";
import QuioscoContext from "../context/QuioscoProvider";

const useQuiosco = () => {
    return useContext(QuioscoContext)
}

export default useQuiosco

/** HOOKS no son para crear funciones reutilizables
 * un hook nombrado con "use" lo integra a react
 * y realiza una serie de mejoras en cuanto a performance
  */