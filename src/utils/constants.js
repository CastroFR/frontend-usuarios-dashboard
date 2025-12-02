export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/login',
    LOGOUT: '/logout',
    REGISTER: '/register',
    REFRESH: '/refresh',
    ME: '/me',
    HEALTH: '/health',
  },
  USERS: {
    BASE: '/users',
    RESTORE: '/users/:id/restore',
    FORCE_DELETE: '/users/:id/force',
  },
  STATISTICS: {
    DAILY: '/statistics/daily',
    WEEKLY: '/statistics/weekly',
    MONTHLY: '/statistics/monthly',
    SUMMARY: '/statistics/summary',
  },
};

export const USER_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  DELETED: 'deleted',
};

export const ROLES = {
  ADMIN: 'admin',
  USER: 'user',
  GUEST: 'guest',
};

export const APP_CONSTANTS = {
  APP_NAME: import.meta.env.VITE_APP_NAME || 'Dashboard de Usuarios',
  APP_VERSION: '1.0.0',
  DATE_FORMAT: 'DD/MM/YYYY',
  DATETIME_FORMAT: 'DD/MM/YYYY HH:mm',
  ITEMS_PER_PAGE: 10,
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_FILE_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'],
};

export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system',
};