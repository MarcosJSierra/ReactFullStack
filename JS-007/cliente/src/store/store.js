import { combineReducers } from "redux";

const ActionTypes = {
    ProductoAgregado: "producto-agregado",
    ProductoModificado: "producto-modificado",
    ProductoEliminado: "producto-eliminado",
    ProductoSeleccionado: "producto-seleccionado",
    ProductoAgregadoModificado: "producto-agregado-o-modificado",
    AsignarProductos: "asignar-productos"
}

export const producto = (state = {}, action) => {
    switch(action.type){
        case ActionTypes.ProductoSeleccionado:
                return action.payload;
        default:
            return state;

    }
}

export const productos = (state = [], action) => {
    switch(action.type){
        case ActionTypes.AsignarProductos:
                return action.payload
        default:
            return state;

    }
}

export  function productoAgregadoReducer(state, action){
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



function productoSeleccionadoReducer(state, action){
    const codigo = action.payload.codigo ;
    return {
        ...state,
        producto: state.productos.find(x => x.codigo == codigo) || {}
    }
}


export const productoSeleccionado = (codigo) => ({
    type: ActionTypes.ProductoSeleccionado,
    payload: {
        codigo
    }
});

export const productoEliminado = (codigo) => ({
    type: ActionTypes.ProductoEliminado,
    payload: {
        codigo
    }
});
export const productoAgregado = (payload) => ({
    type: ActionTypes.ProductoAgregado,
    payload
});
export const productoModificado = (payload) => ({
    type: ActionTypes.ProductoModificado,
    payload
});

export const agregarOModificarProducto = (payload) => ({
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

export const loggerMiddleware = store => next => action => {
    console.log("dispatching", action);
    const result = next(action);
    console.log("next state", store.getState());
    return result;
}


export const storageMiddleware = store => next => action => {
    const actions = [
        ActionTypes.ProductoAgregado,
        ActionTypes.ProductoModificado,
        ActionTypes.ProductoEliminado
    ];
    const result = next(action);
    if(actions.indexOf(action.type) >= 0){
        const state = store.getState();
        localStorage.setItem("state", JSON.stringify(state));
    }

    return result;
}

export const agregarOModificarProductoMiddleware = store => next => action =>{
    if (action.type != ActionTypes.ProductoAgregadoModificado){
        return next(action);
    }

    const producto = action.payload;
    const actinoToDispatch = producto.codigo ? productoModificado(producto) : productoAgregado(producto);
    store.dispatch(actinoToDispatch);
    return store.dispatch(productoSeleccionado(null));
}

export function generadorCodigoProductoBuilder(codigoInicial){
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