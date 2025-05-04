import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getCountryDetails } from '../services/api';

const CountryDetails = () => {
  const { code } = useParams();
  const navigate = useNavigate();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCountryDetails = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getCountryDetails(code);
      if (!data) {
        throw new Error('Country not found');
      }
      setCountry(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch country details. Please try again.');
      setCountry(null);
    } finally {
      setLoading(false);
    }
  }, [code]);

  useEffect(() => {
    fetchCountryDetails();
  }, [fetchCountryDetails]);

  const handleRetry = () => {
    fetchCountryDetails();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300 text-lg">Loading country details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block p-4 bg-red-100 dark:bg-red-900 rounded-full mb-4">
            <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <p className="text-red-500 mb-6 text-lg">{error}</p>
          <div className="space-x-4">
            <button
              onClick={handleRetry}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all transform hover:scale-105 shadow-lg"
            >
              Try Again
            </button>
            <button
              onClick={() => navigate('/')}
              className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-all transform hover:scale-105 shadow-lg"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!country) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block p-4 bg-gray-100 dark:bg-gray-800 rounded-full mb-4">
            <svg className="w-12 h-12 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg">Country not found</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all transform hover:scale-105 shadow-lg"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const {
    name,
    flags,
    population,
    region,
    subregion,
    capital,
    tld,
    currencies,
    languages,
    borders,
  } = country;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <button
          onClick={() => navigate('/')}
          className="mb-16 px-6 py-3 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105 flex items-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="w-full h-80 lg:h-96 rounded-xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-300">
            <img
              src={flags.png}
              alt={name.common}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="text-gray-900 dark:text-white">
            <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {name.common}
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="space-y-4">
                <p className="text-lg">
                  <span className="font-semibold text-blue-600 dark:text-blue-400">Native Name:</span>{' '}
                  {name.nativeName ? Object.values(name.nativeName)[0].common : 'N/A'}
                </p>
                <p className="text-lg">
                  <span className="font-semibold text-blue-600 dark:text-blue-400">Population:</span>{' '}
                  {population.toLocaleString()}
                </p>
                <p className="text-lg">
                  <span className="font-semibold text-blue-600 dark:text-blue-400">Region:</span> {region}
                </p>
                <p className="text-lg">
                  <span className="font-semibold text-blue-600 dark:text-blue-400">Sub Region:</span> {subregion || 'N/A'}
                </p>
                <p className="text-lg">
                  <span className="font-semibold text-blue-600 dark:text-blue-400">Capital:</span> {capital?.[0] || 'N/A'}
                </p>
              </div>

              <div className="space-y-4">
                <p className="text-lg">
                  <span className="font-semibold text-blue-600 dark:text-blue-400">Top Level Domain:</span>{' '}
                  {tld?.[0] || 'N/A'}
                </p>
                <p className="text-lg">
                  <span className="font-semibold text-blue-600 dark:text-blue-400">Currencies:</span>{' '}
                  {currencies
                    ? Object.values(currencies)
                      .map((currency) => currency.name)
                      .join(', ')
                    : 'N/A'}
                </p>
                <p className="text-lg">
                  <span className="font-semibold text-blue-600 dark:text-blue-400">Languages:</span>{' '}
                  {languages
                    ? Object.values(languages).join(', ')
                    : 'N/A'}
                </p>
              </div>
            </div>

            {borders && borders.length > 0 && (
              <div>
                <h2 className="text-2xl font-semibold mb-6 text-blue-600 dark:text-blue-400">Border Countries:</h2>
                <div className="flex flex-wrap gap-3">
                  {borders.map((borderCode) => (
                    <Link
                      key={borderCode}
                      to={`/country/${borderCode}`}
                      className="px-6 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all transform hover:scale-105"
                    >
                      {borderCode}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryDetails; 