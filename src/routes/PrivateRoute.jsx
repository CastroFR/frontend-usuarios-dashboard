import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { authService } from '../api/authService';

// Loader simple
const SimpleLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
    <span className="ml-3 text-gray-600 dark:text-gray-300">Verificando autenticación...</span>
  </div>
);

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const [authState, setAuthState] = React.useState({
    isAuthenticated: false,
    loading: true,
    checked: false
  });

  React.useEffect(() => {
    // Función para verificar autenticación
    const checkAuth = async () => {
      // Verificar si hay token
      const hasToken = authService.isAuthenticated();
      
      if (!hasToken) {
        setAuthState({
          isAuthenticated: false,
          loading: false,
          checked: true
        });
        return;
      }

      // Si hay token, podemos asumir que está autenticado
      // La validación real ocurrirá en las llamadas a la API
      setAuthState({
        isAuthenticated: true,
        loading: false,
        checked: true
      });
    };

    // Solo verificar si no se ha verificado antes
    if (!authState.checked) {
      checkAuth();
    }
  }, [authState.checked]);

  if (authState.loading) {
    return <SimpleLoader />;
  }

  if (!authState.isAuthenticated) {
    // Guardar la ubicación a la que intentaba acceder
    const redirectPath = location.pathname !== '/' ? location.pathname + location.search : '/dashboard';
    return <Navigate to="/login" state={{ from: redirectPath }} replace />;
  }

  return children;
};

export default PrivateRoute;