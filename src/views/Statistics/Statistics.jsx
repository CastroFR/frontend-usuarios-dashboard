import React, { useState, useEffect } from 'react';
import { statisticsService } from '../../api/statisticsService';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { formatNumber, formatDate } from '../../utils/helpers';

const Statistics = () => {
  const [summary, setSummary] = useState(null);
  const [dailyStats, setDailyStats] = useState([]);
  const [weeklyStats, setWeeklyStats] = useState([]);
  const [monthlyStats, setMonthlyStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [dateRange, setDateRange] = useState({
    start: new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString().split('T')[0],
    end: new Date().toISOString().split('T')[0],
  });

  useEffect(() => {
    loadStatistics();
  }, []);

  const loadStatistics = async () => {
    try {
      setLoading(true);
      
      // Cargar todas las estadísticas
      const [summaryData, daily, weekly, monthly] = await Promise.all([
        statisticsService.getSummaryStats(),
        statisticsService.getDailyStats(),
        statisticsService.getWeeklyStats(),
        statisticsService.getMonthlyStats(),
      ]);

      setSummary(summaryData);
      setDailyStats(daily.data || daily);
      setWeeklyStats(weekly.data || weekly);
      setMonthlyStats(monthly.data || monthly);
    } catch (err) {
      setError('Error al cargar las estadísticas');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setDateRange(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Estadísticas</h1>
          <Button onClick={loadStatistics} loading={loading}>
            Actualizar
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <Card key={i}>
              <div className="animate-pulse space-y-3">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Estadísticas</h1>
          <Button onClick={loadStatistics}>Reintentar</Button>
        </div>
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <p className="text-red-600 dark:text-red-400">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Estadísticas</h1>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Análisis y métricas del sistema
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex space-x-2">
            <div className="w-32">
              <Input
                type="date"
                name="start"
                label="Desde"
                value={dateRange.start}
                onChange={handleDateChange}
                size="sm"
              />
            </div>
            <div className="w-32">
              <Input
                type="date"
                name="end"
                label="Hasta"
                value={dateRange.end}
                onChange={handleDateChange}
                size="sm"
              />
            </div>
          </div>
          <Button onClick={loadStatistics} variant="outline">
            Actualizar
          </Button>
        </div>
      </div>

      {/* Resumen Estadístico */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card
          title="Resumen General"
          subtitle="Totales del sistema"
          className="border-l-4 border-primary-500"
          hover
        >
          <div className="space-y-4">
            <div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {formatNumber(summary?.total_users || 0)}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Usuarios totales
              </div>
            </div>
            <div>
              <div className="text-lg font-semibold text-gray-900 dark:text-white">
                {formatNumber(summary?.active_users || 0)}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Usuarios activos
              </div>
            </div>
          </div>
        </Card>

        <Card
          title="Crecimiento Diario"
          subtitle="Nuevos registros hoy"
          className="border-l-4 border-green-500"
          hover
        >
          <div className="space-y-4">
            <div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {formatNumber(summary?.new_users_today || 0)}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Registros hoy
              </div>
            </div>
            <div>
              <div className="text-lg font-semibold text-gray-900 dark:text-white">
                {formatNumber(summary?.yesterday_registrations || 0)}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Registros ayer
              </div>
            </div>
          </div>
        </Card>

        <Card
          title="Tendencias"
          subtitle="Último mes"
          className="border-l-4 border-blue-500"
          hover
        >
          <div className="space-y-4">
            <div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {summary?.monthly_growth || 0}%
              </div>
              <div className={`text-sm ${
                (summary?.monthly_growth || 0) >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {(summary?.monthly_growth || 0) >= 0 ? '↗ Crecimiento' : '↘ Decrecimiento'}
              </div>
            </div>
            <div>
              <div className="text-lg font-semibold text-gray-900 dark:text-white">
                {summary?.active_percentage || 0}%
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Tasa de actividad
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Datos Detallados */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card 
          title="Estadísticas Diarias" 
          subtitle="Últimos 7 días"
          headerAction={
            <Button variant="ghost" size="sm">
              Exportar
            </Button>
          }
        >
          {dailyStats.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead>
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                      Fecha
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                      Registros
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                      Activos
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {dailyStats.slice(0, 7).map((stat, index) => (
                    <tr key={index}>
                      <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                        {stat.date ? formatDate(stat.date) : 'N/A'}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                        {formatNumber(stat.registrations || 0)}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                        {formatNumber(stat.active_users || 0)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-400 dark:text-gray-500">
              No hay datos diarios disponibles
            </div>
          )}
        </Card>

        <Card 
          title="Estadísticas Mensuales" 
          subtitle="Últimos 6 meses"
          headerAction={
            <Button variant="ghost" size="sm">
              Exportar
            </Button>
          }
        >
          {monthlyStats.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead>
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                      Mes
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                      Registros
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                      Crecimiento
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {monthlyStats.slice(0, 6).map((stat, index) => (
                    <tr key={index}>
                      <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                        {stat.month || 'N/A'}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                        {formatNumber(stat.registrations || 0)}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          (stat.growth || 0) >= 0 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                            : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                        }`}>
                          {(stat.growth || 0) >= 0 ? '+' : ''}{stat.growth || 0}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-400 dark:text-gray-500">
              No hay datos mensuales disponibles
            </div>
          )}
        </Card>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Distribución de Usuarios" subtitle="Por estado">
          <div className="h-64 flex items-center justify-center text-gray-400 dark:text-gray-500">
            Gráfico de distribución
            {/* Aquí iría Chart.js o similar */}
          </div>
        </Card>

        <Card title="Tendencia de Registros" subtitle="Último año">
          <div className="h-64 flex items-center justify-center text-gray-400 dark:text-gray-500">
            Gráfico de tendencia
            {/* Aquí iría Chart.js o similar */}
          </div>
        </Card>
      </div>

      {/* Métricas Adicionales */}
      <Card title="Métricas del Sistema">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">
              {summary?.avg_daily_registrations || 0}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Promedio diario
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400">
              {summary?.peak_day_registrations || 0}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Día pico
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
              {summary?.retention_rate || 0}%
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Tasa de retención
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
              {summary?.avg_session_duration || '0m'}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Duración sesión
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Statistics;