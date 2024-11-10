const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Import the existing database connection

// Route to insert a new alert
router.post('/crear-alerta', (req, res) => {
  const { user_id, hora, fecha, latitud, longitud, magnitud } = req.body;

  if (!user_id || !hora || !fecha || !latitud || !longitud || !magnitud) {
    return res.status(400).json({ error: 'Por favor, complete todos los campos.' });
  }

  // SQL query to insert the alert data
  const sql = `INSERT INTO alerta (user_id, hora, fecha, latitud, longitud, magnitud) VALUES (?, ?, ?, ?, ?, ?)`;

  // Execute the query
  db.query(sql, [user_id, hora, fecha, latitud, longitud, magnitud], (err, result) => {
    if (err) {
      console.error('Error inserting data into alerta table:', err);
      return res.status(500).json({ error: 'Error al crear la alerta' });
    }

    res.status(201).json({ message: 'Alerta creada exitosamente', alertaId: result.insertId });
  });
});

module.exports = router;
