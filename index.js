const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cargar las rutas desde el archivo rutas/inventario.js
app.use(require('./api/inventario'));

app.listen(process.env.PORT || 25060, () => {
    console.log("Servidor corriendo en el puerto 3300");
});

module.exports = app;
