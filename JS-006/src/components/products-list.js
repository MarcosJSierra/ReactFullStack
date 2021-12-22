import React from "react";


const ProductItem = (props) => {
    let producto = props.producto;
    const acciones = props.acciones;
    return <tr>
        <td>{producto.codigo}</td>
        <td>{producto.nombre}</td>
        <td>{producto.cantidad}</td>
        <td>{producto.precio}</td>
        <td>{producto.total}</td>
        <td>
            <div className="btn-group">
                <a href='#' className='btn btn-sm btn-outline-secondary' 
                    onClick={() => acciones.seleccionar(producto.codigo)}>
                    <i className="bi bi-pencil-square"></i>
                </a>
                <a href='#' className='btn btn-sm btn-outline-danger'
                    onClick={() => acciones.eliminar(producto.codigo)}>
                    <i className="bi bi-trash"></i>
                </a>
            </div>
        </td>
    </tr>;
}



const ProductsList = () => {
    const seleccionar = (codigo) => {
        console.log('seleccionar: ', codigo)
    }
    
    const eliminar = (codigo) => {
        console.log('eliminar: ', codigo)
    }
    
    const acciones = {
        seleccionar,
        eliminar
    }

    const productos = [
        {
            codigo: 1,
            nombre: "producto A",
            cantidad: 10,
            precio: 100,
            total: 1000
        },
        {
            codigo: 2,
            nombre: "producto A",
            cantidad: 10,
            precio: 100,
            total: 1000
        },
    ];

    const cantidadTotal = sum(productos, x => x.cantidad);
    const precioTotal = sum(productos, x => x.precio);
    const granTotal = sum(productos, x => x.total);

    return <table className="table">
    <thead>
        <tr>
            <td>Código</td>
            <td>Nombre</td>
            <td>Cantidad</td>
            <td>Precio</td>
            <td>Total</td>
            <td>Código</td>
            <td></td>
        </tr>
    </thead>
    <tbody>
        {productos.map(item => <ProductItem key={item.codigo} producto={item} acciones={acciones}/>)}
    </tbody>
    <tfoot>
        <tr>
            <td colSpan="2">Totales:</td>
            <td>{cantidadTotal}</td>
            <td>{precioTotal}</td>
            <td>{granTotal}</td>
            <td></td>
        </tr>
    </tfoot>
</table>;
}


function sum(elementos, selector){
    return elementos.map(selector)
            .reduce((a, b) => a + b, 0);
}

export default ProductsList;