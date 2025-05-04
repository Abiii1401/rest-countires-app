import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FilterDropdown from '../../components/FilterDropdown';

describe('FilterDropdown', () => {
  it('renders filter dropdown correctly', () => {
    const mockOnFilter = jest.fn();
    render(<FilterDropdown onFilter={mockOnFilter} />);

    const filterSelect = screen.getByRole('combobox');
    expect(filterSelect).toBeInTheDocument();
  });

  it('calls onFilter with selected region when changed', () => {
    const mockOnFilter = jest.fn();
    render(<FilterDropdown onFilter={mockOnFilter} />);

    const filterSelect = screen.getByRole('combobox');
    fireEvent.change(filterSelect, { target: { value: 'Europe' } });

    expect(mockOnFilter).toHaveBeenCalledWith('Europe');
  });

  it('contains all region options', () => {
    const mockOnFilter = jest.fn();
    render(<FilterDropdown onFilter={mockOnFilter} />);

    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(6); // All regions + default option
    expect(screen.getByText('Filter by Region')).toBeInTheDocument();
    expect(screen.getByText('Africa')).toBeInTheDocument();
    expect(screen.getByText('Americas')).toBeInTheDocument();
    expect(screen.getByText('Asia')).toBeInTheDocument();
    expect(screen.getByText('Europe')).toBeInTheDocument();
    expect(screen.getByText('Oceania')).toBeInTheDocument();
  });
}); 