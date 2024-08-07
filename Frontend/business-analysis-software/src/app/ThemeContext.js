"use client";
import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export function useTheme() {
  return useContext(ThemeContext);
}


export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");
  const [isThemeLoaded, setIsThemeLoaded] = useState(false);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    window.localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    const localTheme = window.localStorage.getItem("theme");
    if (localTheme) {
      setTheme(localTheme);
    }
    setIsThemeLoaded(true);
  }, []);

  if (!isThemeLoaded) {
    return null; // Render nothing or a loading indicator while the theme is being loaded
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}


