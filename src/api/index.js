// Exportar todas las configuraciones y servicios de API
export { default as axiosInstance } from './axiosConfig';
export { authService } from './authService';
export { userService } from './userService';
export { statisticsService } from './statisticsService';

// Re-exportar para importación más fácil
export default {
  axiosInstance,
  authService,
  userService,
  statisticsService,
};