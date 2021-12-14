
const ActionTypes = {
    ProductoAgregado: "producto-agregado",
    ProductoModificado: "producto-modificado",
    ProductoEliminado: "producto-eliminado",
    ProductoSeleccionado: "producto-seleccionado",
    ProductoAgregadoModificado: "producto-agregado-o-modificado",
}
const reducer = (state, action) => {


    switch(action.type){
        case ActionTypes.ProductoAgregado:
            {
                return productoAgregadoReducer(state, action);
            }
        case ActionTypes.ProductoModificado:
            {
                return productoModificadoReducer(state, action);
            }
        case ActionTypes.ProductoEliminado:
            {
                return productoEliminadoReducer(state, action);
            }
        case ActionTypes.ProductoSeleccionado:
            {
                return productoSeleccionadoReducer(state, action);
            }
        default:
            return state;

    }


};

function productoAgregadoReducer(state, action){
    const producto = action.payload
    const total = producto.cantidad * producto.precio;
    return {
        ...state,
        productos: [
            ...state.productos,
            {
                ...producto,
                total
            }
        ]
    };
}

function productoModificadoReducer(state, action){
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


function productoEliminadoReducer(state, action){
    const codigo = action.payload.codigo;
    const productos = state.productos.filter((item) => item.codigo != codigo);
    return {
        ...state,
        productos
    }
}


function productoSeleccionadoReducer(state, action){
    const codigo = action.payload.codigo ;
    return {
        ...state,
        producto: state.productos.find(x => x.codigo == codigo) || {}
    }
}


const productoSeleccionado = (codigo) => ({
    type: ActionTypes.ProductoSeleccionado,
    payload: {
        codigo
    }
});

const productoEliminado = (codigo) => ({
    type: ActionTypes.ProductoEliminado,
    payload: {
        codigo
    }
});
const productoAgregado = (payload) => ({
    type: ActionTypes.ProductoAgregado,
    payload
});
const productoModificado = (payload) => ({
    type: ActionTypes.ProductoModificado,
    payload
});

const agregarOModificarProducto = (payload) => ({
    type: ActionTypes.ProductoAgregadoModificado,
    payload
});

// function loggerMiddleware(store){
//     return function dispatchWrapper(next){
//         return function actionHandler(action){
//             next(action);
//             const state = store.getSTate();
//             console.log("state after", state);
//             console.log("dispatched", action);
//         }
//     }
// }

const loggerMiddleware = store => next => action => {
    console.log("dispatching", action);
    const result = next(action);
    console.log("next state", store.getState());
    return result;
}


const agregarOModificarProductoMiddleware = store => next => action =>{
    if (action.type != ActionTypes.ProductoAgregadoModificado){
        return next(action);
    }

    const producto = action.payload;
    const actinoToDispatch = producto.codigo ? productoModificado(producto) : productoAgregado(producto);
    store.dispatch(actinoToDispatch);
    return store.dispatch(productoSeleccionado(null));
}

function generadorCodigoProductoBuilder(codigoInicial){
    let codigo = codigoInicial;
    return store => next => action => {
        if (action.type != ActionTypes.ProductoAgregado){
            return next(action);
        }
        codigo++;
        const actionToDispatch =  {
            ...action,
            payload: {
                ...action.payload,
                codigo
            }
        } 
        return next(actionToDispatch);
    };
}