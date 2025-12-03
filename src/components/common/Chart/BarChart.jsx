import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = ({ 
  labels, 
  datasets, 
  title, 
  subtitle,
  options = {} 
}) => {
  const isDark = document.documentElement.classList.contains('dark');
  
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        labels: {
          color: isDark ? '#9CA3AF' : '#6B7280',
          usePointStyle: true,
          padding: 15,
        },
      },
      title: {
        display: !!title,
        text: title,
        color: isDark ? '#F3F4F6' : '#1F2937',
        font: {
          size: 14,
          weight: 'bold',
        },
        padding: 20,
      },
    },
    scales: {
      y: {
        grid: {
          color: isDark ? 'rgba(75, 85, 99, 0.2)' : 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          color: isDark ? '#9CA3AF' : '#6B7280',
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: isDark ? '#9CA3AF' : '#6B7280',
        },
      },
    },
    ...options,
  };

  const colorPalette = [
    '#3B82F6',
    '#10B981',
    '#F59E0B',
    '#EF4444',
    '#8B5CF6',
    '#EC4899',
  ];

  const data = {
    labels,
    datasets: datasets.map((dataset, index) => ({
      ...dataset,
      backgroundColor: dataset.backgroundColor || colorPalette[index % colorPalette.length],
      borderColor: dataset.borderColor || colorPalette[index % colorPalette.length],
      borderWidth: 1,
      borderRadius: 4,
    })),
  };

  return <Bar data={data} options={chartOptions} />;
};

export default BarChart;
