const express = require('express');
const router = express.Router();
const authController = require('../controllers/autenticacionController');

router.post('/registrar', authController.registrarUsuario);
router.post('/login', authController.login);

module.exports = router;
