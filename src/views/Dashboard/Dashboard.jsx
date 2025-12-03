import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../../contexts/DataContext';
import { authService } from '../../api/authService';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { formatNumber } from '../../utils/helpers';

const Dashboard = () => {
  const navigate = useNavigate();
  const { dashboardData, loading, lastUpdated, refreshData } = useData();
  const [apiHealth, setApiHealth] = useState(null);

  useEffect(() => {
    checkApiHealth();
  }, []);

  const checkApiHealth = async () => {
    try {
      const health = await authService.checkHealth();
      setApiHealth(health);
    } catch (error) {
      setApiHealth({ status: 'unreachable', message: 'API no disponible' });
    }
  };

  // Acciones rápidas
  const handleQuickAction = (action) => {
    switch (action) {
      case 'new-user':
        navigate('/users/new');
        break;
      case 'view-reports':
        navigate('/statistics');
        break;
      case 'settings':
        alert('Configuración en desarrollo');
        break;
      case 'edit-profile':
        navigate('/profile');
        break;
      default:
        break;
    }
  };

  if (loading && !dashboardData) {
    // Estado de carga inicial
    return (
    <div className="space-y-6 animate-pulse">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gray-200 dark:bg-gray-700 h-24 rounded-lg"></div>
        <div className="bg-gray-200 dark:bg-gray-700 h-24 rounded-lg"></div>
        <div className="bg-gray-200 dark:bg-gray-700 h-24 rounded-lg"></div>
        <div className="bg-gray-200 dark:bg-gray-700 h-24 rounded-lg"></div>
      </div>
      <div className="bg-gray-200 dark:bg-gray-700 h-96 rounded-lg"></div>
    </div>
  );
}

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Resumen general del sistema
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          {apiHealth && (
            <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
              apiHealth.status === 'healthy' 
                ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
            }`}>
              <span className={`w-2 h-2 rounded-full mr-2 ${
                apiHealth.status === 'healthy' ? 'bg-green-500' : 'bg-red-500'
              }`}></span>
              API {apiHealth.status === 'healthy' ? 'Online' : 'Offline'}
            </div>
          )}
          <div className="text-xs text-gray-500">
            {lastUpdated && `Actualizado: ${lastUpdated.toLocaleTimeString()}`}
          </div>
          <Button onClick={refreshData} variant="outline">
            Actualizar
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card
          title="Total de Usuarios"
          subtitle="Usuarios registrados"
          className="border-l-4 border-primary-500"
          hover
        >
          <div className="text-3xl font-bold text-gray-900 dark:text-white">
            {formatNumber(dashboardData?.summary?.data?.total_users || 0)}
          </div>
          <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            {dashboardData?.summary?.data?.new_users_today || 0} nuevos hoy
          </div>
        </Card>

        <Card
          title="Usuarios Activos"
          subtitle="Últimos 30 días"
          className="border-l-4 border-green-500"
          hover
        >
          <div className="text-3xl font-bold text-gray-900 dark:text-white">
            {formatNumber(dashboardData?.summary?.data?.active_users || 0)}
          </div>
          <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            {dashboardData?.summary?.data?.active_percentage || 0}% del total
          </div>
        </Card>

        <Card
          title="Crecimiento Mensual"
          subtitle="Este mes"
          className="border-l-4 border-blue-500"
          hover
        >
          <div className="text-3xl font-bold text-gray-900 dark:text-white">
            {dashboardData?.summary?.data?.monthly_growth || 0}%
          </div>
          <div className={`mt-2 text-sm ${
            (dashboardData?.summary?.data?.monthly_growth || 0) >= 0 ? 'text-green-600' : 'text-red-600'
          }`}>
            {(dashboardData?.summary?.data?.monthly_growth || 0) >= 0 ? '↗' : '↘'} desde el mes anterior
          </div>
        </Card>

        <Card
          title="Registros Hoy"
          subtitle="Nuevos usuarios"
          className="border-l-4 border-purple-500"
          hover
        >
          <div className="text-3xl font-bold text-gray-900 dark:text-white">
            {formatNumber(dashboardData?.summary?.data?.today_registrations || 0)}
          </div>
          <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            {dashboardData?.summary?.data?.yesterday_registrations || 0} ayer
          </div>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card 
          title="Actividad Diaria" 
          subtitle="Últimos 7 días"
          headerAction={
            <Button variant="ghost" size="sm" onClick={() => navigate('/statistics')}>
              Ver más
            </Button>
          }
        >
          {dashboardData?.daily?.data?.length > 0 ? (
            <div className="h-64">
              <div className="h-full flex items-center justify-center text-gray-400 dark:text-gray-500">
                Gráfico de actividad diaria
                <div className="ml-4 text-sm">
                  <p>Registros: {dashboardData.daily.data.reduce((acc, day) => acc + (day.registrations || 0), 0)}</p>
                  <p>Promedio: {Math.round(dashboardData.daily.data.reduce((acc, day) => acc + (day.registrations || 0), 0) / 7)} por día</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-64 flex items-center justify-center text-gray-400 dark:text-gray-500">
              No hay datos de actividad disponibles
            </div>
          )}
        </Card>

        <Card 
          title="Crecimiento Mensual" 
          subtitle="Últimos 6 meses"
          headerAction={
            <Button variant="ghost" size="sm" onClick={() => navigate('/statistics')}>
              Ver más
            </Button>
          }
        >
          {dashboardData?.monthly?.data?.length > 0 ? (
            <div className="h-64">
              <div className="h-full flex items-center justify-center text-gray-400 dark:text-gray-500">
                Gráfico de crecimiento mensual
                <div className="ml-4 text-sm">
                  <p>Total: {dashboardData.monthly.data.reduce((acc, month) => acc + (month.registrations || 0), 0)}</p>
                  <p>Crecimiento: {dashboardData.monthly.data[dashboardData.monthly.data.length - 1]?.growth || 0}%</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-64 flex items-center justify-center text-gray-400 dark:text-gray-500">
              No hay datos de crecimiento disponibles
            </div>
          )}
        </Card>
      </div>

      {/* Quick Actions */}
      <Card title="Acciones Rápidas">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Button 
            variant="outline" 
            fullWidth 
            className="justify-start"
            onClick={() => handleQuickAction('new-user')}
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Nuevo Usuario
          </Button>
          <Button 
            variant="outline" 
            fullWidth 
            className="justify-start"
            onClick={() => handleQuickAction('view-reports')}
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Ver Reportes
          </Button>
          <Button 
            variant="outline" 
            fullWidth 
            className="justify-start"
            onClick={() => handleQuickAction('settings')}
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Configuración
          </Button>
          <Button 
            variant="outline" 
            fullWidth 
            className="justify-start"
            onClick={() => handleQuickAction('edit-profile')}
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Editar Perfil
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;