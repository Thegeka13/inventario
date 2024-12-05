const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cargar las rutas desde los archivos correspondientes
const consultarInventario = require("./api/consultarInventarios"); 
const restarInventario = require("./api/restarInventario"); 
const sumarInventario = require("./api/sumarInventario");

app.use("/api", consultarInventario); 
app.use("/api", restarInventario); 
app.use("/api", sumarInventario);

// Exportar la aplicación para Vercel
module.exports = app;
