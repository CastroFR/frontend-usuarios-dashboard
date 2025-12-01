import React, { createContext, useState, useContext, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';

// Tipos de notificación disponibles
export const NOTIFICATION_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
};

// Duración predeterminada en milisegundos
const DEFAULT_DURATION = 5000; // 5 segundos

// Estructura de una notificación
/**
 * @typedef {Object} Notification
 * @property {string} id - ID único de la notificación
 * @property {string} type - Tipo (success, error, warning, info)
 * @property {string} title - Título de la notificación
 * @property {string} message - Mensaje de la notificación
 * @property {number} duration - Duración en milisegundos (0 = permanente)
 * @property {Function} onClose - Callback cuando se cierra
 * @property {Object} metadata - Metadatos adicionales
 */

const NotificationContext = createContext();

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within NotificationProvider');
  }
  return context;
};

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  /**
   * Agregar una nueva notificación
   * @param {Object} notification - Configuración de la notificación
   * @returns {string} ID de la notificación
   */
  const addNotification = useCallback((notification) => {
    const id = Date.now().toString() + Math.random().toString(36).substr(2, 9);
    
    const newNotification = {
      id,
      type: NOTIFICATION_TYPES.INFO,
      title: '',
      message: '',
      duration: DEFAULT_DURATION,
      onClose: null,
      metadata: {},
      ...notification,
    };

    setNotifications((prev) => [...prev, newNotification]);

    // Auto eliminar si tiene duración > 0
    if (newNotification.duration > 0) {
      setTimeout(() => {
        removeNotification(id);
        if (newNotification.onClose) {
          newNotification.onClose();
        }
      }, newNotification.duration);
    }

    return id;
  }, []);

  /**
   * Eliminar una notificación por ID
   * @param {string} id - ID de la notificación
   */
  const removeNotification = useCallback((id) => {
    setNotifications((prev) => {
      const notificationToRemove = prev.find(n => n.id === id);
      
      // Ejecutar callback onClose si existe
      if (notificationToRemove?.onClose) {
        notificationToRemove.onClose();
      }
      
      return prev.filter(n => n.id !== id);
    });
  }, []);

  /**
   * Limpiar todas las notificaciones
   */
  const clearNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  /**
   * Helper para notificación de éxito
   * @param {string} message - Mensaje
   * @param {string} title - Título (opcional)
   */
  const success = useCallback((message, title = 'Éxito') => {
    return addNotification({
      type: NOTIFICATION_TYPES.SUCCESS,
      title,
      message,
    });
  }, [addNotification]);

  /**
   * Helper para notificación de error
   * @param {string} message - Mensaje
   * @param {string} title - Título (opcional)
   */
  const error = useCallback((message, title = 'Error') => {
    return addNotification({
      type: NOTIFICATION_TYPES.ERROR,
      title,
      message,
      duration: 7000, // Los errores duran un poco más
    });
  }, [addNotification]);

  /**
   * Helper para notificación de advertencia
   * @param {string} message - Mensaje
   * @param {string} title - Título (opcional)
   */
  const warning = useCallback((message, title = 'Advertencia') => {
    return addNotification({
      type: NOTIFICATION_TYPES.WARNING,
      title,
      message,
    });
  }, [addNotification]);

  /**
   * Helper para notificación de información
   * @param {string} message - Mensaje
   * @param {string} title - Título (opcional)
   */
  const info = useCallback((message, title = 'Información') => {
    return addNotification({
      type: NOTIFICATION_TYPES.INFO,
      title,
      message,
    });
  }, [addNotification]);

  /**
   * Agregar notificación desde error de API
   * @param {Error} error - Error de API
   * @param {string} defaultMessage - Mensaje por defecto
   */
  const addApiError = useCallback((error, defaultMessage = 'Error en la operación') => {
    const message = error.response?.data?.message || error.message || defaultMessage;
    return this.error(message, 'Error del Sistema');
  }, [error]);

  const value = useMemo(() => ({
    notifications,
    addNotification,
    removeNotification,
    clearNotifications,
    success,
    error,
    warning,
    info,
    addApiError,
    NOTIFICATION_TYPES,
  }), [
    notifications,
    addNotification,
    removeNotification,
    clearNotifications,
    success,
    error,
    warning,
    info,
    addApiError,
  ]);

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

NotificationProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Componente de notificación (para usar en App.jsx)
export const NotificationContainer = () => {
  const { notifications, removeNotification } = useNotification();

  if (notifications.length === 0) {
    return null;
  }

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-3 w-full max-w-md">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`
            relative p-4 rounded-lg shadow-lg border transform transition-all duration-300
            ${notification.type === 'success' ? 'bg-green-50 border-green-200 text-green-800' : ''}
            ${notification.type === 'error' ? 'bg-red-50 border-red-200 text-red-800' : ''}
            ${notification.type === 'warning' ? 'bg-yellow-50 border-yellow-200 text-yellow-800' : ''}
            ${notification.type === 'info' ? 'bg-blue-50 border-blue-200 text-blue-800' : ''}
            dark:bg-opacity-20 dark:border-opacity-20
            animate-slide-up
          `}
        >
          <div className="flex items-start">
            <div className="flex-shrink-0">
              {notification.type === 'success' && (
                <svg className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
              {notification.type === 'error' && (
                <svg className="h-6 w-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
              {notification.type === 'warning' && (
                <svg className="h-6 w-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              )}
              {notification.type === 'info' && (
                <svg className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
            </div>
            <div className="ml-3 flex-1">
              {notification.title && (
                <h3 className="text-sm font-medium">
                  {notification.title}
                </h3>
              )}
              <div className="mt-1 text-sm">
                {notification.message}
              </div>
            </div>
            <button
              onClick={() => removeNotification(notification.id)}
              className="ml-4 flex-shrink-0 text-gray-400 hover:text-gray-500 focus:outline-none"
            >
              <span className="sr-only">Cerrar</span>
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};