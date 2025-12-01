// Exportar todos los hooks personalizados
export { useAuth } from './useAuth';
export { useUsers } from './useUsers';
export { useStatistics } from './useStatistics';
export { useLocalStorage } from './useLocalStorage';
export { useForm } from './useForm';

// Exportación por defecto para importación conveniente
export default {
  useAuth,
  useUsers,
  useStatistics,
  useLocalStorage,
  useForm,
};