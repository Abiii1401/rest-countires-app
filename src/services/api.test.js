
import {
  getAllCountries,
  searchCountriesByName,
  filterCountriesByRegion,
  getCountryDetails,
} from './api';

jest.mock('axios');

describe('API Service', () => {
  const mockCountries = [
    {
      cca3: 'USA',
      name: { common: 'United States' },
      flags: { png: 'https://flagcdn.com/w320/us.png' },
    },
  ];

  beforeEach(() => {
    axios.get.mockClear();
  });

  it('fetches all countries successfully', async () => {
    axios.get.mockResolvedValueOnce({ data: mockCountries });

    const result = await getAllCountries();
    expect(result).toEqual(mockCountries);
    expect(axios.get).toHaveBeenCalledWith('https://restcountries.com/v3.1/all');
  });

  it('searches countries by name successfully', async () => {
    axios.get.mockResolvedValueOnce({ data: mockCountries });

    const result = await searchCountriesByName('united');
    expect(result).toEqual(mockCountries);
    expect(axios.get).toHaveBeenCalledWith(
      'https://restcountries.com/v3.1/name/united'
    );
  });

  it('filters countries by region successfully', async () => {
    axios.get.mockResolvedValueOnce({ data: mockCountries });

    const result = await filterCountriesByRegion('Americas');
    expect(result).toEqual(mockCountries);
    expect(axios.get).toHaveBeenCalledWith(
      'https://restcountries.com/v3.1/region/Americas'
    );
  });

  it('fetches country details successfully', async () => {
    axios.get.mockResolvedValueOnce({ data: [mockCountries[0]] });

    const result = await getCountryDetails('USA');
    expect(result).toEqual(mockCountries[0]);
    expect(axios.get).toHaveBeenCalledWith(
      'https://restcountries.com/v3.1/alpha/USA'
    );
  });

  it('handles network errors appropriately', async () => {
    const error = new Error('Network Error');
    axios.get.mockRejectedValueOnce(error);

    await expect(getAllCountries()).rejects.toThrow('Network Error');
  });

  it('handles 404 errors for country search', async () => {
    const error = { response: { status: 404 } };
    axios.get.mockRejectedValueOnce(error);

    await expect(searchCountriesByName('nonexistent')).rejects.toThrow('No countries found with that name');
  });

  it('handles 404 errors for country details', async () => {
    const error = { response: { status: 404 } };
    axios.get.mockRejectedValueOnce(error);

    await expect(getCountryDetails('INVALID')).rejects.toThrow('Country not found');
  });
}); 