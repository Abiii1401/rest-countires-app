import axios from 'axios';

const BASE_URL = 'https://restcountries.com/v3.1';

export const getAllCountries = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/all`);
    if (!response.data || !Array.isArray(response.data)) {
      throw new Error('Invalid response format');
    }
    return response.data;
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      throw new Error(`Server error: ${error.response.status}`);
    } else if (error.request) {
      // The request was made but no response was received
      throw new Error('No response from server. Please check your internet connection.');
    } else {
      // Something happened in setting up the request that triggered an Error
      throw new Error('Error setting up request');
    }
  }
};

export const searchCountriesByName = async (name) => {
  try {
    const response = await axios.get(`${BASE_URL}/name/${name}`);
    if (!response.data || !Array.isArray(response.data)) {
      throw new Error('Invalid response format');
    }
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      throw new Error('No countries found with that name');
    }
    throw new Error('Error searching countries');
  }
};

export const filterCountriesByRegion = async (region) => {
  try {
    const response = await axios.get(`${BASE_URL}/region/${region}`);
    if (!response.data || !Array.isArray(response.data)) {
      throw new Error('Invalid response format');
    }
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      throw new Error('No countries found in that region');
    }
    throw new Error('Error filtering countries');
  }
};

export const getCountryDetails = async (code) => {
  try {
    const response = await axios.get(`${BASE_URL}/alpha/${code}`);
    if (!response.data || !Array.isArray(response.data) || response.data.length === 0) {
      throw new Error('Country not found');
    }
    return response.data[0];
  } catch (error) {
    if (error.response && error.response.status === 404) {
      throw new Error('Country not found');
    }
    throw new Error('Error fetching country details');
  }
}; 