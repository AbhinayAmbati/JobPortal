/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const AppContext = createContext();

// eslint-disable-next-line react/prop-types
export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    return Boolean(Cookies.get("token")); 
  });

  const [username, setUsername] = useState(() => {
    return Cookies.get("username") || '';
  });

  const logout = () => {
    Cookies.remove("token");
    Cookies.remove("username");
    setUser(false);
    setUsername('');
  };

  useEffect(() => {
    const storedUsername = Cookies.get("username");
    if (user && storedUsername) {
      setUsername(storedUsername);
    }
  }, [user]);

  return (
    <AppContext.Provider value={{ user, setUser, username, setUsername, logout }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);

export default AppContext;