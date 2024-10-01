import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const token = localStorage.getItem('auth-token'); // Verifica si el token está almacenado
  const navigate = useNavigate();

  const handleLogout = () => {
    // Elimina el token de autenticación al cerrar sesión
    localStorage.removeItem('auth-token');
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="logo">EarthAlert</div>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
        <ul className="navbar-nav">
          <li className="nav-item active">
            <a className="nav-link" href="/inicio">Inicio</a>
          </li>
         
          <li className="nav-item">
            <a className="nav-link" href="/sismos">Historial de Sismos</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/historico">Sismos historicos</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#profile">Mapa Tectonico</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#profile">Consejos de Seguridad</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#profile">Mi Perfil</a>
          </li>

          {/* Mostrar Iniciar Sesión/Registrarse o Cerrar Sesión según el estado de autenticación */}
          {token ? (
            <li className="nav-item">
              <button className="btn btn-link nav-link" onClick={handleLogout}>
                Cerrar Sesión
              </button>
            </li>
          ) : (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/login">Iniciar Sesión</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register">Registrarse</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
