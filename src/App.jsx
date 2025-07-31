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
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute'; 
import AnimeDetail from './pages/AnimeDetail'; // ✅ IMPORT

function App() {
  return (
    <ThemeProvider>
      <Navbar />
      <ErrorBoundary fallback={<div>⚠️ Something went wrong!</div>}>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/watchlist"
            element={
              <ProtectedRoute>
                <WatchlistPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminPanel />
              </ProtectedRoute>
            }
          />
          <Route
            path="/clubs"
            element={
              <ProtectedRoute>
                <ClubPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/adminpolls"
            element={
              <ProtectedRoute>
                <AdminPolls />
              </ProtectedRoute>
            }
          />
          <Route
            path="/recommendations"
            element={
              <ProtectedRoute>
                <Recommendations />
              </ProtectedRoute>
            }
          />
          <Route
            path="/shared/:uid"
            element={
              <ProtectedRoute>
                <SharedWatchlist />
              </ProtectedRoute>
            }
          />
          <Route
            path="/show/:id"
            element={
              <ProtectedRoute>
                <ShowDetails />
              </ProtectedRoute>
            }
          />

          {/* ✅ NEW: ANIME DETAIL PAGE BASED ON MAL ID */}
          <Route
            path="/anime/:id"
            element={
              <ProtectedRoute>
                <AnimeDetail />
              </ProtectedRoute>
            }
          />
        </Routes>
      </ErrorBoundary>
    </ThemeProvider>
  );
}

export default App;
