"use client";
import { createContext, useState, useCallback, useEffect } from 'react';
import Cookies from 'js-cookie';

const SessionContext = createContext();

const SessionProvider = ({ children }) => {
  const [userSession, setUserSession] = useState(null);

  const updateUserSession = useCallback((newSession) => {
    setUserSession(newSession);
    Cookies.set('userSession', JSON.stringify(newSession), {
      expires: 2/24,
      secure: true,
      httpOnly: true,
      sameSite: 'strict'
    });
  }, []);

  useEffect(() => {
    const storedUserSession = Cookies.get('userSession');
    if (storedUserSession) {
      setUserSession(JSON.parse(storedUserSession));
    }
  }, []);

  return (
    <SessionContext.Provider value={{ userSession, setUserSession, updateUserSession }}>
      {children}
    </SessionContext.Provider>
  );
};

export { SessionContext, SessionProvider };
