import React from "react";
import { useEffect, useState }  from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { agregarOModificarProducto, productoSeleccionado } from "../store/store";

const ProductForm = () =>{
    const categorias = [
        { codigo: 1, nombre: 'Categoria 1' },
        { codigo: 2, nombre: 'Categoria 2' },
        { codigo: 3, nombre: 'Categoria 3' },
        { codigo: 4, nombre: 'Categoria 4' },
    ];


    const producto = useSelector((state) => state.producto);
    const dispatch = useDispatch();
    const { codigo } = useParams();

    const [values, setValues] = useState({
        codigo: 0,
        nombre: '',
        cantidad: '',
        precio: '',
        categoria: producto.precio || 1
    });

    useEffect(() => {
        console.log(producto.nombre);
        setValues({
            codigo: producto.codigo || '',
            nombre: producto.nombre || '',
            cantidad: producto.cantidad || '',
            precio: producto.precio || '',
            categoria: producto.precio || 1
        })

        if (codigo != producto.codigo){
            dispatch(productoSeleccionado(codigo));
        }

    }, [producto])

    const onChange = (event) =>{
        const target = event.target;
        const value = target.value;
        const name = target.name;
        setValues((v) =>({
            ...v,
            [name] : value
        }));
    }

    const onSubmit = (event) => {
        event.preventDefault();
        const payload= {
            ...values,
            cantidad: parseInt(values.cantidad),
            precio: parseFloat(values.precio)
        }
        dispatch(agregarOModificarProducto(payload));
    }

    const canSave = !!(values.nombre && values.cantidad && values.precio);


    return <form method="post" id="form" action="index.html" onSubmit={onSubmit}>
        <div className="mb-3">
            <label htmlFor="nombre" className="form-label">Nombre</label>
            <input type="text" name="nombre" id="nombre" className="form-control" value={values.nombre} onChange={onChange}/>
        </div>
        <div className="mb-3">
            <label htmlFor="cantidad" className="form-label">Cantiidad</label>
            <input type="number" name="cantidad" id="cantidad" className="form-control" onChange={onChange} value={values.cantidad}/>
        </div>
        <div className="mb-3">
            <label htmlFor="precio" className="form-label">Precio</label>
            <div className="input-group">
                <span className="input-group-text">Q</span>
                <input type="number" name="precio" id="precio" className="form-control" onChange={onChange} value={values.precio}/>
            </div>
        </div>
        <div className="mb-3">
            <label htmlFor="categoria" className="form-label">Categoria</label>
            <select name="categoria" className="form-control" id="categoria" onChange={onChange} value={values.categoria}>
                { categorias.map(c => <option key={c.codigo} value={c.codigo}>{c.nombre}</option>)}
            </select>
        </div>
        <div className="mb-3">
            <button type="submit" className="btn btn-primary">Guardar</button>
        </div>
    </form>;
}

export default ProductForm;