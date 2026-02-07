import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * ProtectedRoute Component
 * 
 * This component protects routes that require authentication.
 * 
 * How it works:
 * 1. It uses the useAuth hook to check if user is authenticated
 * 2. While checking (isLoading), it shows a loading state
 * 3. If authenticated, it renders the protected component
 * 4. If not authenticated, it redirects to the login page
 * 
 * Usage:
 * <Route path="/protected" element={<ProtectedRoute><YourComponent /></ProtectedRoute>} />
 */
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#000000]">
        <div className="text-[#D1D0D0] text-xl">Loading...</div>
      </div>
    );
  }

  // If not authenticated, redirect to login page
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // If authenticated, render the protected component
  return children;
};

export default ProtectedRoute;
