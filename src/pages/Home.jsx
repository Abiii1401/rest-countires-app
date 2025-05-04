import React, { useState, useEffect } from 'react';
import CountryCard from '../components/CountryCard';
import SearchBar from '../components/SearchBar';
import FilterDropdown from '../components/FilterDropdown';
import { getAllCountries } from '../services/api';

const Home = () => {
  const [allCountries, setAllCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentRegion, setCurrentRegion] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchCountries();
  }, []);

  // Update filtered countries whenever region or search term changes
  useEffect(() => {
    if (allCountries.length > 0) {
      const filtered = applyFilters(allCountries, currentRegion, searchTerm);
      setFilteredCountries(filtered);
    }
  }, [allCountries, currentRegion, searchTerm]);

  const fetchCountries = async () => {
    try {
      setLoading(true);
      const data = await getAllCountries();
      setAllCountries(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch countries. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = (countries, region, search) => {
    let result = [...countries];

    // First apply region filter
    if (region) {
      result = result.filter(country => country.region === region);
    }

    // Then apply search filter within the region-filtered results
    if (search) {
      result = result.filter(country =>
        country.name.common.toLowerCase().includes(search.toLowerCase())
      );
    }

    return result;
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleFilter = (region) => {
    setCurrentRegion(region);
  };

  const handleRetry = () => {
    fetchCountries();
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-12">
        <SearchBar onSearch={handleSearch} />
        <FilterDropdown onFilter={handleFilter} currentRegion={currentRegion} />
      </div>

      {loading ? (
        <div className="text-center py-20">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300 text-lg">Loading countries...</p>
        </div>
      ) : error ? (
        <div className="text-center py-20">
          <div className="inline-block p-4 bg-red-100 dark:bg-red-900 rounded-full mb-4">
            <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <p className="text-red-500 mb-6 text-lg">{error}</p>
          <button
            onClick={handleRetry}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all transform hover:scale-105 shadow-lg"
          >
            Try Again
          </button>
        </div>
      ) : filteredCountries.length === 0 ? (
        <div className="text-center py-20">
          <div className="inline-block p-4 bg-gray-100 dark:bg-gray-800 rounded-full mb-4">
            <svg className="w-12 h-12 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            {searchTerm && currentRegion
              ? `No countries found matching "${searchTerm}" in ${currentRegion}`
              : searchTerm
              ? `No countries found matching "${searchTerm}"`
              : currentRegion
              ? `No countries found in ${currentRegion}`
              : 'No countries found'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredCountries.map((country) => (
            <CountryCard key={country.cca3} country={country} />
          ))}
        </div>
      )}
    </main>
  );
};

export default Home; 