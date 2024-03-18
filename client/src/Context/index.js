import { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    if (localStorage.getItem('jwtoken')) 
        return true;
    else 
        return false;
  });

  return (
    <UserContext.Provider value={{ setIsAuthenticated, isAuthenticated }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};

