import React from 'react';
import { Navigate } from 'react-router-dom';
import { authService } from '../api/authService';

const PublicRoute = ({ children, restricted = false }) => {
  // restricted = true significa que la ruta está restringida a usuarios NO autenticados
  // Ejemplo: login, register
  const isAuthenticated = authService.isAuthenticated();
  
  if (isAuthenticated && restricted) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return children;
};

export default PublicRoute;