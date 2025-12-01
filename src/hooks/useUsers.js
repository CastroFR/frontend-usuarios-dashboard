import { useCallback } from 'react';
import { userService } from '../api/userService';

export const useUsers = () => {
  const getAllUsers = useCallback(async (params = {}) => {
    try {
      const data = await userService.getAll(params);
      return { success: true, data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Error al obtener usuarios' 
      };
    }
  }, []);

  const getUserById = useCallback(async (id) => {
    try {
      const data = await userService.getById(id);
      return { success: true, data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Error al obtener usuario' 
      };
    }
  }, []);

  const createUser = useCallback(async (userData) => {
    try {
      const data = await userService.create(userData);
      return { success: true, data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Error al crear usuario' 
      };
    }
  }, []);

  const updateUser = useCallback(async (id, userData) => {
    try {
      const data = await userService.update(id, userData);
      return { success: true, data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Error al actualizar usuario' 
      };
    }
  }, []);

  const deleteUser = useCallback(async (id) => {
    try {
      await userService.delete(id);
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Error al eliminar usuario' 
      };
    }
  }, []);

  const restoreUser = useCallback(async (id) => {
    try {
      await userService.restore(id);
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Error al restaurar usuario' 
      };
    }
  }, []);

  return {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    restoreUser,
  };
};