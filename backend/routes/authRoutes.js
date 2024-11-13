const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../config/db'); // Ajusta la ruta según donde tengas db.js

const router = express.Router();

// Ruta para el inicio de sesión
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const [user] = await db.query('SELECT * FROM users WHERE email = ?', [email]);

    if (user && bcrypt.compareSync(password, user.password)) {
      const id_user = user.id_user;
      const token = jwt.sign({ id_user }, 'tu_secreto', { expiresIn: '1h' });

      res.json({ success: true, id_user, token });
    } else {
      res.status(401).json({ success: false, message: 'Credenciales inválidas' });
    }
  } catch (error) {
    console.error('Error en el inicio de sesión:', error);
    res.status(500).json({ success: false, message: 'Error del servidor' });
  }
});

module.exports = router;
