import api from "./api";
import { push } from "connected-react-router";

const AsignarProductos = (payload) =>({
    type: "asignar-productos",
    payload
})

const apiMiddleware = ({dispatch}) => (next) => async (action) => {
    switch (action.type){
        case "obtener-productos":{
            const productos = await api.all();
            dispatch(AsignarProductos(productos));
            break;
        }
        case "producto-agregado":{
            await api.add(action.payload);
            dispatch(push("/"));
            break;
        }
        case "producto-seleccionado":{
            const { codigo } = action.payload;
            if(codigo){
                const producto = await api.single(action.payload.codigo);
                next({ type: action.type, payload: producto});
            } else {
                next({ type: action.type, payload: {}});
            }
            break;
        }
        case "producto-modificado":{
            await api.update(action.payload);
            dispatch(push("/"));
            break;
        }
        case "producto-eliminado":{
            await api.remove(action.payload.codigo);
            const productos = await api.all();
            dispatch(AsignarProductos(productos));
            break;
        }
        default:
            next(action);

    }
}

export default apiMiddleware;