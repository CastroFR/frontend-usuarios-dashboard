import React, { createContext, useState, useContext, useEffect } from 'react';
import { statisticsService } from '../api/statisticsService';

const DataContext = createContext({});

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData debe ser usado dentro de DataProvider');
  }
  return context;
};

export const DataProvider = ({ children }) => {
  const [dashboardData, setDashboardData] = useState(null);
  const [statisticsData, setStatisticsData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const summary = await statisticsService.getSummaryStats();
      const daily = await statisticsService.getDailyStats();
      const weekly = await statisticsService.getWeeklyStats();
      const monthly = await statisticsService.getMonthlyStats();
      
      setDashboardData({
        summary,
        daily,
        weekly,
        monthly,
      });
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Error cargando datos del dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadStatisticsData = async () => {
    try {
      setLoading(true);
      const [summary, daily, weekly, monthly] = await Promise.all([
        statisticsService.getSummaryStats(),
        statisticsService.getDailyStats(),
        statisticsService.getWeeklyStats(),
        statisticsService.getMonthlyStats(),
      ]);
      
      setStatisticsData({
        summary,
        daily,
        weekly,
        monthly,
      });
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Error cargando estadísticas:', error);
    } finally {
      setLoading(false);
    }
  };

  const refreshData = async () => {
    await Promise.all([
      loadDashboardData(),
      loadStatisticsData(),
    ]);
  };

  useEffect(() => {
    // Cargar datos iniciales
    loadDashboardData();
    loadStatisticsData();
    
    // Refrescar cada 30 segundos
    const interval = setInterval(() => {
      refreshData();
    }, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const value = {
    dashboardData,
    statisticsData,
    loading,
    lastUpdated,
    refreshData,
    loadDashboardData,
    loadStatisticsData,
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};