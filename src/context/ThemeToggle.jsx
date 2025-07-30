import React, { useContext } from 'react';
import { ThemeContext } from './ThemeContext';

export default function ThemeToggle() {
  const { darkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      style={{
        marginLeft: 'auto',
        padding: '6px 12px',
        backgroundColor: 'var(--card)',
        color: 'var(--text)',
        border: '1px solid var(--border)',
        borderRadius: '6px',
        cursor: 'pointer'
      }}
    >
      {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
    </button>
  );
}
