const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
dotenv.config();

const { connection } = require("../config.db");

// Controlador para obtener el inventario
const getInventario = (req, res) => {
  connection.query("SELECT * FROM inventario", (error, results) => {
    if (error) {
      console.error("Error al consultar inventario:", error);
      return res.status(500).json({ error: "Error al obtener inventario" });
    }
    res.status(200).json(results);
  });
};

// Controlador para actualizar el inventario
const actualizarInventario = (req, res) => {
  const { cantidad, producto_id } = req.body;

  if (!cantidad || isNaN(cantidad) || cantidad <= 0) {
    return res.status(400).json({ error: "Cantidad inválida" });
  }

  connection.query(
    "SELECT cantidad FROM inventario WHERE producto_id = ?",
    [producto_id],
    (error, results) => {
      if (error) {
        console.error("Error al obtener el inventario:", error);
        return res.status(500).json({ error: "Error al obtener el inventario." });
      }

      if (results.length === 0) {
        return res.status(404).json({ error: "Producto no encontrado." });
      }

      const cantidad_actual = results[0].cantidad;
      const nueva_cantidad = cantidad_actual + cantidad;

      connection.query(
        "UPDATE inventario SET cantidad = ? WHERE producto_id = ?",
        [nueva_cantidad, producto_id],
        (updateError) => {
          if (updateError) {
            console.error("Error al actualizar el inventario:", updateError);
            return res.status(500).json({ error: "Error al actualizar el inventario." });
          }

          res.status(200).json({ message: "Inventario actualizado correctamente." });
        }
      );
    }
  );
};

// Definición de rutas
router.get("/inventario", getInventario);
router.post("/inventario/movimiento", actualizarInventario);

module.exports = router;
