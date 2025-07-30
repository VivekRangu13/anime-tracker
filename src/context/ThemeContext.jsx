import React, { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

export default function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    const isDark = storedTheme === 'dark';
    setDarkMode(isDark);
    applyTheme(isDark);
  }, []);

  const applyTheme = (isDark) => {
    const root = document.documentElement;
    if (isDark) {
      root.style.setProperty('--bg', '#1e1e1e');
      root.style.setProperty('--text', '#ffffff');
      root.style.setProperty('--card', '#2d2d2d');
      root.style.setProperty('--border', '#444');
    } else {
      root.style.setProperty('--bg', '#fefefe');
      root.style.setProperty('--text', '#111111');
      root.style.setProperty('--card', '#ffffff');
      root.style.setProperty('--border', '#ddd');
    }
    document.body.style.background = `var(--bg)`;
    document.body.style.color = `var(--text)`;
  };

  const toggleTheme = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    applyTheme(newMode);
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
