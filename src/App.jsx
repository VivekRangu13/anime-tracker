import React from 'react';
import { Routes, Route } from 'react-router-dom';
import WatchlistPage from './pages/WatchlistPage';
import ShowDetails from './pages/ShowDetails';
import ClubPage from './pages/Clubs';
import Dashboard from './pages/Dashboard';
import SharedWatchlist from './pages/SharedWatchlist';
import AdminPanel from './pages/AdminPanel';
import Navbar from './components/Navbar';
import ThemeProvider from './context/ThemeContext';
import Home from './pages/Home.jsx';

function App() {
  return (
    <ThemeProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<h2 style={{ padding: '20px' }}>🎌 Welcome to Anime Tracker</h2>} />
        <Route path="/watchlist" element={<WatchlistPage />} />
        <Route path="/" element={<Home />} />
        <Route path="/show/:id" element={<ShowDetails />} />
        <Route path="/shared/:uid" element={<SharedWatchlist />} />
        <Route path="/clubs" element={<ClubPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
