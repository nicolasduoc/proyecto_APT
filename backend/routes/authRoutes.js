// routes/authRoutes.js
const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../config/db');

const router = express.Router();

// Ruta de registro de usuario
router.post('/register', (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ success: false, message: 'Todos los campos son obligatorios' });
  }

  // Verificar si el usuario ya existe
  db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
    if (err) {
      console.error('Error al consultar la base de datos:', err);
      return res.status(500).json({ success: false, message: 'Error al verificar el email' });
    }

    if (results.length > 0) {
      return res.status(400).json({ success: false, message: 'El email ya está registrado' });
    }

    // Hashear la contraseña
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        console.error('Error al hashear la contraseña:', err);
        return res.status(500).json({ success: false, message: 'Error al registrar el usuario' });
      }

      // Insertar el nuevo usuario en la base de datos
      db.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hashedPassword], (err) => {
        if (err) {
          console.error('Error al insertar el usuario:', err);
          return res.status(500).json({ success: false, message: 'Error al registrar el usuario' });
        }

        res.status(201).json({ success: true, message: 'Usuario registrado con éxito' });
      });
    });
  });
});

// Ruta de inicio de sesión de usuario
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Todos los campos son obligatorios' });
  }

  // Verificar si el usuario existe
  db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
    if (err) {
      console.error('Error al consultar la base de datos:', err);
      return res.status(500).json({ success: false, message: 'Error al verificar las credenciales' });
    }

    if (results.length === 0) {
      return res.status(400).json({ success: false, message: 'Credenciales inválidas' });
    }

    // Comparar contraseñas
    bcrypt.compare(password, results[0].password, (err, isMatch) => {
      if (err) {
        console.error('Error al comparar las contraseñas:', err);
        return res.status(500).json({ success: false, message: 'Error al iniciar sesión' });
      }

      if (!isMatch) {
        return res.status(400).json({ success: false, message: 'Credenciales inválidas' });
      }

      res.json({ success: true, message: 'Inicio de sesión exitoso' });
    });
  });
});

module.exports = router;
