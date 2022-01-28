import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { productos } from "./database/index.js"; 

const app = express();


app.use(cors());
app.use(bodyParser.json({ type: 'application/json'}));
app.use(logs);

app.get("/", (req, res) => res.send(
    "<h1>API de productos</h1>"
));

app.get("/productos", async (req, res) => {

    const filtro = req.query.filtro;
    let result;
    if(filtro){
        result = await productos.filter(filtro);
    } else {
        result = await productos.all();
    }
    res.json(result);
});

app.post("/productos", async (req, res) => {
    const newProdcto = {...req.body , total: req.body.cantidad * req.body.precio};
    const producto = await productos.add(newProdcto);
    res.status(201);
    res.json(producto);
});

app.put("/productos/:codigo", async (req, res) => {
    
    try {
        const newProducto = await productos.update(codigo, req.body);
        res.status(200);
        res.json(newProducto);

    } catch (message) {
        es.status(404);
        res.json({message});
    }
});

app.get("/productos/:codigo", async (req, res) => {
    const producto = productos.single(p => p.codigo == codigo);

    if (!producto){
        res.status(404);
        res.json({mensaje: "No existe nignun prodcuto con codigo " + codigo});
    } else {
        res.status(200);
        res.json(producto);
    }
});


app.delete("/productos/:codigo", async (req, res) => {
    try {
        await productos.remove(codigo);
        res.status(200);
        res.json({message: "roducto"})
    } catch (message) {
        res.status(404);
        res.json({message})
    }
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