# inventario

Descripción General

Este módulo de Node.js y Express.js gestiona las operaciones del inventario en una base de datos. Incluye rutas para consultar todos los productos, obtener un producto específico por ID desde el cuerpo de la solicitud, sumar y restar cantidades del inventario.

Dependencias
express: Framework web para Node.js.

dotenv: Cargar variables de entorno desde un archivo .env.

mysql: Cliente para interactuar con MySQL.

Variables de Entorno
Este módulo utiliza variables de entorno, asegurándose de cargarlas desde un archivo .env mediante dotenv.config().

Conexión a la Base de Datos
La conexión a la base de datos se realiza mediante un módulo de configuración (config.db) que exporta la conexión connection.

Rutas
1.-Obtener Todos los Productos
    Ruta: /inventario 
    Método: GET 
    Descripción: Obtiene todos los productos existentes en la tabla inventario.

2.- Obtener Producto por ID
    Ruta: /inventario/id 
    Método: POST 
    Descripción: Obtiene un producto específico de la tabla inventario mediante su producto_id proporcionado en el cuerpo de la solicitud.

    Ejemplo del cuerpo post:

    {
        "producto_id": 2
    }

3.- Sumar Cantidad al Inventario
    Ruta: /inventario/sumar 
    Método: POST 
    Descripción: Suma una cantidad específica al inventario de un producto. La cantidad y el ID del producto se proporcionan en el cuerpo de la solicitud.

    {
    "producto_id": 1,
    "cantidad": -10
    }

4.- Restar Cantidad al Inventario
    Ruta: /inventario/restar 
    Método: POST 
    Descripción: Resta una cantidad específica del inventario de un producto. La cantidad y el ID del producto se proporcionan en el cuerpo de la solicitud.

    {
    "producto_id": 1,
    "cantidad": -10
    }

    Link de la ruta a la aplicación: https://inventario-coral.vercel.app
    Link al GitHub: https://github.com/Thegeka13/inventario
