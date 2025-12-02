export const formatDate = (dateString, options = {}) => {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  
  const defaultOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };
  
  return date.toLocaleDateString('es-ES', { ...defaultOptions, ...options });
};

export const formatDateTime = (dateString) => {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const formatNumber = (number) => {
  if (number === undefined || number === null) return '0';
  return new Intl.NumberFormat('es-ES').format(number);
};

export const formatCurrency = (amount, currency = 'USD') => {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: currency,
  }).format(amount);
};

export const capitalize = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const truncate = (str, length = 50, suffix = '...') => {
  if (!str) return '';
  return str.length > length ? str.substring(0, length) + suffix : str;
};

export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export const parseError = (error) => {
  if (typeof error === 'string') return error;
  if (error?.message) return error.message;
  if (error?.response?.data?.message) return error.response.data.message;
  if (error?.response?.data?.errors) {
    return Object.values(error.response.data.errors).flat().join(', ');
  }
  return 'Error desconocido';
};

export const getInitials = (name) => {
  if (!name) return '?';
  return name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .substring(0, 2);
};

export const generateId = () => {
  return Math.random().toString(36).substr(2, 9);
};

export const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

export const isObjectEmpty = (obj) => {
  return Object.keys(obj).length === 0;
};

export const classNames = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

// Formatear fecha relativa (hace X tiempo)
export const formatTimeAgo = (date) => {
  const now = new Date();
  const diff = now - new Date(date);
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) {
    return 'hace un momento';
  } else if (minutes < 60) {
    return `hace ${minutes} minuto${minutes > 1 ? 's' : ''}`;
  } else if (hours < 24) {
    return `hace ${hours} hora${hours > 1 ? 's' : ''}`;
  } else if (days < 7) {
    return `hace ${days} día${days > 1 ? 's' : ''}`;
  } else {
    return new Date(date).toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
    });
  }
};