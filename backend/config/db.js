// backend/config/db.js
const mysql = require('mysql2');
require('dotenv').config();  // Para leer las variables del archivo .env

// Configuración de la conexión a la base de datos usando variables de entorno
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectTimeout: 10000 // Tiempo de espera en milisegundos (10 segundos)
});

// Conectar a la base de datos
db.connect((err) => {
  if (err) {
    console.error('Error en la conexión a la base de datos:', err);
    return;
  }
  console.log('Conectado a la base de datos MySQL');
});

module.exports = db;  // Exportamos la conexión para usarla en otros archivos
