import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const API_BASE = 'https://dailist-1.onrender.com';

const api = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
});

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);


  const checkAuth = async () => {
    try {
      const response = axios.get("/auth/me", { withCredentials: true });
;
      if (response.status === 200 && response.data) {
        setIsAuthenticated(true);
        setUser(response.data);
        return true;
      }
    } catch (error) {
      setIsAuthenticated(false);
      setUser(null);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Check authentication status on mount
  useEffect(() => {
    checkAuth();
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      const response = await api.post('/login', { email, password });
      if (response.status === 200) {
        // After successful login, verify auth
        const authStatus = await checkAuth();
        return authStatus;
      }
    } catch (error) {
      throw error;
    }
  };

  // Register function
  const register = async (userData) => {
    try {
      const response = await api.post('/register', userData);
      if (response.status === 200) {
        // After successful registration, verify auth
        const authStatus = await checkAuth();
        return authStatus;
      }
    } catch (error) {
      throw error;
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await api.post('/logout').catch(() => {
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsAuthenticated(false);
      setUser(null);
      // Navigate will be handled by the component calling logout
    }
  };

  const value = {
    isAuthenticated,
    isLoading,
    user,
    checkAuth,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};