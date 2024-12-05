const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const historicoRoute = require('./routes/historico');
const alertaRoute = require('./routes/alerta');
const contactosRoute = require('./routes/contactos');
const notificacionesRoute = require('./routes/notificaciones');
// ... tus otros requires ...


const app = express();
app.use(cors());
app.use(bodyParser.json());

// Ruta para la p¨¢gina de inicio (Hello World)
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Rutas principales
app.use('/api/auth', authRoutes); // Rutas de autenticaci¨®n
app.use('/historico', historicoRoute);
app.use('/api/alerta', alertaRoute);
app.use('/contactos', contactosRoute);
app.use('/api/notificaciones', notificacionesRoute);

// Intervalo para mensaje de verificaci¨®n de estado en consola
const interval = 10000; // 10 segundos

setInterval(() => {
  console.log('El servidor est¨¢ activo y funcionando correctamente.');
}, interval);

const PORT = process.env.PORT || 5000;

// Iniciar el servidor con un manejo de errores
app.listen(PORT, (err) => {
  if (err) {
    console.error(`Error al iniciar el servidor: ${err.message}`);
  } else {
    console.log(`Server running on port ${PORT}`);
  }
});
