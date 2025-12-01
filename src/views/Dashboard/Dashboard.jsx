import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { 
  UsersIcon, 
  ChartBarIcon, 
  UserAddIcon, 
  CalendarIcon 
} from '@heroicons/react/outline';
import { userService } from '../../api/userService';
import { statisticsService } from '../../api/statisticsService';
import Card from '../../components/common/Card/Card';
import Chart from '../../components/common/Chart/Chart';
import Loader from '../../components/common/Loader/Loader';

const Dashboard = () => {
  const { data: summary, isLoading: summaryLoading } = useQuery({
    queryKey: ['statistics', 'summary'],
    queryFn: () => statisticsService.getSummary(),
  });

  const { data: recentUsers, isLoading: usersLoading } = useQuery({
    queryKey: ['users', 'recent'],
    queryFn: () => userService.paginate(1, 5),
  });

  if (summaryLoading || usersLoading) {
    return <Loader />;
  }

  const statsCards = [
    {
      title: 'Total Usuarios',
      value: summary?.total || 0,
      icon: UsersIcon,
      color: 'primary',
      change: '+12%',
    },
    {
      title: 'Nuevos Hoy',
      value: summary?.today || 0,
      icon: UserAddIcon,
      color: 'green',
      change: '+5%',
    },
    {
      title: 'Esta Semana',
      value: summary?.this_week || 0,
      icon: CalendarIcon,
      color: 'blue',
      change: '+18%',
    },
    {
      title: 'Este Mes',
      value: summary?.this_month || 0,
      icon: ChartBarIcon,
      color: 'purple',
      change: '+24%',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Dashboard de Administración
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Bienvenido al panel de administración de usuarios
          </p>
        </div>
        <div className="flex space-x-3">
          <Link
            to="/users/create"
            className="btn-primary flex items-center space-x-2"
          >
            <UserAddIcon className="h-5 w-5" />
            <span>Nuevo Usuario</span>
          </Link>
        </div>
      </div>

      {/* Cards de Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {stat.title}
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                  {stat.value}
                </p>
                <p className={`text-sm mt-1 ${
                  stat.change.startsWith('+') 
                    ? 'text-green-600' 
                    : 'text-red-600'
                }`}>
                  {stat.change} desde ayer
                </p>
              </div>
              <div className={`p-3 rounded-full bg-${stat.color}-100 dark:bg-${stat.color}-900`}>
                <stat.icon className={`h-6 w-6 text-${stat.color}-600 dark:text-${stat.color}-400`} />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Gráfico y Tabla */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico de usuarios por mes */}
        <Card className="lg:col-span-1">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Registros Mensuales
          </h3>
          <div className="h-64">
            <Chart
              type="bar"
              data={{
                labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
                datasets: [{
                  label: 'Usuarios Registrados',
                  data: [65, 59, 80, 81, 56, 55],
                  backgroundColor: 'rgba(59, 130, 246, 0.5)',
                  borderColor: 'rgb(59, 130, 246)',
                  borderWidth: 1,
                }]
              }}
            />
          </div>
        </Card>

        {/* Usuarios Recientes */}
        <Card className="lg:col-span-1">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Usuarios Recientes
            </h3>
            <Link
              to="/users"
              className="text-primary-600 hover:text-primary-800 text-sm font-medium"
            >
              Ver todos →
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead>
                <tr>
                  <th className="table-header">Nombre</th>
                  <th className="table-header">Email</th>
                  <th className="table-header">Fecha</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {recentUsers?.data?.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                    <td className="table-cell">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center mr-3">
                          <span className="text-primary-600 dark:text-primary-400 font-medium">
                            {user.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white">
                            {user.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="table-cell">{user.email}</td>
                    <td className="table-cell">
                      {new Date(user.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;