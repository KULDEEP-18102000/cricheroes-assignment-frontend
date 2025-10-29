import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

/**
 * Fetch the current IPL points table
 */
export const getPointsTable = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/points-table`);
    return response.data;
  } catch (error) {
    console.error('Error fetching points table:', error);
    throw error;
  }
};

/**
 * Calculate NRR requirements
 */
export const calculateNRR = async (formData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/calculate-nrr`, formData);
    return response.data;
  } catch (error) {
    console.error('Error calculating NRR:', error);
    throw error;
  }
};