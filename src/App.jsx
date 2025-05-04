import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { SessionProvider } from './context/SessionContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './components/Login';
import Home from './pages/Home';
import CountryCard from './components/CountryCard';
import SearchBar from './components/SearchBar';
import FilterDropdown from './components/FilterDropdown';
import CountryDetails from './pages/CountryDetails';
import Navbar from './components/Navbar';
import {
  getAllCountries,
  searchCountriesByName,
  filterCountriesByRegion,
} from './services/api';

function App() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');

  useEffect(() => {
    fetchAllCountries();
  }, []);

  const fetchAllCountries = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAllCountries();
      setCountries(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch countries. Please try again later.');
      setCountries([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (searchTerm) => {
    setSearchTerm(searchTerm);
    if (!searchTerm) {
      fetchAllCountries();
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await searchCountriesByName(searchTerm);
      setCountries(data);
    } catch (err) {
      setError(err.message || 'No countries found. Please try a different search term.');
      setCountries([]);
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = async (region) => {
    setSelectedRegion(region);
    if (!region) {
      fetchAllCountries();
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await filterCountriesByRegion(region);
      setCountries(data);
    } catch (err) {
      setError(err.message || 'Failed to filter countries. Please try again.');
      setCountries([]);
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    if (searchTerm) {
      handleSearch(searchTerm);
    } else if (selectedRegion) {
      handleFilter(selectedRegion);
    } else {
      fetchAllCountries();
    }
  };

  return (
    <SessionProvider>
      <Router>
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
          <Navbar />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/country/:code"
              element={
                <ProtectedRoute>
                  <CountryDetails />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </SessionProvider>
  );
}

export default App; 