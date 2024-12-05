const express = require("express");
const router = express.Router(); // Usamos router en vez de app

const dotenv = require("dotenv");
dotenv.config();

const { connection } = require("../config.db");

// Se Realiza la consulta de la base de datos de todos los productos existentes 
const getInventario = (request, response) => {
    connection.query("SELECT * FROM inventario", (error, results) => {
        if (error) {
            console.error("Error al consultar inventario:", error);
            return response.status(500).json({ error: "Error al obtener inventario" });
        }
        response.status(200).json(results);
    });
};

router.route("/inventario").get(getInventario);

module.exports = router;
