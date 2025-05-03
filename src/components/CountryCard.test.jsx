import React from 'react';
import { render, screen } from '@testing-library/react';
import CountryCard from './CountryCard';

const mockCountry = {
  cca3: 'USA',
  name: {
    common: 'United States',
  },
  flags: {
    png: 'https://flagcdn.com/w320/us.png',
  },
  population: 329484123,
  region: 'Americas',
  capital: ['Washington, D.C.'],
};

describe('CountryCard', () => {
  it('renders country information correctly', () => {
    render(<CountryCard country={mockCountry} />);

    expect(screen.getByText('United States')).toBeInTheDocument();
    expect(screen.getByText('329,484,123')).toBeInTheDocument();
    expect(screen.getByText('Americas')).toBeInTheDocument();
    expect(screen.getByText('Washington, D.C.')).toBeInTheDocument();
  });

  it('renders the country flag', () => {
    render(<CountryCard country={mockCountry} />);
    const flagImage = screen.getByAltText('United States flag');
    expect(flagImage).toBeInTheDocument();
    expect(flagImage).toHaveAttribute('src', 'https://flagcdn.com/w320/us.png');
  });

  it('links to the correct country details page', () => {
    render(<CountryCard country={mockCountry} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/country/USA');
  });
}); 