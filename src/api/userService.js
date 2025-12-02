import axiosInstance from './axiosConfig';

export const userService = {
  async getAll(params = {}) {
    try {
      console.log('userService - Solicitando usuarios con params:', params);
      const response = await axiosInstance.get('/users', { params });
      console.log('userService - Respuesta recibida:', response.data);
      return response.data;
    } catch (error) {
      console.error('userService - Error en getAll:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      throw error.response?.data || error;
    }
  },

  async getById(id) {
    try {
      const response = await axiosInstance.get(`/users/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  async create(userData) {
    try {
      const response = await axiosInstance.post('/users', userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  async update(id, userData) {
    try {
      const response = await axiosInstance.put(`/users/${id}`, userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  async delete(id) {
    try {
      const response = await axiosInstance.delete(`/users/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  async restore(id) {
    try {
      const response = await axiosInstance.post(`/users/${id}/restore`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  async forceDelete(id) {
    try {
      const response = await axiosInstance.delete(`/users/${id}/force`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
};