import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Interceptor para agregar token a las peticiones
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('Axios: Token agregado a la petición', config.url);
    }
    return config;
  },
  (error) => {
    console.error('Axios: Error en interceptor de request:', error);
    return Promise.reject(error);
  }
);

// Interceptor para respuestas
axiosInstance.interceptors.response.use(
  (response) => {
    console.log('Axios: Respuesta exitosa', response.config.url, response.status);
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    console.log('Axios: Error en respuesta', {
      url: error.config?.url,
      status: error.response?.status,
      data: error.response?.data
    });
    
    // Solo manejar errores 401 que no sean de login/refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      const isAuthRequest = originalRequest.url?.includes('/login') || 
                           originalRequest.url?.includes('/register') ||
                           originalRequest.url?.includes('/refresh');
      
      if (!isAuthRequest) {
        originalRequest._retry = true;
        
        try {
          console.log('Axios: Intentando refrescar token');
          const response = await axiosInstance.post('/refresh');
          
          if (response.data.success && response.data.data?.token) {
            localStorage.setItem('token', response.data.data.token);
            console.log('Axios: Token refrescado exitosamente');
            originalRequest.headers.Authorization = `Bearer ${response.data.data.token}`;
            return axiosInstance(originalRequest);
          }
        } catch (refreshError) {
          console.error('Axios: Error refrescando token:', refreshError);
        }
        
        // Si no podemos refrescar, limpiar solo para rutas no públicas
        console.log('Axios: Limpiando datos de autenticación');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        
        // No redirigir automáticamente, dejar que el componente maneje
        if (window.location.pathname !== '/login' && window.location.pathname !== '/register') {
          console.log('Axios: Redirigiendo a login');
          window.location.href = '/login';
        }
      }
    }
    
    return Promise.reject(error);
  }
);

export default axiosInstance;