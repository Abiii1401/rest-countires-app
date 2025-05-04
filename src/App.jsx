import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { SessionProvider } from './context/SessionContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './components/Login';
import Home from './pages/Home';
import CountryDetails from './pages/CountryDetails';
import Navbar from './components/Navbar';

function App() {
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