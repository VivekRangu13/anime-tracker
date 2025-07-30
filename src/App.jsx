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
import Home from './pages/Home';
import { ErrorBoundary } from 'react-error-boundary';
import AdminPolls from './pages/AdminPolls';
import Recommendations from './components/Recommendations';

function App() {
  return (
    <ThemeProvider>
      <Navbar />
      <ErrorBoundary fallback={<div>⚠️ Something went wrong!</div>}>  <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/watchlist" element={<WatchlistPage />} />
        <Route path="/show/:id" element={<ShowDetails />} />
        <Route path="/recommendations" element={<Recommendations />} />
        <Route path="/shared/:uid" element={<SharedWatchlist />} />
        <Route path="/adminpolls" element={<AdminPolls />} />
        <Route path="/clubs" element={<ClubPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
      </ErrorBoundary>    
    </ThemeProvider>
  );
}

export default App;
