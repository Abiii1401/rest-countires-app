import React from 'react';

const regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

const FilterDropdown = ({ onFilter, currentRegion }) => {
  const handleFilter = (e) => {
    const region = e.target.value;
    onFilter(region);
  };

  return (
    <select
      value={currentRegion}
      onChange={handleFilter}
      className="px-4 py-2 rounded-md shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
    >
      <option value="">Filter by Region</option>
      {regions.map((region) => (
        <option key={region} value={region}>
          {region}
        </option>
      ))}
    </select>
  );
};

export default FilterDropdown; 