import http from "http";
// const http = require("http");

const server = http.createServer((req, res) =>{

    res.writeHead(200, {"Content-Type": "text/html"});
    res.write(JSON.stringify([{codigo:1, nombre: "producto 1", precio: 10, cantidad: 100 }]));
    res.end();
})

server.listen(5000, () => {
    console.log("Servidor escuchando en puerto 5000");
})