import { useState, useCallback } from 'react';
import { userService } from '../api/userService';

export const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    current_page: 1,
    total: 0,
    per_page: 10,
  });

  const fetchUsers = useCallback(async (params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const response = await userService.getAll(params);
      console.log('Respuesta completa de /users:', response);

      // Tu backend devuelve: {success: true, data: {data: [...], current_page: X, ...}}
      if (response.success && response.data) {
        // Si response.data tiene una propiedad 'data' (array de usuarios)
        if (response.data.data && Array.isArray(response.data.data)) {
          setUsers(response.data.data);

          // Configurar paginación desde response.data
          setPagination({
            current_page: response.data.current_page || 1,
            total: response.data.total || 0,
            per_page: response.data.per_page || 10,
            last_page: response.data.last_page || 1,
          });
        }
        // Si response.data es directamente un array
        else if (Array.isArray(response.data)) {
          setUsers(response.data);
        }
        // Si la estructura es diferente
        else {
          console.error('Estructura de respuesta no esperada:', response);
          setUsers([]);
        }
      } else {
        console.error('Respuesta sin éxito o sin data:', response);
        setUsers([]);
      }

      return response;
    } catch (err) {
      console.error('Error en fetchUsers:', err);
      const errorMsg = err.message || err.response?.data?.message || 'Error al cargar usuarios';
      setError(errorMsg);
      setUsers([]);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const createUser = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await userService.create(userData);
      if (response.success && response.data) {
        setUsers(prev => [response.data, ...prev]);
        return response.data;
      }
      throw new Error(response.message || 'Error al crear usuario');
    } catch (err) {
      const errorMsg = err.message || 'Error al crear usuario';
      setError(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (id, userData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await userService.update(id, userData);
      if (response.success && response.data) {
        setUsers(prev => prev.map(user =>
          user.id === id ? response.data : user
        ));
        return response.data;
      }
      throw new Error(response.message || 'Error al actualizar usuario');
    } catch (err) {
      const errorMsg = err.message || 'Error al actualizar usuario';
      setError(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await userService.delete(id);
      if (response.success) {
        setUsers(prev => prev.filter(user => user.id !== id));
      } else {
        throw new Error(response.message || 'Error al eliminar usuario');
      }
    } catch (err) {
      const errorMsg = err.message || 'Error al eliminar usuario';
      setError(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const restoreUser = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const restoredUser = await userService.restore(id);
      setUsers(prev => prev.map(user =>
        user.id === id ? restoredUser : user
      ));

      // Forzar actualización del estado
      const params = {
        page: currentPage,
        search: searchTerm,
        ...(viewMode === 'deleted' && { deleted: true }),
        ...(viewMode === 'active' && { deleted: false }),
      };

      // Recargar datos después de restaurar
      setTimeout(() => {
        fetchUsers(params);
      }, 500);

      return restoredUser;
    } catch (err) {
      const errorMsg = err.message || 'Error al restaurar usuario';
      setError(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const forceDeleteUser = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await userService.forceDelete(id);
      if (response.success) {
        setUsers(prev => prev.filter(user => user.id !== id));
      } else {
        throw new Error(response.message || 'Error al eliminar permanentemente');
      }
    } catch (err) {
      const errorMsg = err.message || 'Error al eliminar permanentemente';
      setError(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    users,
    loading,
    error,
    pagination,
    fetchUsers,
    createUser,
    updateUser,
    deleteUser,
    restoreUser,
    forceDeleteUser,
  };
};