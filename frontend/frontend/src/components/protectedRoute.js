// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element }) => {
  const isAuthenticated = !!localStorage.getItem('auth-token'); // Verifica si hay un token en localStorage

  return isAuthenticated ? element : <Navigate to="/login" />; // Redirige a /login si no está autenticado
};

export default ProtectedRoute;