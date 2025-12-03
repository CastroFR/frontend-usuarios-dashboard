import React, { useState, useEffect } from 'react';
import { statisticsService } from '../../api/statisticsService';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { LineChart, BarChart, PieChart } from '../../components/common/Chart';
import DailyStats from './DailyStats';
import WeeklyStats from './WeeklyStats';
import MonthlyStats from './MonthlyStats';
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

      setSummary(summaryData.data || summaryData);
      setDailyStats(daily.data?.statistics || daily.statistics || []);
      setWeeklyStats(weekly.data?.statistics || weekly.statistics || []);
      setMonthlyStats(monthly.data?.statistics || monthly.statistics || []);
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
                {formatNumber(summary?.total || 0)}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Usuarios totales
              </div>
            </div>
            <div>
              <div className="text-lg font-semibold text-gray-900 dark:text-white">
                {formatNumber(summary?.active || 0)}
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
                {formatNumber(summary?.today || 0)}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Registros hoy
              </div>
            </div>
            <div>
              <div className="text-lg font-semibold text-gray-900 dark:text-white">
                {formatNumber(summary?.this_week || 0)}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Registros esta semana
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
                {summary?.this_month || 0}
              </div>
              <div className="text-sm text-green-600">
                ↗ Usuarios este mes
              </div>
            </div>
            <div>
              <div className="text-lg font-semibold text-gray-900 dark:text-white">
                {summary?.deleted || 0}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Eliminados
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Datos Detallados */}
      <div className="grid grid-cols-1 gap-6">
        <DailyStats dailyStats={dailyStats} />
        <WeeklyStats weeklyStats={weeklyStats} />
        <MonthlyStats monthlyStats={monthlyStats} />
      </div>

      {/* Gráficos de Análisis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Distribución de Usuarios" subtitle="Activos vs Eliminados">
          {summary && (
            <div className="h-80">
              <PieChart
                labels={['Activos', 'Eliminados']}
                datasets={[
                  {
                    data: [summary.active || 0, summary.deleted || 0],
                  },
                ]}
                title="Distribución de Estados"
              />
            </div>
          )}
        </Card>

        <Card title="Tendencia de Registros" subtitle="Últimos 12 meses">
          {monthlyStats.length > 0 && (
            <div className="h-80">
              <LineChart
                labels={monthlyStats
                  .slice(0, 12)
                  .reverse()
                  .map(stat => stat.month_name ? stat.month_name.substring(0, 3) : `M${stat.month}`)}
                datasets={[
                  {
                    label: 'Registros',
                    data: monthlyStats.slice(0, 12).reverse().map(stat => stat.total || 0),
                    borderColor: '#F59E0B',
                    backgroundColor: 'rgba(245, 158, 11, 0.1)',
                  },
                ]}
                title="Tendencia Anual"
              />
            </div>
          )}
        </Card>
      </div>

      {/* Comparativa de períodos */}
      <Card title="Resumen Comparativo" subtitle="Diario vs Semanal vs Mensual">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Comparativa Diaria */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900 dark:text-white">Período Diario</h3>
            {dailyStats.length > 0 ? (
              <div>
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                  {formatNumber(
                    dailyStats.slice(0, 7).reduce((acc, stat) => acc + (stat.total || 0), 0)
                  )}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  Últimos 7 días
                </div>
              </div>
            ) : (
              <div className="text-gray-400">Sin datos</div>
            )}
          </div>

          {/* Comparativa Semanal */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900 dark:text-white">Período Semanal</h3>
            {weeklyStats.length > 0 ? (
              <div>
                <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                  {formatNumber(
                    weeklyStats.slice(0, 4).reduce((acc, stat) => acc + (stat.total || 0), 0)
                  )}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  Últimas 4 semanas
                </div>
              </div>
            ) : (
              <div className="text-gray-400">Sin datos</div>
            )}
          </div>

          {/* Comparativa Mensual */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900 dark:text-white">Período Mensual</h3>
            {monthlyStats.length > 0 ? (
              <div>
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                  {formatNumber(
                    monthlyStats.slice(0, 12).reduce((acc, stat) => acc + (stat.total || 0), 0)
                  )}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  Últimos 12 meses
                </div>
              </div>
            ) : (
              <div className="text-gray-400">Sin datos</div>
            )}
          </div>
        </div>
      </Card>

      {/* Métricas Adicionales */}
      <Card title="Métricas del Sistema">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">
              {summary?.total || 0}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Total usuarios
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400">
              {summary?.active || 0}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Usuarios activos
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
              {summary?.this_month || 0}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Este mes
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
              {summary?.deleted || 0}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Eliminados
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Statistics;