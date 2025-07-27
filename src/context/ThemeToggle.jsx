import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

export default function ThemeToggle() {
  const { darkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <button onClick={toggleTheme} style={{ marginLeft: 'auto' }}>
      {darkMode ? '🌙 Dark' : '☀️ Light'}
    </button>
  );
}
