import { createContext, useContext, useMemo, useState } from 'react';
import { apiRequest, getStoredToken } from '../api/client.js';

const TOKEN_KEY = 'jobPortalToken';
const USER_KEY = 'jobPortalUser';
const AuthContext = createContext(null);

const getStoredUser = () => {
  try {
    return JSON.parse(localStorage.getItem(USER_KEY));
  } catch {
    return null;
  }
};

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => getStoredToken());
  const [user, setUser] = useState(() => getStoredUser());
  const [authError, setAuthError] = useState('');

  const saveSession = (session) => {
    localStorage.setItem(TOKEN_KEY, session.token);
    localStorage.setItem(USER_KEY, JSON.stringify(session.user));
    setToken(session.token);
    setUser(session.user);
  };

  const login = async ({ email, password }) => {
    setAuthError('');
    const response = await apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    saveSession(response.data);
    return response.data.user;
  };

  const register = async ({ name, email, password }) => {
    setAuthError('');
    const response = await apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    });

    saveSession(response.data);
    return response.data.user;
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setToken(null);
    setUser(null);
    setAuthError('');
  };

  const value = useMemo(
    () => ({
      token,
      user,
      authError,
      setAuthError,
      isAuthenticated: Boolean(token),
      login,
      logout,
      register,
    }),
    [authError, token, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }

  return context;
};
