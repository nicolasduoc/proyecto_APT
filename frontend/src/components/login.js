import React, { useState } from 'react';
import axios from 'axios';

function Login() {
  const [data, setData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/user/login', data)
      .then(res => {
        // Verifica que res.data esté definido antes de acceder a sus propiedades
        if (res && res.data && res.data.token) {
          localStorage.setItem('auth-token', res.data.token);
          alert('Login exitoso');
        } else {
          alert('Respuesta inesperada del servidor.');
        }
      })
      .catch(err => {
        // Maneja el caso en que err.response es undefined
        if (err.response && err.response.data && err.response.data.error) {
          alert(`Error: ${err.response.data.error}`);
        } else {
          console.error('Error en la solicitud:', err); // Depura el error
          alert('Error en la solicitud. Por favor, intente de nuevo.');
        }
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" name="email" placeholder="Email" onChange={handleChange} />
      <input type="password" name="password" placeholder="Contraseña" onChange={handleChange} />
      <button type="submit">Ingresar</button>
    </form>
  );
}

export default Login;
