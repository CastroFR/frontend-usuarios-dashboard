import axiosInstance from './axiosConfig';

export const authService = {
  async login(credentials) {
    try {
      console.log('Enviando credenciales:', credentials);
      const response = await axiosInstance.post('/login', credentials);
      console.log('Respuesta del login:', response.data);

      if (response.data.success && response.data.data?.token) {
        localStorage.setItem('token', response.data.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.data.user));
        console.log('Token guardado en localStorage:', response.data.data.token.substring(0, 20) + '...');
      } else {
        console.error('Respuesta sin token:', response.data);
      }

      return response.data;
    } catch (error) {
      console.error('Error en login:', error.response?.data || error);
      throw this.handleError(error);
    }
  },

  async register(userData) {
    try {
      const response = await axiosInstance.post('/register', userData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  async logout() {
    try {
      const response = await axiosInstance.post('/logout');
      this.clearAuthData();
      return response.data;
    } catch (error) {
      console.error('Error en logout:', error);
      this.clearAuthData();
      return { success: true, message: 'Sesión cerrada localmente' };
    }
  },

  async getCurrentUser() {
    try {
      const response = await axiosInstance.get('/me');
      console.log('Respuesta de /me:', response.data);
      
      if (response.data.success && response.data.data) {
        const userData = response.data.data;
        localStorage.setItem('user', JSON.stringify(userData));
        console.log('Usuario actualizado en localStorage');
        return userData;
      }
      throw new Error('No se pudo obtener el usuario');
    } catch (error) {
      console.error('Error obteniendo usuario actual:', error.response?.data || error);
      
      // Si es error 401, limpiar datos
      if (error.response?.status === 401) {
        this.clearAuthData();
      }
      
      throw this.handleError(error);
    }
  },

  async refreshToken() {
    try {
      const response = await axiosInstance.post('/refresh');
      
      if (response.data.success && response.data.data?.token) {
        localStorage.setItem('token', response.data.data.token);
        console.log('Token refrescado');
      }
      
      return response.data;
    } catch (error) {
      console.error('Error refrescando token:', error);
      throw this.handleError(error);
    }
  },

  async checkHealth() {
    try {
      const response = await axiosInstance.get('/health');
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  clearAuthData() {
    console.log('Limpiando datos de autenticación');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getStoredUser() {
    const user = localStorage.getItem('user');
    try {
      return user ? JSON.parse(user) : null;
    } catch (e) {
      console.error('Error parseando usuario:', e);
      return null;
    }
  },

  isAuthenticated() {
    const token = localStorage.getItem('token');
    return !!token;
  },

  handleError(error) {
    console.error('Error detallado:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });
    
    if (error.response?.data?.errors) {
      const errors = error.response.data.errors;
      const firstError = Object.values(errors)[0];
      return {
        message: Array.isArray(firstError) ? firstError[0] : firstError,
        errors: error.response.data.errors,
      };
    }

    if (error.response?.data?.message) {
      return {
        message: error.response.data.message,
      };
    }

    return {
      message: error.message || 'Error de conexión con el servidor',
    };
  },
};