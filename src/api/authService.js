import axiosInstance from './axiosConfig';

export const authService = {
  async login(credentials) {
    const response = await axiosInstance.post('/login', credentials);
    const { token, user } = response.data.data;
    
    // Guardar tokens
    localStorage.setItem('access_token', token);
    localStorage.setItem('refresh_token', token); // En nuestra API, el refresh token es el mismo
    
    return { user, token };
  },

  async register(userData) {
    const response = await axiosInstance.post('/register', userData);
    return response.data;
  },

  async logout() {
    const response = await axiosInstance.post('/logout');
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    return response.data;
  },

  async refreshToken() {
    const token = localStorage.getItem('refresh_token');
    const response = await axiosInstance.post('/refresh', {}, {
      headers: { Authorization: `Bearer ${token}` }
    });
    localStorage.setItem('access_token', response.data.data.token);
    return response.data;
  },

  async getCurrentUser() {
    const response = await axiosInstance.get('/me');
    return response.data.data;
  },

  isAuthenticated() {
    return !!localStorage.getItem('access_token');
  },

  getToken() {
    return localStorage.getItem('access_token');
  },
};