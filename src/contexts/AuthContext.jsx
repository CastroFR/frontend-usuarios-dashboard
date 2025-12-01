/**
 * Contexto de autenticación para gestionar el estado de sesión del usuario
 * en toda la aplicación.
 */
import React, { createContext, useState, useEffect, useContext } from 'react';
import { authService } from '../api/authService';

const ContextoAutenticacion = createContext();

/**
 * Hook personalizado para acceder al contexto de autenticación.
 * Debe ser utilizado dentro de un AuthProvider.
 * 
 * @returns {Object} Objeto con propiedades de autenticación: user, loading, error, login, register, logout, isAuthenticated
 * @throws {Error} Si se utiliza fuera del AuthProvider
 */
export const useAuth = () => {
  const context = useContext(ContextoAutenticacion);
  if (!context) {
    throw new Error('useAuth debe ser utilizado dentro de un AuthProvider');
  }
  return context;
};

/**
 * Proveedor de autenticación que envuelve la aplicación.
 * Gestiona el estado global de autenticación y proporciona métodos
 * para login, registro y cierre de sesión.
 * 
 * @param {Object} props - Propiedades del componente
 * @param {React.ReactNode} props.children - Componentes hijos a envolver
 * @returns {JSX.Element} Proveedor de contexto
 */
export const AuthProvider = ({ children }) => {
  // Estado del usuario autenticado
  const [user, setUser] = useState(null);
  
  // Indicador de carga durante operaciones asincrónicas
  const [loading, setLoading] = useState(true);
  
  // Mensaje de error en caso de fallos
  const [error, setError] = useState(null);

  /**
   * Efecto que verifica la autenticación al montar el componente.
   */
  useEffect(() => {
    verificarAutenticacion();
  }, []);

  /**
   * Verifica si existe una sesión válida al cargar la aplicación.
   * Intenta obtener los datos del usuario y maneja errores de autenticación.
   */
  const verificarAutenticacion = async () => {
    if (authService.isAuthenticated()) {
      try {
        const datosUsuario = await authService.getCurrentUser();
        setUser(datosUsuario);
      } catch (error) {
        console.error('Error al verificar autenticación:', error);
        await authService.logout();
        setUser(null);
      }
    }
    setLoading(false);
  };

  /**
   * Autentica un usuario con sus credenciales.
   * 
   * @param {Object} credentials - Credenciales (email, password)
   * @returns {Object} Objeto con éxito, usuario y token, o error
   */
  const login = async (credentials) => {
    try {
      setError(null);
      const { user, token } = await authService.login(credentials);
      setUser(user);
      return { success: true, user, token };
    } catch (error) {
      const message = error.response?.data?.message || 'Error al iniciar sesión';
      setError(message);
      return { success: false, error: message };
    }
  };

  /**
   * Registra un nuevo usuario en la aplicación.
   * 
   * @param {Object} userData - Datos del usuario a registrar
   * @returns {Object} Objeto con éxito, usuario y token, o error
   */
  const register = async (userData) => {
    try {
      setError(null);
      const { user, token } = await authService.register(userData);
      setUser(user);
      return { success: true, user, token };
    } catch (error) {
      const message = error.response?.data?.message || 'Error al registrar el usuario';
      setError(message);
      return { success: false, error: message };
    }
  };

  /**
   * Cierra la sesión del usuario autenticado.
   */
  const logout = async () => {
    await authService.logout();
    setUser(null);
    setError(null);
  };

  /**
   * Objeto de valor que se proporciona a través del contexto.
   * Contiene el estado y métodos de autenticación.
   */
  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };

  return (
    <ContextoAutenticacion.Provider value={value}>
      {children}
    </ContextoAutenticacion.Provider>
  );
};