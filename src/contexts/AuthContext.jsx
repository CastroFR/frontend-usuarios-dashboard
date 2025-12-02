import React, { createContext, useState, useContext, useEffect } from 'react';
import { authService } from '../api/authService';

const AuthContext = createContext({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadUser = () => {
      console.log('AuthContext: Iniciando carga de usuario');
      const token = localStorage.getItem('token');
      const storedUser = authService.getStoredUser();
      
      console.log('AuthContext: Token en localStorage:', !!token);
      console.log('AuthContext: Usuario en localStorage:', storedUser);
      
      if (token && storedUser) {
        console.log('AuthContext: Estableciendo usuario desde localStorage');
        setUser(storedUser);
      } else {
        console.log('AuthContext: No hay token o usuario, limpiando');
        authService.clearAuthData();
      }
      
      setLoading(false);
      console.log('AuthContext: Carga completada');
    };

    loadUser();
  }, []);

  const login = async (credentials) => {
    setError(null);
    console.log('AuthContext: Iniciando login');
    
    try {
      const response = await authService.login(credentials);
      console.log('AuthContext: Login exitoso, respuesta:', response);
      
      if (response.success && response.data) {
        console.log('AuthContext: Estableciendo usuario desde respuesta');
        setUser(response.data.user);
        
        // Verificar si podemos obtener el usuario actual
        try {
          const currentUser = await authService.getCurrentUser();
          console.log('AuthContext: Usuario verificado desde API:', currentUser);
          setUser(currentUser);
        } catch (userError) {
          console.warn('AuthContext: No se pudo verificar usuario, usando datos de login:', userError);
          // Usamos los datos del login si la verificación falla
          setUser(response.data.user);
        }
        
        return { success: true, data: response };
      } else {
        console.error('AuthContext: Login falló en el backend:', response);
        return { 
          success: false, 
          error: { message: response.message || 'Error en el servidor' } 
        };
      }
    } catch (error) {
      console.error('AuthContext: Error en login:', error);
      const errorMessage = error.message || 'Error al iniciar sesión';
      setError(errorMessage);
      return { 
        success: false, 
        error: { message: errorMessage } 
      };
    }
  };

  const register = async (userData) => {
    setError(null);
    try {
      const response = await authService.register(userData);
      return { success: true, data: response };
    } catch (error) {
      setError(error.message || 'Error al registrarse');
      return { success: false, error };
    }
  };

  const logout = async () => {
    try {
      console.log('AuthContext: Iniciando logout');
      await authService.logout();
      setUser(null);
      setError(null);
      console.log('AuthContext: Logout completado');
      return { success: true };
    } catch (error) {
      console.error('AuthContext: Error en logout:', error);
      authService.clearAuthData();
      setUser(null);
      return { success: true };
    }
  };

  const updateUser = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const checkHealth = async () => {
    try {
      return await authService.checkHealth();
    } catch (error) {
      throw error;
    }
  };

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    updateUser,
    checkHealth,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};