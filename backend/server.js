// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const historicoRoute = require('./routes/historico');
const alertaRoute = require('./routes/alerta');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/auth', authRoutes); // Usar las rutas de autenticación
app.use('/historico',historicoRoute);
app.use('/api/alerta',alertaRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
