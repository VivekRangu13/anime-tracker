import React from 'react';
import { Link } from 'react-router-dom';
import ThemeToggle from '../context/ThemeToggle';

export default function Navbar() {
  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px 20px',
      backgroundColor: '#eee'
    }}>
      <div style={{ display: 'flex', gap: '15px' }}>
        <Link to="/">🏠 Home</Link>
        <Link to="/watchlist">📺 Watchlist</Link>
        <Link to="/dashboard">📊 Dashboard</Link>
        <Link to="/clubs">👥 Clubs</Link>
        <Link to="/admin">🛡️ Admin</Link>
      </div>
      <ThemeToggle />
    </nav>
  );
}
