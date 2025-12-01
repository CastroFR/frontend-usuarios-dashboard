import { useCallback } from 'react';
import { statisticsService } from '../api/statisticsService';

export const useStatistics = () => {
  const getDailyStats = useCallback(async (params = {}) => {
    try {
      const data = await statisticsService.getDaily(params);
      return { success: true, data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Error al obtener estadísticas diarias' 
      };
    }
  }, []);

  const getWeeklyStats = useCallback(async (params = {}) => {
    try {
      const data = await statisticsService.getWeekly(params);
      return { success: true, data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Error al obtener estadísticas semanales' 
      };
    }
  }, []);

  const getMonthlyStats = useCallback(async (params = {}) => {
    try {
      const data = await statisticsService.getMonthly(params);
      return { success: true, data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Error al obtener estadísticas mensuales' 
      };
    }
  }, []);

  const getSummaryStats = useCallback(async () => {
    try {
      const data = await statisticsService.getSummary();
      return { success: true, data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Error al obtener resumen de estadísticas' 
      };
    }
  }, []);

  return {
    getDailyStats,
    getWeeklyStats,
    getMonthlyStats,
    getSummaryStats,
  };
};