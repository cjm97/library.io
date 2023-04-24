import React, { createContext } from 'react';
import { useContext, useState } from 'react';

export const UserContext = createContext();

export default function UserProvider(props) {
  const [user, setUser] = useState('');

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {props.children}
    </UserContext.Provider>
  );
}
