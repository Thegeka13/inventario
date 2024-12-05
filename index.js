const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cargar las rutas desde el archivo rutas/inventario.js
const consultarInventario = require("./api/consultarInventario"); 
const restarInventario = require("./api/restarInventario"); 
const sumarInventario = require("./api/sumarInventario");
//const inventario = require('./api/inventario');

app.use("/api", consultarInventario); 
app.use("/api", restarInventario); 
app.use("/api", sumarInventario);
//app.use("/api", inventario);

app.listen(3000, () => {
    console.log("Servidor corriendo en el puerto 3300");
});

module.exports = app;
