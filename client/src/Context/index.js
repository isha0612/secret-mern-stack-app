import { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Check if jwt token is present in local storage
    if(localStorage.getItem('jwtoken')) {
      return true;
    }
    else {
      return false;
    }
    // if (document.cookie === '' || document.cookie.match('jwtoken').input == null || document.cookie.match('jwtoken').input === undefined) {
    //   return (false);
    // } else {
    //   return (true);
    // }
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

