import React, { useEffect, useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/PaginaDespuesDelLogin.css';

const PaginaDespuesDelLogin = () => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    // Fetch user data (username) after login
    const fetchUserData = async () => {
      const token = localStorage.getItem('auth-token'); // Get the token from localStorage
      if (token) {
        try {
          const response = await axios.get('http://localhost:5000/api/user/profile', {
            headers: { 'auth-token': token }, // Send token in the headers
          });
          setUsername(response.data.username); // Set username from response
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    fetchUserData();
  }, []);

  const handleViewAlerts = () => {
    alert('Viewing alerts...');
  };

  return (
    <div className="pagina-container">
      {/* Hero Section */}
      <section className="hero">
        <h1 className="display-4">¡Bienvenido, {username}!</h1> {/* Display username */}
        <p className="lead">Estamos aquí para mantenerte informado y seguro.</p>
        <button className="btn btn-primary" onClick={handleViewAlerts}>Ver Mis Alertas</button>
      </section>

      {/* Feature Section */}
      <section className="features">
        <div className="feature card">
          <div className="card-body">
            <h5 className="card-title">Mis Alertas</h5>
            <p className="card-text">Revisa las alertas sísmicas recientes que has recibido.</p>
          </div>
        </div>
        <div className="feature card">
          <div className="card-body">
            <h5 className="card-title">Mi Perfil</h5>
            <p className="card-text">Administra tu información personal y preferencias de alertas.</p>
          </div>
        </div>
        <div className="feature card">
          <div className="card-body">
            <h5 className="card-title">Configuración</h5>
            <p className="card-text">Ajusta las configuraciones de la aplicación a tus necesidades.</p>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="footer">
        <p className="text-muted">© 2024 EarthAlert. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default PaginaDespuesDelLogin;
