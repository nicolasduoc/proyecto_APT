const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')


const login = async (req, res) => {
const {email, password} = req.body;

const user = await User.findOne({email});

if(!user){  
    return res.status(400).json({msg: 'El usuario no existe'});

}

if(!bcrypt.compareSync(password, user.password)){
    return res.status(400).json({msg: 'La contraseña es incorrecta'});

}

const payload = {
    check: true

};

const token = jwt.sign(payload, process.env.SECRET, {
    expiresIn: 3600
});

res.json({token});


    
}
const registrarUsuario = async (req, res) => {
    const { nombre, email, contraseña } = req.body; // Obtén los datos del cuerpo de la solicitud

    try {
        // Verificar si el email ya está registrado
        const usuarioExistente = await User.findOne({ where: { email } });
        if (usuarioExistente) {
            return res.status(400).json({ mensaje: 'El email ya está registrado' });
        }

        // Crear nuevo usuario
        const nuevoUsuario = await User.create({
            nombre,
            email,
            contraseña
        });

        // Generar token JWT
        const token = jwt.sign({ id: nuevoUsuario.id }, 'secret_key', { expiresIn: '1h' }); // Reemplaza 'secret_key' con una clave secreta en producción

        // Enviar respuesta con el token
        res.status(201).json({ token });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al registrar el usuario', error });
    }
};




module.exports = {
    registrarUsuario,
    login
};