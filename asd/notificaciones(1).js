const express = require('express');
const { Expo } = require('expo-server-sdk');
const router = express.Router();
const db = require('../config/db');

const expo = new Expo();

// Ruta para enviar notificaciones
router.post('/enviar-notificacion', async (req, res) => {
  const { pushToken, datos } = req.body;

  try {
    if (!Expo.isExpoPushToken(pushToken)) {
      return res.status(400).json({
        success: false,
        message: 'Token de notificación no válido'
      });
    }

    const mensaje = {
      to: pushToken,
      sound: 'default',
      title: '¡Alerta de Sismo!',
      body: `Se ha detectado un sismo de magnitud ${datos.magnitud} en tu área`,
      data: { datos },
      priority: 'high',
    };

    const tickets = await expo.sendPushNotificationsAsync([mensaje]);
    
    // Guardar el token en la base de datos
    const sql = 'UPDATE users SET push_token = ? WHERE id = ?';
    db.query(sql, [pushToken, datos.user_id], (err) => {
      if (err) {
        console.error('Error al guardar push token:', err);
      }
    });

    return res.json({
      success: true,
      message: 'Notificación enviada correctamente',
      tickets
    });

  } catch (error) {
    console.error('Error al enviar notificación:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al enviar la notificación',
      error: error.message
    });
  }
});

// Ruta para enviar notificaciones masivas
router.post('/enviar-notificacion-masiva', async (req, res) => {
  const { datos } = req.body;

  try {
    // Obtener todos los tokens de la base de datos
    db.query('SELECT push_token FROM users WHERE push_token IS NOT NULL', async (err, results) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: 'Error al obtener tokens',
          error: err.message
        });
      }

      const tokens = results.map(result => result.push_token);
      const mensajes = tokens.map(token => ({
        to: token,
        sound: 'default',
        title: '¡Alerta de Sismo!',
        body: `Se ha detectado un sismo de magnitud ${datos.magnitud} en tu área`,
        data: { datos },
        priority: 'high',
      }));

      const tickets = await expo.sendPushNotificationsAsync(mensajes);

      res.json({
        success: true,
        message: 'Notificaciones masivas enviadas',
        tickets
      });
    });
  } catch (error) {
    console.error('Error al enviar notificaciones masivas:', error);
    res.status(500).json({
      success: false,
      message: 'Error al enviar notificaciones masivas',
      error: error.message
    });
  }
});

module.exports = router;