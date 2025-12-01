// Exportar todos los contextos y sus hooks
export { AuthProvider, useAuth } from './AuthContext';
export { ThemeProvider, useTheme } from './ThemeContext';
export { NotificationProvider, useNotification, NotificationContainer } from './NotificationContext';

// Exportación por defecto para importación conveniente
export default {
  AuthProvider,
  useAuth,
  ThemeProvider,
  useTheme,
  NotificationProvider,
  useNotification,
  NotificationContainer,
};