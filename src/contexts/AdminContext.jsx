import { createContext, useContext, useState, useCallback } from 'react';
import { api } from '../utils/api';

const AdminContext = createContext(null);

export function AdminProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('admin_token'));

  const login = useCallback(async (secret) => {
    const res = await api.adminLogin(secret);
    localStorage.setItem('admin_token', res.token);
    setToken(res.token);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('admin_token');
    setToken(null);
  }, []);

  return (
    <AdminContext.Provider value={{ token, isAuthenticated: !!token, login, logout }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  return useContext(AdminContext);
}
