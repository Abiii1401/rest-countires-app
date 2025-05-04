import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSession } from '../context/SessionContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useSession();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute; 