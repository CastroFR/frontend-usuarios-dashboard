import React from 'react';
import { LineChart } from '../../components/common/Chart';
import Card from '../../components/common/Card';
import { formatNumber } from '../../utils/helpers';

const MonthlyStats = ({ monthlyStats = [] }) => {
  if (!monthlyStats || monthlyStats.length === 0) {
    return (
      <Card title="Estadísticas Mensuales" subtitle="Últimos 12 meses">
        <div className="text-center py-8 text-gray-400 dark:text-gray-500">
          No hay datos mensuales disponibles
        </div>
      </Card>
    );
  }

  // Limitar a últimos 12 meses y ordenar cronológicamente
  const recentStats = monthlyStats.slice(0, 12).reverse();

  // Preparar datos para el gráfico de línea
  const chartLabels = recentStats.map(stat => 
    stat.month_name ? stat.month_name.substring(0, 3) : `Mes ${stat.month}`
  );
  
  const chartData = {
    label: 'Registros Mensuales',
    data: recentStats.map(stat => stat.total || 0),
    borderColor: '#10B981',
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
  };

  const totalRegistros = recentStats.reduce((acc, stat) => acc + (stat.total || 0), 0);
  const promedioRegistros = Math.round(totalRegistros / (recentStats.length || 1));
  const maxRegistros = Math.max(...recentStats.map(stat => stat.total || 0));
  const minRegistros = Math.min(...recentStats.map(stat => stat.total || 0));

  return (
    <Card 
      title="Estadísticas Mensuales" 
      subtitle="Últimos 12 meses"
    >
      <div className="space-y-6">
        {/* Métricas principales */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-lg p-4">
            <div className="text-sm text-gray-600 dark:text-gray-400">Mínimo</div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {formatNumber(minRegistros)}
            </div>
          </div>
        </div>

        {/* Gráfico de línea */}
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 h-80">
          <LineChart
            labels={chartLabels}
            datasets={[chartData]}
            title="Tendencia de Registros Mensuales"
            options={{
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
                  Mes
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  Registros
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  % del Total
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  Variación
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {recentStats.map((stat, index) => {
                const previousStat = index > 0 ? recentStats[index - 1] : null;
                const variacion = previousStat 
                  ? ((stat.total - previousStat.total) / (previousStat.total || 1)) * 100 
                  : 0;
                
                return (
                  <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition">
                    <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">
                      {stat.month_name || `Mes ${stat.month}`}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                        {formatNumber(stat.total || 0)}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                      {totalRegistros > 0 ? Math.round((stat.total / totalRegistros) * 100) : 0}%
                    </td>
                    <td className="px-4 py-3 text-sm">
                      {previousStat ? (
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium ${
                          variacion >= 0 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                            : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                        }`}>
                          {variacion >= 0 ? '↗' : '↘'} {Math.abs(Math.round(variacion))}%
                        </span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </Card>
  );
};

export default MonthlyStats;
