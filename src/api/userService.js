import axiosInstance from './axiosConfig';

export const userService = {
  async getAll(params = {}) {
    const response = await axiosInstance.get('/users', { params });
    return response.data;
  },

  async getById(id) {
    const response = await axiosInstance.get(`/users/${id}`);
    return response.data.data;
  },

  async create(userData) {
    const response = await axiosInstance.post('/users', userData);
    return response.data;
  },

  async update(id, userData) {
    const response = await axiosInstance.put(`/users/${id}`, userData);
    return response.data;
  },

  async delete(id) {
    const response = await axiosInstance.delete(`/users/${id}`);
    return response.data;
  },

  async restore(id) {
    const response = await axiosInstance.post(`/users/${id}/restore`);
    return response.data;
  },

  async forceDelete(id) {
    const response = await axiosInstance.delete(`/users/${id}/force`);
    return response.data;
  },

  async paginate(page = 1, perPage = 10, filters = {}) {
    const params = {
      page,
      per_page: perPage,
      ...filters
    };
    const response = await axiosInstance.get('/users', { params });
    return response.data.data;
  },
};