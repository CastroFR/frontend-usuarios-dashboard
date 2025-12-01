import axiosInstance from './axiosConfig';

export const statisticsService = {
  /**
   * Obtener estadísticas diarias de usuarios registrados
   * @param {Object} params - Parámetros opcionales (días, etc.)
   * @returns {Promise<Object>}
   */
  async getDaily(params = {}) {
    try {
      const response = await axiosInstance.get('/statistics/daily', { params });
      return response.data;
    } catch (error) {
      console.error('Error en getDaily:', error);
      throw error;
    }
  },

  /**
   * Obtener estadísticas semanales de usuarios registrados
   * @param {Object} params - Parámetros opcionales (semanas, etc.)
   * @returns {Promise<Object>}
   */
  async getWeekly(params = {}) {
    try {
      const response = await axiosInstance.get('/statistics/weekly', { params });
      return response.data;
    } catch (error) {
      console.error('Error en getWeekly:', error);
      throw error;
    }
  },

  /**
   * Obtener estadísticas mensuales de usuarios registrados
   * @param {Object} params - Parámetros opcionales (meses, etc.)
   * @returns {Promise<Object>}
   */
  async getMonthly(params = {}) {
    try {
      const response = await axiosInstance.get('/statistics/monthly', { params });
      return response.data;
    } catch (error) {
      console.error('Error en getMonthly:', error);
      throw error;
    }
  },

  /**
   * Obtener resumen general de estadísticas
   * @returns {Promise<Object>}
   */
  async getSummary() {
    try {
      const response = await axiosInstance.get('/statistics/summary');
      return response.data;
    } catch (error) {
      console.error('Error en getSummary:', error);
      throw error;
    }
  },

  /**
   * Obtener todos los tipos de estadísticas en una sola llamada
   * @returns {Promise<Object>}
   */
  async getAllStats() {
    try {
      const [daily, weekly, monthly, summary] = await Promise.all([
        this.getDaily(),
        this.getWeekly(),
        this.getMonthly(),
        this.getSummary(),
      ]);
      
      return {
        daily,
        weekly,
        monthly,
        summary,
        success: true,
      };
    } catch (error) {
      console.error('Error en getAllStats:', error);
      throw error;
    }
  },

  /**
   * Obtener estadísticas personalizadas por rango de fechas
   * @param {string} startDate - Fecha inicio (YYYY-MM-DD)
   * @param {string} endDate - Fecha fin (YYYY-MM-DD)
   * @returns {Promise<Object>}
   */
  async getByDateRange(startDate, endDate) {
    try {
      const response = await axiosInstance.get('/statistics/daily', {
        params: {
          start_date: startDate,
          end_date: endDate,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error en getByDateRange:', error);
      throw error;
    }
  },
};