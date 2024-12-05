const express = require("express");
const { Expo } = require("expo-server-sdk");
const router = express.Router();
const db = require("../config/db");

const expo = new Expo();

router.post("/crear-alerta", async (req, res) => {
  const { user_id, hora, fecha, latitud, longitud, magnitud, push_token } =
    req.body;

  if (!user_id || !hora || !fecha || !latitud || !longitud || !magnitud) {
    return res
      .status(400)
      .json({ error: "Por favor, complete todos los campos." });
  }

  // Primero guardamos la alerta
  const sql = `INSERT INTO alerta (user_id, hora, fecha, latitud, longitud, magnitud) VALUES (?, ?, ?, ?, ?, ?)`;

  db.query(
    sql,
    [user_id, hora, fecha, latitud, longitud, magnitud],
    async (err, result) => {
      if (err) {
        console.error("Error inserting data into alerta table:", err);
        return res.status(500).json({ error: "Error al crear la alerta" });
      }

      try {
        // Enviar confirmación detallada al creador de la alerta
        if (push_token && Expo.isExpoPushToken(push_token)) {
          const confirmacionMessage = {
            to: push_token,
            sound: "default",
            title: "Alerta Enviada Exitosamente",
            body: `Magnitud: ${magnitud}
Fecha: ${fecha}
Hora: ${hora}
Latitud: ${latitud}
Longitud: ${longitud}`,
            data: {
              tipo: "confirmacion",
              magnitud,
              latitud,
              longitud,
              hora,
              fecha,
              alertaId: result.insertId,
            },
            priority: "high",
          };

          await expo.sendPushNotificationsAsync([confirmacionMessage]);
        }

        // Enviar a todos los demás usuarios con información completa
        db.query(
          "SELECT push_token FROM users WHERE push_token IS NOT NULL AND push_token != ?",
          [push_token],
          async (tokenErr, tokens) => {
            if (!tokenErr && tokens.length > 0) {
              const messages = tokens
                .map((t) => t.push_token)
                .filter((token) => Expo.isExpoPushToken(token))
                .map((token) => ({
                  to: token,
                  sound: "default",
                  title: "¡Alerta de Sismo!",
                  body: `Magnitud: ${magnitud}
Fecha: ${fecha}
Hora: ${hora}
Latitud: ${latitud}
Longitud: ${longitud}`,
                  data: {
                    tipo: "alerta",
                    magnitud,
                    latitud,
                    longitud,
                    hora,
                    fecha,
                    alertaId: result.insertId,
                  },
                  priority: "high",
                }));

              if (messages.length > 0) {
                await expo.sendPushNotificationsAsync(messages);
              }
            }
          },
        );

        res.status(201).json({
          message: "Alerta creada exitosamente",
          alertaId: result.insertId,
        });
      } catch (error) {
        console.error("Error al enviar notificaciones:", error);
        res.status(201).json({
          message: "Alerta creada pero hubo un error con las notificaciones",
          alertaId: result.insertId,
        });
      }
    },
  );
});

module.exports = router;
