const form = document.getElementsByTagName("form")[0];
const tbody = document.getElementsByTagName("tbody")[0];
const input = document.getElementsByTagName("input")[0];
const cantidadTotalElement = document.getElementById("cantidad-total");
const precioTotalElement = document.getElementById("precio-total");
const granTotalElement = document.getElementById("gran-total");
/** @type {HTMLInputElement} */
const inputNombre = document.getElementById("nombre");
/** @type {HTMLInputElement} */
const inputCantidad = document.getElementById("cantidad");
/** @type {HTMLInputElement} */
const inputPrecio = document.getElementById("precio");
/** @type {HTMLInputElement} */
const inputCategoria = document.getElementById("categoria");
/** @type {HTMLInputElement} */
const inputCodigo = document.getElementById("codigo");

let indice =0;
let cantidadTotal = 0;
let preciosTotales = 0;
let granTotal = 0;
let currentRow;

form.addEventListener("submit", onSubmit);


/**
 * 
 * @param {Event} event 
 */
function onSubmit(event){
    event.preventDefault();
    const data = new FormData(form);
    const values = Array.from(data.entries());

    const [frmCodigo, frmNombre, frmCantidad, frmPrecio, frmCategoria] = values;
    let codigo = frmCodigo[1];
    const nombre = frmNombre[1];
    const cantidad = frmCantidad[1];
    const precio = frmPrecio[1];
    const categoria =  frmCategoria[1];
    let tr;
    if (!codigo){
        codigo = ++indice;
        tr = document.createElement("tr");
        tbody.appendChild(tr);
    }else{
        tr = currentRow;
    }
    tr.dataset.categoria = categoria;
    let total = cantidad*precio;

    cantidadTotal += parseFloat(cantidad);
    preciosTotales += parseFloat(precio);
    granTotal += parseFloat(total);
    tr.innerHTML = `
        <td>${codigo}</td>
        <td>${nombre}</td>
        <td>${cantidad}</td>
        <td>${precio}</td>
        <td>${total}</td>
        <td><a href='#' onclick="onEdit(event)">Editar</a>|<a href='#' onclick="onDelete(event)">Eliminar</a></td>
    `;

    cantidadTotalElement.innerText = cantidadTotal;
    precioTotalElement.innerText = preciosTotales;
    granTotalElement.innerText = granTotal;

    form.reset();
    input.focus();
}

/**
 * 
 * @param {Event} event
 */
function onEdit(event){
    event.preventDefault();
    /**
     * @type {HTMLElement}
     */
    const anchor = event.target;
    const tr =anchor.parentElement.parentElement;
    const celdas = tr.getElementsByTagName("td");
    const [tdCodigo, tdNombre, tdCantidad, tdPrecio] = celdas ;

    inputCodigo.value = tdCodigo.innerText;
    inputNombre.value = tdNombre.innerText;
    inputCantidad.value = tdCantidad.innerText;
    inputPrecio.value = tdPrecio.innerText;
    inputCategoria.value = tr.dataset.categoria;

    currentRow = tr;

}
/**
 * 
 * @param {Event} event
 */
function onDelete(event){
    event.preventDefault();
    /**
     * @type {HTMLElement}
     */
    const anchor = event.target;
    const tr =anchor.parentElement.parentElement;
    tbody.removeChild(tr);
}

