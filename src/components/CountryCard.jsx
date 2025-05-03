import React from 'react';
import { Link } from 'react-router-dom';

const CountryCard = ({ country }) => {
  const { name, flags, population, region, capital } = country;

  return (
    <Link to={`/country/${country.cca3}`} className="block">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <img
          src={flags.png}
          alt={`${name.common} flag`}
          className="w-full h-48 object-cover"
        />
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4 dark:text-white">{name.common}</h2>
          <div className="space-y-2">
            <p className="text-gray-600 dark:text-gray-300">
              <span className="font-semibold">Population:</span> {population.toLocaleString()}
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              <span className="font-semibold">Region:</span> {region}
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              <span className="font-semibold">Capital:</span> {capital?.[0] || 'N/A'}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CountryCard; 