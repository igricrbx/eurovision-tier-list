import React from 'react';
import { useAuth } from '../context/AuthContext';

const Header: React.FC = () => {
  const { state, logout } = useAuth();
  
  return (
    <header>
      {/* Your header content */}
      {state.isAuthenticated ? (
        <button onClick={logout}>Logout</button>
      ) : (
        <button>Register</button>
      )}
    </header>
  );
};

export default Header;
