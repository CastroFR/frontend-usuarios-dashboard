import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const PieChart = ({ 
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
        position: 'bottom',
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
      tooltip: {
        backgroundColor: isDark ? 'rgba(31, 41, 55, 0.8)' : 'rgba(0, 0, 0, 0.8)',
        titleColor: isDark ? '#F3F4F6' : '#FFFFFF',
        bodyColor: isDark ? '#F3F4F6' : '#FFFFFF',
        borderColor: isDark ? '#4B5563' : '#E5E7EB',
        borderWidth: 1,
        padding: 12,
        displayColors: true,
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
    '#14B8A6',
    '#F97316',
  ];

  const data = {
    labels,
    datasets: datasets.map((dataset) => ({
      ...dataset,
      backgroundColor: dataset.backgroundColor || colorPalette.slice(0, labels.length),
      borderColor: isDark ? '#1F2937' : '#FFFFFF',
      borderWidth: 2,
    })),
  };

  return <Pie data={data} options={chartOptions} />;
};

export default PieChart;
