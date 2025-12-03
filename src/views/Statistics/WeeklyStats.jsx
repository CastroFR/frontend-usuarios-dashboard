import React from 'react';
import { BarChart } from '../../components/common/Chart';
import Card from '../../components/common/Card';
import { formatNumber, formatDate } from '../../utils/helpers';

const WeeklyStats = ({ weeklyStats = [] }) => {
  if (!weeklyStats || weeklyStats.length === 0) {
    return (
      <Card title="Estadísticas Semanales" subtitle="Últimas 12 semanas">
        <div className="text-center py-8 text-gray-400 dark:text-gray-500">
          No hay datos semanales disponibles
        </div>
      </Card>
    );
  }

  // Preparar datos para el gráfico de barras
  const chartLabels = weeklyStats.map(stat => 
    stat.period || `Semana ${stat.week}`
  ).reverse();
  
  const chartData = {
    label: 'Registros por Semana',
    data: weeklyStats.map(stat => stat.total || 0).reverse(),
  };

  const totalRegistros = weeklyStats.reduce((acc, stat) => acc + (stat.total || 0), 0);
  const promedioRegistros = Math.round(totalRegistros / (weeklyStats.length || 1));
  const maxRegistros = Math.max(...weeklyStats.map(stat => stat.total || 0));

  return (
    <Card 
      title="Estadísticas Semanales" 
      subtitle="Últimas 12 semanas"
    >
      <div className="space-y-6">
        {/* Métricas principales */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg p-4">
            <div className="text-sm text-gray-600 dark:text-gray-400">Total</div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {formatNumber(totalRegistros)}
            </div>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg p-4">
            <div className="text-sm text-gray-600 dark:text-gray-400">Promedio</div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {formatNumber(promedioRegistros)}
            </div>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-lg p-4">
            <div className="text-sm text-gray-600 dark:text-gray-400">Máximo</div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {formatNumber(maxRegistros)}
            </div>
          </div>
        </div>

        {/* Gráfico de barras */}
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 h-80">
          <BarChart
            labels={chartLabels}
            datasets={[chartData]}
            title="Registros por Semana"
            options={{
              indexAxis: 'x',
              plugins: {
                legend: {
                  display: false,
                },
              },
            }}
          />
        </div>

        {/* Tabla de detalles */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800">
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  Período
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  Semana
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  Registros
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  % del Total
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {weeklyStats.map((stat, index) => (
                <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition">
                  <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                    {stat.period || 'N/A'}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                    Semana {stat.week}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                      {formatNumber(stat.total || 0)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                    {totalRegistros > 0 ? Math.round((stat.total / totalRegistros) * 100) : 0}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Card>
  );
};

export default WeeklyStats;
