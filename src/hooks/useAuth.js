import { useCallback } from 'react';
import { authService } from '../api/authService';

export const useAuth = () => {
  const login = useCallback(async (credentials) => {
    try {
      const result = await authService.login(credentials);
      return { success: true, ...result };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Error de autenticación' 
      };
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await authService.logout();
      return { success: true };
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      return { success: false, error: 'Error al cerrar sesión' };
    }
  }, []);

  const register = useCallback(async (userData) => {
    try {
      const result = await authService.register(userData);
      return { success: true, ...result };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Error en el registro' 
      };
    }
  }, []);

  const checkAuth = useCallback(() => {
    return authService.isAuthenticated();
  }, []);

  const getCurrentUser = useCallback(async () => {
    try {
      if (authService.isAuthenticated()) {
        return await authService.getCurrentUser();
      }
      return null;
    } catch (error) {
      console.error('Error al obtener usuario:', error);
      return null;
    }
  }, []);

  return {
    login,
    logout,
    register,
    checkAuth,
    getCurrentUser,
    isAuthenticated: authService.isAuthenticated(),
  };
};