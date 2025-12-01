import axiosInstance from './axiosConfig';

/**
 * Servicio de autenticación
 * Gestiona todas las operaciones relacionadas con la autenticación de usuarios:
 * - Login y registro
 * - Almacenamiento y recuperación de tokens
 * - Validación de estado de autenticación
 */
export const authService = {
  /**
   * Login de usuario
   * @param {Object} credentials - Credenciales del usuario
   * @param {string} credentials.email - Email del usuario
   * @param {string} credentials.password - Contraseña del usuario
   * @returns {Promise<{user: Object, token: string}>} Datos del usuario y token de acceso
   * @description Realiza la autenticación del usuario y almacena los tokens en localStorage
   */
  async login(credentials) {
    const response = await axiosInstance.post('/login', credentials);
    const { token, user } = response.data.data;
    
    // Almacena los tokens en localStorage para mantener la sesión persistente
    localStorage.setItem('access_token', token);
    localStorage.setItem('refresh_token', token);
    
    return { user, token };
  },

  /**
   * Registro de nuevo usuario
   * @param {Object} userData - Datos del nuevo usuario
   * @param {string} userData.name - Nombre completo del usuario
   * @param {string} userData.email - Email del usuario
   * @param {string} userData.password - Contraseña del usuario
   * @returns {Promise<{user: Object, token: string}>} Datos del usuario y token de acceso
   * @description Crea un nuevo usuario en el sistema y autentica automáticamente
   */
  async register(userData) {
    const response = await axiosInstance.post('/register', userData);
    const { token, user } = response.data.data;
    
    // Almacena los tokens inmediatamente después del registro exitoso
    localStorage.setItem('access_token', token);
    localStorage.setItem('refresh_token', token);
    
    return { user, token };
  },

  /**
   * Logout de usuario
   * @returns {Promise<void>}
   * @description Cierra la sesión del usuario en el servidor y limpia los tokens del localStorage
   * Los errores en la solicitud al servidor se capturan para no interrumpir el proceso de logout local
   */
  async logout() {
    try {
      // Notifica al servidor para invalidar la sesión
      await axiosInstance.post('/logout');
    } catch (error) {
      // Registra el error pero continúa con la limpieza local
      console.log('Logout error:', error);
    } finally {
      // Siempre elimina los tokens del almacenamiento local
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
    }
  },

  /**
   * Refresca el token de acceso
   * @returns {Promise<string>} Nuevo token de acceso
   * @description Obtiene un nuevo token de acceso usando el refresh token
   * Útil cuando el token actual está a punto de expirar
   */
  async refreshToken() {
    // Obtiene el refresh token almacenado
    const token = localStorage.getItem('refresh_token');
    
    // Envía el refresh token para obtener uno nuevo
    const response = await axiosInstance.post('/refresh', {}, {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    // Extrae y almacena el nuevo token de acceso
    const newToken = response.data.data.token;
    localStorage.setItem('access_token', newToken);
    
    return newToken;
  },

  /**
   * Obtiene los datos del usuario autenticado
   * @returns {Promise<Object>} Datos del usuario actual
   * @description Realiza una solicitud al endpoint /me para obtener la información del usuario autenticado
   */
  async getCurrentUser() {
    const response = await axiosInstance.get('/me');
    return response.data.data;
  },

  /**
   * Verifica si el usuario está autenticado
   * @returns {boolean} true si existe un token de acceso, false en caso contrario
   * @description Comprueba la existencia del token en localStorage
   */
  isAuthenticated() {
    return !!localStorage.getItem('access_token');
  },

  /**
   * Obtiene el token de acceso actual
   * @returns {string|null} Token de acceso o null si no existe
   * @description Recupera el token almacenado en localStorage para usarlo en peticiones autenticadas
   */
  getToken() {
    return localStorage.getItem('access_token');
  }
};