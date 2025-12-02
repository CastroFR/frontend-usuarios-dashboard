import React, { useState, useEffect } from 'react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { useAuth } from '../../contexts/AuthContext';

const Notifications = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'success',
      title: 'Perfil actualizado',
      message: 'Tu perfil se actualizó correctamente',
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
      read: false,
    },
    {
      id: 2,
      type: 'info',
      title: 'Nueva funcionalidad disponible',
      message: 'Ahora puedes gestionar tus notificaciones de forma más eficiente',
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      read: false,
    },
    {
      id: 3,
      type: 'warning',
      title: 'Cambio de contraseña recomendado',
      message: 'Por seguridad, te recomendamos cambiar tu contraseña regularmente',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
      read: true,
    },
  ]);

  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('all');
  const [message, setMessage] = useState({ type: '', text: '' });

  const unreadCount = notifications.filter(n => !n.read).length;

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'unread') return !notification.read;
    if (filter === 'read') return notification.read;
    return true;
  });

  const handleMarkAsRead = async (id) => {
    setLoading(true);
    try {
      setTimeout(() => {
        setNotifications(notifications.map(n => 
          n.id === id ? { ...n, read: true } : n
        ));
        setMessage({
          type: 'success',
          text: 'Notificación marcada como leída',
        });
        setLoading(false);
      }, 500);
    } catch (error) {
      setMessage({
        type: 'error',
        text: 'Error al marcar la notificación',
      });
      setLoading(false);
    }
  };

  const handleMarkAllAsRead = async () => {
    setLoading(true);
    try {
      setTimeout(() => {
        setNotifications(notifications.map(n => ({ ...n, read: true })));
        setMessage({
          type: 'success',
          text: 'Todas las notificaciones marcadas como leídas',
        });
        setLoading(false);
      }, 500);
    } catch (error) {
      setMessage({
        type: 'error',
        text: 'Error al marcar las notificaciones',
      });
      setLoading(false);
    }
  };

  const handleDeleteNotification = async (id) => {
    setLoading(true);
    try {
      setTimeout(() => {
        setNotifications(notifications.filter(n => n.id !== id));
        setMessage({
          type: 'success',
          text: 'Notificación eliminada',
        });
        setLoading(false);
      }, 500);
    } catch (error) {
      setMessage({
        type: 'error',
        text: 'Error al eliminar la notificación',
      });
      setLoading(false);
    }
  };

  const handleClearAll = async () => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar todas las notificaciones?')) {
      return;
    }
    setLoading(true);
    try {
      setTimeout(() => {
        setNotifications([]);
        setMessage({
          type: 'success',
          text: 'Todas las notificaciones han sido eliminadas',
        });
        setLoading(false);
      }, 500);
    } catch (error) {
      setMessage({
        type: 'error',
        text: 'Error al limpiar las notificaciones',
      });
      setLoading(false);
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'success':
        return '✓';
      case 'warning':
        return '!';
      case 'error':
        return '✕';
      case 'info':
      default:
        return 'ℹ';
    }
  };

  const getNotificationStyles = (type) => {
    switch (type) {
      case 'success':
        return 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800';
      case 'warning':
        return 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800';
      case 'error':
        return 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800';
      case 'info':
      default:
        return 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800';
    }
  };

  const getIconStyles = (type) => {
    switch (type) {
      case 'success':
        return 'bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400';
      case 'warning':
        return 'bg-yellow-100 dark:bg-yellow-900/40 text-yellow-600 dark:text-yellow-400';
      case 'error':
        return 'bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400';
      case 'info':
      default:
        return 'bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400';
    }
  };

  const formatTime = (date) => {
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Hace un momento';
    if (minutes < 60) return `Hace ${minutes} min`;
    if (hours < 24) return `Hace ${hours}h`;
    if (days < 7) return `Hace ${days}d`;
    return date.toLocaleDateString();
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Notificaciones</h1>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          Gestiona tus notificaciones y mantente actualizado
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
        <Card className="p-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">
              {notifications.length}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Total de notificaciones
            </p>
          </div>
        </Card>

        <Card className="p-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
              {unreadCount}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Sin leer
            </p>
          </div>
        </Card>

        <Card className="p-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400">
              {notifications.filter(n => n.type === 'success').length}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Exitosas
            </p>
          </div>
        </Card>

        <Card className="p-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">
              {notifications.filter(n => n.type === 'warning').length}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Advertencias
            </p>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        {message.text && (
          <div className={`rounded-lg p-4 mb-6 ${
            message.type === 'success' 
              ? 'bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-400' 
              : 'bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-400'
          }`}>
            {message.text}
          </div>
        )}

        <div className="flex items-center justify-between mb-6">
          <div className="flex gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === 'all'
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              Todas
            </button>
            <button
              onClick={() => setFilter('unread')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === 'unread'
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              Sin leer
            </button>
            <button
              onClick={() => setFilter('read')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === 'read'
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              Leídas
            </button>
          </div>

          <div className="flex gap-2">
            {unreadCount > 0 && (
              <Button
                onClick={handleMarkAllAsRead}
                variant="outline"
                size="sm"
                loading={loading}
              >
                Marcar todo como leído
              </Button>
            )}
            {notifications.length > 0 && (
              <Button
                onClick={handleClearAll}
                variant="danger"
                size="sm"
                loading={loading}
              >
                Limpiar todo
              </Button>
            )}
          </div>
        </div>

        {filteredNotifications.length > 0 ? (
          <div className="space-y-4">
            {filteredNotifications.map(notification => (
              <div
                key={notification.id}
                className={`border-l-4 rounded-lg p-4 transition-all ${getNotificationStyles(notification.type)} ${
                  !notification.read ? 'border-l-primary-500' : 'border-l-gray-300 dark:border-l-gray-600'
                }`}
              >
                <div className="flex gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0 ${getIconStyles(notification.type)}`}>
                    {getNotificationIcon(notification.type)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h4 className={`font-medium ${
                          notification.type === 'success'
                            ? 'text-green-900 dark:text-green-300'
                            : notification.type === 'warning'
                            ? 'text-yellow-900 dark:text-yellow-300'
                            : notification.type === 'error'
                            ? 'text-red-900 dark:text-red-300'
                            : 'text-blue-900 dark:text-blue-300'
                        }`}>
                          {notification.title}
                          {!notification.read && (
                            <span className="ml-2 inline-block w-2 h-2 bg-primary-500 rounded-full"></span>
                          )}
                        </h4>
                        <p className={`text-sm mt-1 ${
                          notification.type === 'success'
                            ? 'text-green-800 dark:text-green-400'
                            : notification.type === 'warning'
                            ? 'text-yellow-800 dark:text-yellow-400'
                            : notification.type === 'error'
                            ? 'text-red-800 dark:text-red-400'
                            : 'text-blue-800 dark:text-blue-400'
                        }`}>
                          {notification.message}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                          {formatTime(notification.timestamp)}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2 mt-4">
                      {!notification.read && (
                        <button
                          onClick={() => handleMarkAsRead(notification.id)}
                          className="text-xs font-medium text-primary-600 dark:text-primary-400 hover:underline"
                          disabled={loading}
                        >
                          Marcar como leído
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteNotification(notification.id)}
                        className="text-xs font-medium text-red-600 dark:text-red-400 hover:underline"
                        disabled={loading}
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-5xl mb-4">📭</div>
            <p className="text-gray-600 dark:text-gray-400">
              {notifications.length === 0
                ? 'No tienes notificaciones'
                : 'No hay notificaciones en esta categoría'}
            </p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Notifications;
