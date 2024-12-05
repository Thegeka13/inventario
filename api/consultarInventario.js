const express = require("express");
const router = express.Router(); // Usamos router en vez de app

const dotenv = require("dotenv");
dotenv.config();

const { connection } = require("../config.db");

const obtenerInventarioPorId = (request, response) => {
    const { producto_id } = request.body; // Ajuste
    connection.query("SELECT * FROM inventario WHERE producto_id = ?", [producto_id], (error, results) => {
        if (error) {
            console.error("Error al consultar inventario:", error);
            return response.status(500).json({ error: "Error al obtener inventario" });
        }
        response.status(200).json(results);
    });
};

router.route("/inventario/id").post(obtenerInventarioPorId);

module.exports = router;
