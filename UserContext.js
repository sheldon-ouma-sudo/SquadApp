import { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const updateUser = (newUserData) => {
    setUser(newUserData);
  };
  const updateUserProperty = (property, value) => {
    setUser((prevUser) => ({
      ...prevUser,
      [property]: value,
    }));
  };


  return (
    <UserContext.Provider value={{ user, updateUser, updateUserProperty }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
