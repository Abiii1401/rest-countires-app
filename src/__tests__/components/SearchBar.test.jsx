import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from '../../components/SearchBar';

describe('SearchBar', () => {
  it('renders search input correctly', () => {
    render(<SearchBar onSearch={() => {}} />);
    expect(screen.getByPlaceholderText('Search for a country...')).toBeInTheDocument();
  });

  it('calls onSearch with input value when form is submitted', () => {
    const mockOnSearch = jest.fn();
    render(<SearchBar onSearch={mockOnSearch} />);
    
    const searchInput = screen.getByPlaceholderText('Search for a country...');
    fireEvent.change(searchInput, { target: { value: 'Canada' } });
    fireEvent.submit(searchInput.closest('form'));
    
    expect(mockOnSearch).toHaveBeenCalledWith('Canada');
  });

  it('updates input value when user types', () => {
    render(<SearchBar onSearch={() => {}} />);
    const searchInput = screen.getByPlaceholderText('Search for a country...');
    fireEvent.change(searchInput, { target: { value: 'France' } });
    expect(searchInput.value).toBe('France');
  });
}); 