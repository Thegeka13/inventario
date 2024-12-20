const dotenv = require("dotenv");
const { connection } = require("../config.db");

// Cargar las variables de entorno
dotenv.config();

// Función para consultar el inventario
const consultarInventario = (req, res) => {
    const { producto_id } = req.body; // Obtener el producto_id del cuerpo de la solicitud

    if (!producto_id) {
        return res.status(400).json({ error: "ID de producto requerido." });
    }

    connection.query("SELECT producto.*, inventario.* FROM inventario INNER JOIN producto ON producto.producto_id = inventario.producto_id WHERE inventario.producto_id = ?;", [producto_id], (error, results) => {
        if (error) {
            console.error("Error al consultar el inventario:", error);
            return res.status(500).json({ error: "Error al consultar el inventario." });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: "Producto no encontrado." });
        }

        res.status(200).json(results[0]); // Devolver el producto encontrado
    });
};

// Exportar la función como manejador de solicitudes
module.exports = (req, res) => {
    // Configurar los encabezados CORS
    res.setHeader("Access-Control-Allow-Origin", "*"); // Permitir todos los orígenes
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS"); // Métodos permitidos
    res.setHeader("Access-Control-Allow-Headers", "Content-Type"); // Encabezados permitidos

    // Verificar el método de la solicitud
    if (req.method === "OPTIONS") {
        // Si es una solicitud OPTIONS, devolver un 204 No Content
        res.status(204).end();
        return;
    }

    if (req.method === "POST") {
        consultarInventario(req, res);
    } else {
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Método ${req.method} no permitido`);
    }
};