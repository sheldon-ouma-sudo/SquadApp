import { createContext, useContext, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const updateLocalUser = (newUserData) => {
    setUser(newUserData);
    AsyncStorage.setItem('userData', JSON.stringify(newUserData));
  };
  const updateUserProperty = (property, value) => {
    setUser((prevUser) => ({
      ...prevUser,
      [property]: value,
    }));
  };


  return (
    <UserContext.Provider value={{ user, updateLocalUser, updateUserProperty }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
