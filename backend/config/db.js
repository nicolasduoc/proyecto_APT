
const mysql = require('mysql2');
const dotenv = require('dotenv');

// Cargar las variables de entorno
dotenv.config();

// Configurar la conexión a la base de datos
const db = mysql.createConnection({
  host: 'localhost',        // Dirección del servidor MySQL
  user: 'root',             // Usuario de MySQL
  password: '',             // Contraseña del usuario de MySQL
  database: 'earthalert',   // Nombre de la base de datos
});

// Conectar a la base de datos
db.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
  } else {
    console.log('Conectado a la base de datos MySQL');
  }
});

// Exportar la conexión para poder usarla en otros archivos
module.exports = db;

