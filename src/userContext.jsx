import   { createContext, useState } from 'react';

// Create a context
const UserContext = createContext();

// Create a context provider
// eslint-disable-next-line react/prop-types
const UserProvider = ({ children }) => {
  const [username, setUsername] = useState('');

  const updateUsername = (newUsername) => {
    setUsername(newUsername);
  };

  return (
    <UserContext.Provider value={{ username, updateUsername }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
