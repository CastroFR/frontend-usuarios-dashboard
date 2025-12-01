import axios from 'axios';

/**
 * Configuración centralizada de Axios
 * 
 * Este módulo configura una instancia de axios con:
 * - URL base de la API desde variables de entorno
 * - Interceptores para autenticación y manejo de tokens
 * - Renovación automática de tokens cuando expiran
 * - Manejo de errores de autenticación
 */

// URL base de la API desde variables de entorno o puerto local por defecto
// Variable esperada en archivo .env: VITE_API_BASE_URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

/**
 * Instancia personalizada de axios
 * Configurada con:
 * - baseURL: Punto de acceso a la API
 * - headers: Content-Type y Accept para JSON
 * - timeout: 10 segundos máximo para cada solicitud
 */
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 10000, // 10 segundos máximo por solicitud
});

/**
 * Interceptor de solicitudes (Request)
 * 
 * Propósito: Adjunta automáticamente el token de acceso a cada solicitud
 * 
 * Flujo:
 * 1. Recupera el access_token del localStorage
 * 2. Si existe un token, lo añade en el header Authorization con formato "Bearer {token}"
 * 3. Continúa con la solicitud normalmente
 * 
 * Si hay error en la solicitud, rechaza la promesa
 */
axiosInstance.interceptors.request.use(
  (config) => {
    // Obtiene el token almacenado en el navegador
    const token = localStorage.getItem('access_token');
    
    // Adjunta el token al header de autorización si existe
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    // Rechaza cualquier error en la configuración de la solicitud
    return Promise.reject(error);
  }
);

/**
 * Interceptor de respuestas (Response)
 * 
 * Propósito: Maneja errores de autenticación y renueva tokens automáticamente
 * 
 * Flujo de error 401 (No autorizado / Token expirado):
 * 1. Verifica que sea error 401 con código 'token_expired'
 * 2. Marca la solicitud para evitar bucles infinitos (_retry)
 * 3. Intenta renovar el token usando el refresh_token
 * 4. Si la renovación es exitosa: actualiza el token y reintenta la solicitud original
 * 5. Si la renovación falla: limpia tokens y redirige al login
 * 
 * Otros errores: Se rechazan normalmente sin procesar
 */
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Guarda la configuración de la solicitud original para reintentarla si es necesario
    const originalRequest = error.config;
    
    /**
     * Detecta si es un error de token expirado:
     * - error.response?.status === 401: Respuesta de no autorizado
     * - error.response?.data?.code === 'token_expired': Código de error específico del servidor
     * - !originalRequest._retry: Verifica que sea el primer intento (evita bucles infinitos)
     */
    if (error.response?.status === 401 && 
        error.response?.data?.code === 'token_expired' &&
        !originalRequest._retry) {
      
      // Marca esta solicitud como reintentada para evitar bucles
      originalRequest._retry = true;
      
      try {
        // Recupera el refresh token para renovar el access token
        const refreshToken = localStorage.getItem('refresh_token');
        
        // Solicita un nuevo access token al servidor
        const response = await axiosInstance.post('/refresh', {}, {
          headers: {
            'Authorization': `Bearer ${refreshToken}`
          }
        });
        
        // Extrae el nuevo token de la respuesta y lo almacena
        const newToken = response.data.data.token;
        localStorage.setItem('access_token', newToken);
        
        // Actualiza el header de la solicitud original con el nuevo token
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        
        // Reintenta la solicitud original con el token actualizado
        return axiosInstance(originalRequest);
        
      } catch (refreshError) {
        /**
         * Si la renovación del token falla:
         * - El refresh token probablemente está inválido o expirado
         * - Limpia ambos tokens del almacenamiento local
         * - Redirige al usuario a la página de login
         */
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.location.href = '/login';
        
        return Promise.reject(refreshError);
      }
    }
    
    // Rechaza otros tipos de errores sin procesamiento adicional
    return Promise.reject(error);
  }
);

export default axiosInstance;