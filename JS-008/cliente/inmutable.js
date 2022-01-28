const juan = {
    nombre: "Juan",
    apellido: "Rodriguez",
    edad: 30,
    direccion: {
        departamento: "Guatemala",
        municipio: "Guatemala"
    }
};

// const juan2 = Object.assign({}, juan, {apellido: "Perez"});
const juan2 = {...juan,
    apellido: "Perez",
    telefono: "12345678",
    direccion:{
        ...juan.direccion,
        municipio: "Santa Catarina Pinula",
        aldea: "Aldea 1"
    }
};
juan2.direccion.municipio = "Santa Rosa"

console.log(juan);
console.log(juan2);

// Arreglos inmutables

const numeros = [1, 2, 3]

const numeros2 = [0, ...numeros, 4];

const index = numeros.indexOf(2);
const numeros3 = [...numeros.slice(0, index),
    1.5,
    ...numeros.slice(index)];
numeros2.push(5);

const numeros4 = numeros.filter(x => x != 2);

const numeros5 = numeros.map( x => x == 2 ? 100 : x);

function reemplazar2por100(x){
    if (x == 2){
        return 100;
    }else{
        return x;
    }
}

console.log("numeros: ", numeros);
console.log("numeros2: ", numeros2);
console.log("numeros3: ", numeros3);
console.log("numeros4: ", numeros4);
console.log("numeros5: ", numeros5);