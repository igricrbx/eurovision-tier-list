import React, { createContext, useReducer, useEffect, useContext, useState } from 'react';
import { authService } from '../services/api';
import { User, AuthState } from '../types';

interface AuthContextType {
  state: AuthState;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, username: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  loading: true,
  error: null,
};

type AuthAction =
  | { type: 'LOGIN_SUCCESS'; payload: { user: User; token: string } }
  | { type: 'REGISTER_SUCCESS'; payload: { user: User; token: string } }
  | { type: 'USER_LOADED'; payload: User }
  | { type: 'AUTH_ERROR' }
  | { type: 'LOGIN_FAIL'; payload: string }
  | { type: 'REGISTER_FAIL'; payload: string }
  | { type: 'LOGOUT' };

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'USER_LOADED':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        loading: false,
      };
    case 'LOGIN_SUCCESS':
    case 'REGISTER_SUCCESS':
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        loading: false,
        error: null,
      };
    case 'AUTH_ERROR':
    case 'LOGOUT':
      localStorage.removeItem('token');
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        loading: false,
        error: null,
      };
    case 'LOGIN_FAIL':
    case 'REGISTER_FAIL':
      localStorage.removeItem('token');
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        dispatch({ type: 'AUTH_ERROR' });
        setIsLoading(false);
        return;
      }
      
      try {
        const user = await authService.getCurrentUser();
        dispatch({ type: 'USER_LOADED', payload: user });
      } catch (error) {
        dispatch({ type: 'AUTH_ERROR' });
      } finally {
        setIsLoading(false);
      }
    };
    
    loadUser();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const data = await authService.login(email, password);
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: data,
      });
    } catch (error: any) {
      const message = error.response?.data?.message || 'An error occurred during login';
      dispatch({
        type: 'LOGIN_FAIL',
        payload: message,
      });
      throw new Error(message);
    }
  };

  const register = async (email: string, password: string, username: string) => {
    try {
      const data = await authService.register(email, password, username);
      dispatch({
        type: 'REGISTER_SUCCESS',
        payload: data,
      });
    } catch (error: any) {
      const message = error.response?.data?.message || 'An error occurred during registration';
      dispatch({
        type: 'REGISTER_FAIL',
        payload: message,
      });
      throw new Error(message);
    }
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider value={{ state, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};