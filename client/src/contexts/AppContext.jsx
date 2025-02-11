/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
// import axios from 'axios';

const AppContext = createContext();

// eslint-disable-next-line react/prop-types
export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    return Boolean(Cookies.get("token")); 
  });

  // useEffect(() => {
  //   const jwtToken = async () => {
  //     if(user){
  //       try {
  //         const response = await axios.post("http://localhost:8080/api/user/jwt-token", {
  //           email: Cookies.get("email"),
  //         });
  //         Cookies.set("token", response.data);
  //         console.log("Token refreshed:", response.data);
  //       } catch (error) {
  //         console.error("Error refreshing token:", error);
  //       }
  //     };
  //     };
  //     // Run jwtToken every 1 second
  // const intervalId = setInterval(jwtToken, 1000);

  // return () => clearInterval(intervalId);
  
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []); 

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