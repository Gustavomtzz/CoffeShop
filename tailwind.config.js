/** @type {import('tailwindcss').Config} */
export default {
  //EN QUE ARCHIVOS HAY CODIGO DE TAILWINDCSS
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}", //BUSCA  TODOS LOS ARCHIVOS CON EXTENSION "js y jsx" DENTRO DE LA CARPETA SRC Y SUBCARPETAS
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

