// function mensaje(prefijo, formateador){

//     return function(texto)
//     {
//         return formateador(prefijo, texto);
//     }
// }

// const formatoBienvenida = function(prefijo, texto){
//     return "¡" + prefijo + " " + texto + "!";
// }

const mensaje = (prefijo, format) => (texto) => format(prefijo, texto);

const formatoDespedida = (prefijo, texto) => prefijo + " " + texto + " ... :C ";


const bienvenida = mensaje("hola", (a, b) => "¡" + a + " " + b + "!");
const despedida = mensaje("adios", (prefijo, texto) => prefijo + " " + texto + " ... :C ");

console.log(bienvenida("mundo"));
console.log(despedida("mundo"));
