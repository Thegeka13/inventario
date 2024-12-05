const express = require("express");
const router = express.Router(); // Usamos router en vez de app

const dotenv = require("dotenv");
dotenv.config();

// Conexión con la base de datos
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

// Ruta GET para inventario
router.route("/inventario").get(getInventario);

// Se realiza la consulta de la base de datos por ID de producto desde el cuerpo de la solicitud
const obtenerInventarioPorId = (request, response) => {
    const { producto_id: producto_id } = request.body; // Obtener el ID del producto desde el cuerpo de la solicitud
    connection.query("SELECT * FROM inventario WHERE producto_id = ?", [producto_id], (error, results) => {
        if (error) {
            console.error("Error al consultar inventario:", error);
            return response.status(500).json({ error: "Error al obtener inventario" });
        }
        response.status(200).json(results);
    });
};

// Ruta POST para inventario por ID desde el cuerpo de la solicitud
router.route("/inventario/id").post(obtenerInventarioPorId);


const sumarInventario = (request, response) => {
    const { cantidad, producto_id } = request.body;

    // Verificar si la cantidad es un número válido y mayor que 0
    if (!cantidad || isNaN(cantidad) || cantidad <= 0) {
        return response.status(400).json({ error: "Cantidad inválida" });
    }

    // Consultamos el inventario actual del producto
    connection.query("SELECT cantidad FROM inventario WHERE producto_id = ?", [producto_id], (error, results) => {
        if (error) {
            console.error("Error al obtener el inventario:", error);
            return response.status(500).json({ error: "Error al obtener el inventario." });
        }

        if (results.length === 0) {
            return response.status(404).json({ error: "Producto no encontrado." });
        }

        let cantidad_actual = results[0].cantidad;
        let nueva_cantidad = cantidad_actual + cantidad; // Actualizamos la cantidad

        // Actualizamos el inventario en la base de datos
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

// Ruta POST para actualizar el inventario
router.route("/inventario/sumar").post(sumarInventario);

const restarInventario = (request, response) => {
    const { cantidad, producto_id } = request.body;

    // Verificar si la cantidad es un número válido y mayor que 0
    if (!cantidad || isNaN(cantidad) || cantidad <= 0) {
        return response.status(400).json({ error: "Cantidad inválida" });
    }

    // Consultamos el inventario actual del producto
    connection.query("SELECT cantidad FROM inventario WHERE producto_id = ?", [producto_id], (error, results) => {
        if (error) {
            console.error("Error al obtener el inventario:", error);
            return response.status(500).json({ error: "Error al obtener el inventario." });
        }

        if (results.length === 0) {
            return response.status(404).json({ error: "Producto no encontrado." });
        }

        let cantidad_actual = results[0].cantidad;
        let nueva_cantidad = cantidad_actual - cantidad; // Actualizamos la cantidad

        // Actualizamos el inventario en la base de datos
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

// Ruta POST para restar el inventario
router.route("/inventario/restar").post(restarInventario);

module.exports = router; // Exportamos el router