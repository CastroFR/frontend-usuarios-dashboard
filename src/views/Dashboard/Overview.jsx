import React from 'react';
import { Link } from 'react-router-dom';
import { 
  UsersIcon,
  UserAddIcon,
  ChartBarIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  CalendarIcon 
} from '@heroicons/react/outline';
import Card from '../../components/common/Card/Card';
import Button from '../../components/common/Button/Button';

const Overview = () => {
  const stats = [
    {
      name: 'Total Usuarios',
      value: '1,234',
      change: '+12.5%',
      trend: 'up',
      icon: UsersIcon,
      color: 'blue',
      link: '/users',
    },
    {
      name: 'Nuevos Hoy',
      value: '45',
      change: '+5.2%',
      trend: 'up',
      icon: UserAddIcon,
      color: 'green',
      link: '/users?filter=new',
    },
    {
      name: 'Activos Hoy',
      value: '892',
      change: '+3.1%',
      trend: 'up',
      icon: ChartBarIcon,
      color: 'purple',
      link: '/statistics',
    },
    {
      name: 'Tasa de Retención',
      value: '94.2%',
      change: '-0.5%',
      trend: 'down',
      icon: CalendarIcon,
      color: 'yellow',
      link: '/statistics/retention',
    },
  ];

  const recentUsers = [
    { id: 1, name: 'Juan Pérez', email: 'juan@example.com', role: 'Admin', status: 'active', joinDate: '2024-01-15' },
    { id: 2, name: 'María García', email: 'maria@example.com', role: 'Usuario', status: 'active', joinDate: '2024-01-14' },
    { id: 3, name: 'Carlos López', email: 'carlos@example.com', role: 'Editor', status: 'inactive', joinDate: '2024-01-13' },
    { id: 4, name: 'Ana Martínez', email: 'ana@example.com', role: 'Usuario', status: 'active', joinDate: '2024-01-12' },
    { id: 5, name: 'Pedro Sánchez', email: 'pedro@example.com', role: 'Usuario', status: 'pending', joinDate: '2024-01-11' },
  ];

  const quickActions = [
    { name: 'Agregar Usuario', description: 'Crear nuevo usuario', icon: UserAddIcon, link: '/users/create', color: 'primary' },
    { name: 'Ver Reportes', description: 'Generar reportes', icon: ChartBarIcon, link: '/reports', color: 'green' },
    { name: 'Configurar Sistema', description: 'Ajustes del sistema', icon: CalendarIcon, link: '/settings', color: 'purple' },
  ];

  return (
    <div className="space-y-6">
      {/* Encabezado */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Panel de Control
          </h1>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Bienvenido de vuelta. Aquí tienes un resumen de tu sistema.
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Button variant="primary">
            <UserAddIcon className="h-5 w-5 mr-2" />
            Nuevo Usuario
          </Button>
        </div>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {stat.name}
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                  {stat.value}
                </p>
                <div className="flex items-center mt-1">
                  {stat.trend === 'up' ? (
                    <ArrowUpIcon className="h-4 w-4 text-green-500 mr-1" />
                  ) : (
                    <ArrowDownIcon className="h-4 w-4 text-red-500 mr-1" />
                  )}
                  <span className={`text-sm ${
                    stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                    desde ayer
                  </span>
                </div>
              </div>
              <div className={`p-3 rounded-full bg-${stat.color}-100 dark:bg-${stat.color}-900/20`}>
                <stat.icon className={`h-6 w-6 text-${stat.color}-600 dark:text-${stat.color}-400`} />
              </div>
            </div>
            <div className="mt-4">
              <Link
                to={stat.link}
                className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400"
              >
                Ver detalles →
              </Link>
            </div>
          </Card>
        ))}
      </div>

      {/* Acciones rápidas y usuarios recientes */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Acciones rápidas */}
        <div className="lg:col-span-1">
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Acciones Rápidas
            </h3>
            <div className="space-y-3">
              {quickActions.map((action, index) => (
                <Link
                  key={index}
                  to={action.link}
                  className="flex items-center p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group"
                >
                  <div className={`p-2 rounded-lg bg-${action.color}-100 dark:bg-${action.color}-900/20 group-hover:bg-${action.color}-200 dark:group-hover:bg-${action.color}-900/30`}>
                    <action.icon className={`h-5 w-5 text-${action.color}-600 dark:text-${action.color}-400`} />
                  </div>
                  <div className="ml-3 flex-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {action.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {action.description}
                    </p>
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          </Card>
        </div>

        {/* Usuarios recientes */}
        <div className="lg:col-span-2">
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Usuarios Recientes
              </h3>
              <Link
                to="/users"
                className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400"
              >
                Ver todos →
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead>
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Usuario
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Rol
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Estado
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Fecha
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {recentUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-8 w-8 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
                            <span className="text-primary-600 dark:text-primary-400 font-medium">
                              {user.name.charAt(0)}
                            </span>
                          </div>
                          <div className="ml-3">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {user.name}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              {user.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300">
                          {user.role}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          user.status === 'active'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                            : user.status === 'inactive'
                            ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                        }`}>
                          {user.status === 'active' ? 'Activo' : user.status === 'inactive' ? 'Inactivo' : 'Pendiente'}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {new Date(user.joinDate).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Overview;