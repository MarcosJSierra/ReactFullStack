import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();

let lastId = 1;
let productos = [
    {
        nombre: "producto b",
        cantidad: 2,
        precio: 20,
        codigo: 1
    }
];

app.use(cors());
app.use(bodyParser.json({ type: 'application/json'}));
app.use(logs);

app.get("/", (req, res) => res.send(
    "<h1>API de productos</h1>"
));

app.get("/productos", (req, res) => {

    const filtro = req.query.filtro;
    if(filtro){
        res.json(productos.filter(p => p.nombre.indexOf(filtro) >= 0));
    }
    res.json(productos);
});

app.post("/productos", (req, res) => {
    console.log("body: ", req.body);
    const producto = {...req.body, codigo: ++lastId};
    productos.push(producto);
    res.status(201);
    res.json(producto);
});

app.put("/productos/:codigo", (req, res) => {
    const codigo = parseInt(req.params.codigo, 10);
    const producto = productos.find(p => p.codigo == codigo);
    if (!producto){
        res.status(404);
        res.json({mensaje: "No existe nignun prodcuto con codigo " + codigo});
    } else {
        const index = productos.indexOf(producto);
        productos[index] = {...req.body, codigo};
        res.status(200);
        res.json(req.body);
    }
});

app.get("/productos/:codigo", (req, res) => {
    const codigo = parseInt(req.params.codigo, 10);
    const producto = productos.find(p => p.codigo == codigo);
    if (!producto){
        res.status(404);
        res.json({mensaje: "No existe nignun prodcuto con codigo " + codigo});
    } else {
        res.status(200);
        res.json(producto);
    }
});


app.delete("/productos/:codigo", (req, res) => {
    const codigo = parseInt(req.params.codigo, 10);
    const producto = productos.find(p => p.codigo == codigo);
    if (!producto){
        res.status(404);
        res.json({mensaje: "No existe nignun prodcuto con codigo " + codigo});
    } else {
        productos = productos.filter(x => x != producto);
        res.status(200);
        res.json({message: "Producto eliminado"});
    }
});

const port = process.argv[2] | process.env.PORT | 5001;

app.listen(5001, () => {
    console.log("servidor escuchando al puerto 5001")
});

// function isAuthenticated(requ, res, next){
//     const auth = requ.headers.authorization;
//     if (auth == "hola-mundo"){
//         next();
//     } else {
//         res.status(401);
//         res.send("Not authorized");
//     }
// }

function logs(req, res, next){
    console.log(`${req.method}: ${req.originalUrl}`);
    next();
}