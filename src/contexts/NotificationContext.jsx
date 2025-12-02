import React, { createContext, useState, useContext, useCallback } from 'react';

const NotificationContext = createContext({});

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification debe ser usado dentro de NotificationProvider');
  }
  return context;
};

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'info',
      title: 'Bienvenido al sistema',
      message: 'Has iniciado sesión correctamente',
      time: new Date(),
      read: false,
    },
    {
      id: 2,
      type: 'success',
      title: 'Sistema actualizado',
      message: 'El sistema ha sido actualizado a la versión 1.2.0',
      time: new Date(Date.now() - 3600000),
      read: false,
    },
  ]);

  const addNotification = useCallback((notification) => {
    const newNotification = {
      id: Date.now(),
      type: notification.type || 'info',
      title: notification.title,
      message: notification.message,
      time: new Date(),
      read: false,
    };
    
    setNotifications(prev => [newNotification, ...prev]);
  }, []);

  const markAsRead = useCallback((id) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
  }, []);

  const deleteNotification = useCallback((id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  }, []);

  const clearAllNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  const value = {
    notifications,
    unreadCount,
    addNotification,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAllNotifications,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};