const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  const token = req.header('auth-token');
  if (!token) return res.status(401).json({ error: 'Acceso denegado' });

  try {
    const verified = jwt.verify(token, 'SECRET_KEY');
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ error: 'Token no válido' });
  }
}

module.exports = verifyToken;
const verifyToken = require('./verifyToken');

app.get('/api/private', verifyToken, (req, res) => {
  res.json({ data: 'Contenido protegido' });
});
app.use(express.json());  
