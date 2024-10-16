// routes/historico.js
const express = require('express');
const router = express.Router();
const db = require('../config/db'); // O donde sea que exportes tu conexión a MySQL

router.get('/', (req, res) => {
  const query = `
    SELECT s.*, d.descripcion, d.imagen
    FROM sismos s
    LEFT JOIN descripcion d ON s.id = d.sismo_id`;
  
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error al obtener los sismos:', err);
      return res.status(500).send('Error interno del servidor');
    }
    res.json(results); // Devuelve los resultados como JSON
  });
});

module.exports = router;
