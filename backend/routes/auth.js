
const express = require('express');
const router = express.Router();
const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Puedes usar una clave secreta fija para pruebas
const secretKey = 'mysecretkey123'; // Cambia esto en producción

// Ruta de inicio de sesión
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  const query = 'SELECT * FROM users WHERE email = ?';
  db.query(query, [email], (err, results) => {
    if (err) {
      console.error('Error en la consulta:', err);
      return res.status(500).json({ error: 'Error en el servidor' });
    }

    if (results.length === 0) {
      return res.status(400).json({ error: 'Usuario no encontrado' });
    }

    const user = results[0];

    // Verificar la contraseña
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        console.error('Error al comparar contraseñas:', err);
        return res.status(500).json({ error: 'Error en el servidor' });
      }

      if (!isMatch) {
        return res.status(400).json({ error: 'Contraseña incorrecta' });
      }

      // Generar el token JWT y enviar el username
      const token = jwt.sign({ id: user.id }, secretKey, { expiresIn: '1h' });
      res.header('auth-token', token).json({ token, username: user.username }); // Enviar username
    });
  });
});

// Ruta para obtener información del usuario
router.get('/profile', (req, res) => {
  const token = req.header('auth-token');
  if (!token) return res.status(401).json({ error: 'Acceso denegado' });

  jwt.verify(token, secretKey, (err, verified) => {
    if (err) return res.status(400).json({ error: 'Token no válido' });

    const query = 'SELECT username FROM users WHERE id = ?';
    db.query(query, [verified.id], (err, results) => {
      if (err) {
        console.error('Error en la consulta:', err);
        return res.status(500).json({ error: 'Error en el servidor' });
      }

      if (results.length === 0) {
        return res.status(400).json({ error: 'Usuario no encontrado' });
      }

      res.json({ username: results[0].username }); // Devolver el nombre de usuario
    });
  });
});

module.exports = router;
