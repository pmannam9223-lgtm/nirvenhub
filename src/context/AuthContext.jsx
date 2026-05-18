import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

axios.defaults.baseURL = import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/` : 'http://localhost:8000/api/';

axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, [token]);

  const fetchUser = async () => {
    try {
      const { data } = await axios.get('auth/me/');
      setUser(data);
    } catch (error) {
      console.error('Error fetching user', error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    const { data } = await axios.post('auth/login/', { email, password });
    localStorage.setItem('token', data.tokens.access);
    setToken(data.tokens.access);
    setUser(data.user);
  };

  const register = async (name, email, password) => {
    const username = email.split('@')[0];
    const { data } = await axios.post('auth/register/', { name, email, password, username });
    localStorage.setItem('token', data.tokens.access);
    setToken(data.tokens.access);
    setUser(data.user);
  };

  const googleLogin = async (credential) => {
    const { data } = await axios.post('auth/google/', { token: credential });
    localStorage.setItem('token', data.tokens.access);
    setToken(data.tokens.access);
    setUser(data.user);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, googleLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
