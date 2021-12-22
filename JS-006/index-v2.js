

const preloadedState = {
    producto: {},
    productos: []
};


let indice = 0;
const reducer = (state, action) => {
    if (action.type == "producto-agregado")
    {
        indice++;
        const producto = action.payload
        const codigo = indice;
        const total = producto.cantidad * producto.precio;
        return {
            ...state,
            productos: [
                ...state.productos,
                {
                    ...producto,
                    codigo,
                    total
                }
            ]
        };
    }

    if (action.type == "producto-modificado")
    {
        const producto = action.payload;
        const productos = state.productos.slice();
        const codigo = producto.codigo;
        const total = producto.cantidad * producto.precio;
        const old = productos.find((item) => item.codigo == codigo);
        const index = productos.indexOf(old);
        productos[index] = {...producto, total};
        return {
            ...state,
            productos
        };
    }
    if (action.type == "producto-eliminado"){
        const codigo = action.payload.codigo;
        const productos = state.productos.filter((item) => item.codigo != codigo);
        return {
            ...state,
            productos
        }
    }
    if (action.type == "producto-seleccionado"){
        const codigo = action.payload.codigo ;
        return {
            ...state,
            producto: state.productos.find(x => x.codigo == codigo) || {}
        }
    }


    return state;


};

const store = Redux.createStore(reducer, preloadedState);

let latestState

const unsuscrbie = store.subscribe(() => {
    let currentState = store.getState();
    if (currentState != latestState){
        latestState = currentState;
        console.log("estado: ", currentState);
        renderForm(currentState.producto);
        renderTable(currentState.productos);
    }
});

store.dispatch({
    type: "producto-agregado",
    payload: {
        nombre: "prueba",
        cantidad: 3,
        precio: 10,
        categoria: 2
    }
});



/**
 * 
 * @param {Event} event 
 */
 function onSubmit(event){
    event.preventDefault();
    const data = new FormData(form);
    const values = Array.from(data.entries());

    const [frmCodigo, frmNombre, frmCantidad, frmPrecio, frmCategoria] = values;
    let codigo = parseInt(frmCodigo[1]);
    const nombre = frmNombre[1];
    const cantidad = parseFloat(frmCantidad[1]);
    const precio = parseFloat(frmPrecio[1]);
    const categoria =  parseInt(frmCategoria[1]);
    let total = cantidad*precio;
    if (codigo){
        store.dispatch({
            type: "producto-modificado",
            payload: {
                codigo,
                nombre,
                cantidad,
                precio,
                categoria
            }
        });
    } else {
        store.dispatch({
            type: "producto-agregado",
            payload: {
                nombre,
                cantidad,
                precio,
                categoria
            }
        });
    }

    store.dispatch({
        type: "producto-seleccionado",
        payload: {
            codigo: null
        }
    });
}


store.dispatch({
    type: "producto-modificado",
    payload: {
        codigo: 1,
        nombre: "prueba A v2",
        cantidad: 4,
        precio: 11,
        categoria: 1
    }
});

store.dispatch({
    type: "producto-agregado",
    payload: {
        nombre: "prueba b",
        cantidad: 6,
        precio: 8,
        categoria: 3
    }
});

store.dispatch({
    type: "producto-agregado",
    payload: {
        nombre: "prueba c",
        cantidad: 2,
        precio: 4,
        categoria: 4
    }
});