import React, { useState } from "react";
import ReactDOM from "react-dom";

const rootElement = document.getElementById("root");
const titulo = "Hola React 2021";
const productosIniciales  = [
    { codigo: 1, nombre: "producto 1", cantidad: 2},
    { codigo: 2, nombre: "producto 2", cantidad: 5}
];


function cuadrado(valor){
    return valor * valor;
};


const Encabezado = (props) =>(
    <h1>
        {props.titulo} - {cuadrado(props.valor)}
    </h1>
);


const Producto = (props) => (
    <li className="producto" onClick={(e) => props.onProductClick(props, e)}>
        Nombre: {props.nombre}, Cantidad: {props.cantidad} 
    </li>
);


const Productos = (props) => (
    <ul>
        {
            props.productos.map((item) => (
                <Producto
                    key={item.codigo} 
                    codigo={item.codigo} 
                    nombre={item.nombre} 
                    cantidad={item.cantidad} 
                    onProductClick={props.onProductClick}/>
            ))
        }
    </ul>
);

const App = () =>{
    const [productos, setProductos] = useState(productosIniciales);
    const update = (props) =>{
        const newProductos = productos.slice();
        const producto = newProductos.find((x) => x.codigo == props.codigo);
        const index = productos.indexOf(producto);
        newProductos[index] = { ...producto, cantidad: producto.cantidad + 1};
        console.log("newProductos", newProductos);
        setProductos(newProductos);
    };

    return(
        <div>
            <Encabezado titulo={titulo} valor={cuadrado(2*4)} />
            <Productos productos={productos} onProductClick={update} /> 
        </div>
    );
};


ReactDOM.render(
    <App />,
    rootElement
);

