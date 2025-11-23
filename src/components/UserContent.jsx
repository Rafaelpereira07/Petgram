import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("petgram_user")) || null
  );

  const updateUser = (newUser) => {
    setUser(newUser);
    if (newUser) {
      localStorage.setItem("petgram_user", JSON.stringify(newUser));
    } else {
      localStorage.removeItem("petgram_user");
    }
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
