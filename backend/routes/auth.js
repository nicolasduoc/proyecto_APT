const router = require('express').Router(); // Carga el enrutador de Express
const db = require('../config/db'); // Asume que tienes una conexión a la base de datos en db.js
const bcrypt = require('bcryptjs'); // Cifrador de contraseña

// Ruta de registro
router.post('/register', (req, res) => {
  const { username, email, password } = req.body;

  // Encriptar la contraseña
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) return res.status(500).json({ error: 'Error al encriptar la contraseña' });

    // Insertar el nuevo usuario en la base de datos
    const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
    db.query(query, [username, email, hashedPassword], (err, result) => {
      if (err) {
        return res.status(400).json({ error: 'El correo ya está registrado' });
      }
      res.json({ status: 'Usuario registrado exitosamente' });
    });
  });
});
const jwt = require('jsonwebtoken');

// Ruta de inicio de sesión
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  const query = 'SELECT * FROM users WHERE email = ?';
  db.query(query, [email], (err, results) => {
    if (err || results.length === 0) {
      return res.status(400).json({ error: 'Usuario no encontrado' });
    }

    const user = results[0];

    // Verificar la contraseña
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (!isMatch) {
        return res.status(400).json({ error: 'Contraseña incorrecta' });
      }

      // Generar el token JWT
      const token = jwt.sign({ id: user.id }, 'SECRET_KEY');
      res.header('auth-token', token).json({ token });
    });
  });
});

module.exports = router;
