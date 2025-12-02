import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  console.log('PrivateRoute - isAuthenticated:', isAuthenticated);
  console.log('PrivateRoute - loading:', loading);
  console.log('PrivateRoute - pathname:', location.pathname);

  if (loading) {
    console.log('PrivateRoute - Mostrando loading');
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  console.log('PrivateRoute - Verificando autenticación:', isAuthenticated);
  
  if (!isAuthenticated) {
    console.log('PrivateRoute - No autenticado, redirigiendo a login');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  console.log('PrivateRoute - Usuario autenticado, mostrando contenido');
  return children;
};

export default PrivateRoute;