import axiosInstance from './axiosConfig';

export const statisticsService = {
  async getDailyStats() {
    try {
      const response = await axiosInstance.get('/statistics/daily');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  async getWeeklyStats() {
    try {
      const response = await axiosInstance.get('/statistics/weekly');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  async getMonthlyStats() {
    try {
      const response = await axiosInstance.get('/statistics/monthly');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  async getSummaryStats() {
    try {
      const response = await axiosInstance.get('/statistics/summary');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
};