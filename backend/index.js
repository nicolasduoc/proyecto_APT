
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

dotenv.config();

const app = express();
app.use(cors({
  origin: 'http://localhost:3000', // Reemplaza con el dominio de tu frontend
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    return;
  }
  console.log('Conectado a MySQL');
});

function verifyToken(req, res, next) {
  const token = req.headers['x-access-token'];
  if (!token) return res.status(403).json({ message: 'No se proporcionó token' });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(500).json({ message: 'Token inválido' });

    req.userId = decoded.id;
    next();
  });
}

// Rutas protegidas
app.get('/api/private', verifyToken, (req, res) => {
  res.json({ data: 'Contenido protegido' });
});

// Rutas de autenticación
const authRoute = require('./routes/auth');
app.use('/api/user', authRoute);
const historicoRoute = require('./routes/historico');  // Ruta para los sismos

app.use('/historico', historicoRoute);

app.listen(5000, () => {
  console.log('Servidor corriendo en el puerto 5000');
});
