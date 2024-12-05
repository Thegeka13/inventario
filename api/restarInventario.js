const express = require("express");
const router = express.Router(); // Usamos router en vez de app

const dotenv = require("dotenv");
dotenv.config();

const { connection } = require("../config.db");

const restarInventario = (request, response) => {
    const { cantidad, producto_id } = request.body;

    if (!cantidad || isNaN(cantidad) || cantidad <= 0) {
        return response.status(400).json({ error: "Cantidad inválida" });
    }

    connection.query("SELECT cantidad FROM inventario WHERE producto_id = ?", [producto_id], (error, results) => {
        if (error) {
            console.error("Error al obtener el inventario:", error);
            return response.status(500).json({ error: "Error al obtener el inventario." });
        }

        if (results.length === 0) {
            return response.status(404).json({ error: "Producto no encontrado." });
        }

        let cantidad_actual = results[0].cantidad;
        let nueva_cantidad = cantidad_actual - cantidad;

        connection.query(
            "UPDATE inventario SET cantidad = ? WHERE producto_id = ?",
            [nueva_cantidad, producto_id],
            (updateError, updateResults) => {
                if (updateError) {
                    console.error("Error al actualizar el inventario:", updateError);
                    return response.status(500).json({ error: "Error al actualizar el inventario." });
                }

                response.status(200).json({ message: "Inventario actualizado correctamente." });
            }
        );
    });
};

router.route("/inventario/restar").post(restarInventario);

module.exports = router;
