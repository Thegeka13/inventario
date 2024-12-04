const express = require("express");
const dotenv = require("dotenv");
const app = express();

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Prefijo para rutas del inventario
app.use("/api", require("./api/inventario"));

// Middleware global para manejar errores no capturados
app.use((err, req, res, next) => {
  console.error("Error no capturado:", err);
  res.status(500).json({ error: "Ocurrió un error interno." });
});

const PORT = process.env.PORT || 3300;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

module.exports = app;

