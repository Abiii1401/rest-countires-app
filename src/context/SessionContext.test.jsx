import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { SessionProvider, useSession } from './SessionContext';

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock;

// Test component to use the session context
const TestComponent = () => {
  const { isAuthenticated, user, login, logout } = useSession();
  
  return (
    <div>
      <div data-testid="auth-status">{isAuthenticated ? 'Authenticated' : 'Not Authenticated'}</div>
      <div data-testid="user">{user ? user.username : 'No User'}</div>
      <button onClick={() => login({ username: 'testuser' })}>Login</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

describe('SessionContext', () => {
  beforeEach(() => {
    localStorageMock.getItem.mockClear();
    localStorageMock.setItem.mockClear();
    localStorageMock.removeItem.mockClear();
  });

  it('initializes with no authenticated user', () => {
    render(
      <SessionProvider>
        <TestComponent />
      </SessionProvider>
    );

    expect(screen.getByTestId('auth-status')).toHaveTextContent('Not Authenticated');
    expect(screen.getByTestId('user')).toHaveTextContent('No User');
  });

  it('logs in a user and updates the state', () => {
    render(
      <SessionProvider>
        <TestComponent />
      </SessionProvider>
    );

    fireEvent.click(screen.getByText('Login'));
    
    expect(screen.getByTestId('auth-status')).toHaveTextContent('Authenticated');
    expect(screen.getByTestId('user')).toHaveTextContent('testuser');
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'user',
      JSON.stringify({ username: 'testuser' })
    );
  });

  it('logs out a user and updates the state', () => {
    render(
      <SessionProvider>
        <TestComponent />
      </SessionProvider>
    );

    // First login
    fireEvent.click(screen.getByText('Login'));
    // Then logout
    fireEvent.click(screen.getByText('Logout'));

    expect(screen.getByTestId('auth-status')).toHaveTextContent('Not Authenticated');
    expect(screen.getByTestId('user')).toHaveTextContent('No User');
    expect(localStorageMock.removeItem).toHaveBeenCalledWith('user');
  });

  it('restores session from localStorage on mount', () => {
    const storedUser = { username: 'storeduser' };
    localStorageMock.getItem.mockReturnValue(JSON.stringify(storedUser));

    render(
      <SessionProvider>
        <TestComponent />
      </SessionProvider>
    );

    expect(screen.getByTestId('auth-status')).toHaveTextContent('Authenticated');
    expect(screen.getByTestId('user')).toHaveTextContent('storeduser');
  });
}); 