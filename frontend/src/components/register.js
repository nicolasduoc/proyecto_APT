import React, { useState } from 'react';
import axios from 'axios';

function Register() {
  const [data, setData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación básica para asegurar que todos los campos estén llenos
    if (!data.username || !data.email || !data.password) {
      alert('Todos los campos son obligatorios.');
      return;
    }

    axios.post('http://localhost:5000/api/user/register', data)
      .then(res => {
        // Verifica que res.data esté definido antes de acceder a sus propiedades
        if (res && res.data && res.data.status) {
          alert(res.data.status);
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
      <input
        type="text"
        name="username"
        placeholder="Usuario"
        value={data.username}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={data.email}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Contraseña"
        value={data.password}
        onChange={handleChange}
        required
      />
      <button type="submit">Registrar</button>
    </form>
  );
}

export default Register;
