"use client";
import { createContext, useState } from 'react';

const SessionContext = createContext();

const SessionProvider = ({ children }) => {
  const [userSession, setUserSession] = useState(null);

  return (
    <SessionContext.Provider value={{ userSession, setUserSession }}>
      {children}
    </SessionContext.Provider>
  );
};

export { SessionContext, SessionProvider };
