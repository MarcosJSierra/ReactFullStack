import React from "react";

const ProductsList = () => {
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
    </tbody>
    <tfoot>
        <tr>
            <td colSpan="2">Totales:</td>
            <td id="cantidad-total">0</td>
            <td id="precio-total">0</td>
            <td id="gran-total">0</td>
            <td></td>
        </tr>
    </tfoot>
</table>;
}

export default ProductsList;