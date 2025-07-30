import React, { useEffect, useState } from 'react';
import {
  collection,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
  onSnapshot
} from 'firebase/firestore';
import { db, auth } from '../firebase';
import Comments from '../components/Comments';
import './WatchlistPage.css';

export default function WatchlistPage() {
  const [shows, setShows] = useState([]);
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('Watching');
  const [genre, setGenre] = useState('');
  const [language, setLanguage] = useState('');
  const [year, setYear] = useState('');

  const [filter, setFilter] = useState('All');
  const [genreFilter, setGenreFilter] = useState('');
  const [languageFilter, setLanguageFilter] = useState('');
  const [yearFilter, setYearFilter] = useState('');

  const user = auth.currentUser;

  useEffect(() => {
    if (!user) return;

    localStorage.setItem('uid', user.uid);

    const watchlistRef = collection(db, 'users', user.uid, 'watchlist');
    const unsub = onSnapshot(watchlistRef, (snapshot) => {
      const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setShows(list);
    });

    return () => unsub();
  }, [user]);

  useEffect(() => {
    const interval = setInterval(() => {
      shows.forEach(show => {
        if (!show.reminder) return;

        const now = new Date();
        const reminderTime = new Date(show.reminder);

        if (Math.abs(now.getTime() - reminderTime.getTime()) < 60000) {
          alert(`⏰ Reminder: Time to watch "${show.title}"`);
        }
      });
    }, 60000);

    return () => clearInterval(interval);
  }, [shows]);

  const addShow = async () => {
    if (!title.trim()) {
      alert("Please enter a show title.");
      return;
    }
    if (!user) {
      alert("User not authenticated.");
      return;
    }
    try {
      await addDoc(collection(db, 'users', user.uid, 'watchlist'), {
        title,
        status,
        episodesWatched: 0,
        totalEpisodes: 12,
        reminder: '',
        genre,
        language,
        year
      });
      setTitle('');
      setGenre('');
      setLanguage('');
      setYear('');
    } catch (error) {
      console.error("Failed to add show:", error);
      alert("Failed to add show. Please try again.");
    }
  };

  const deleteShow = async (id) => {
    if (!user) return;
    try {
      await deleteDoc(doc(db, 'users', user.uid, 'watchlist', id));
    } catch (error) {
      console.error("Failed to delete show:", error);
      alert("Failed to delete show. Please try again.");
    }
  };

  const updateProgress = async (id, episodes) => {
    if (!user) return;
    if (episodes < 0) return;
    try {
      const showRef = doc(db, 'users', user.uid, 'watchlist', id);
      await updateDoc(showRef, { episodesWatched: episodes });
    } catch (error) {
      console.error("Failed to update episodes:", error);
      alert("Failed to update episodes. Please try again.");
    }
  };

  const updateReminder = async (id, reminderValue) => {
    if (!user) return;
    try {
      const showRef = doc(db, 'users', user.uid, 'watchlist', id);
      await updateDoc(showRef, { reminder: reminderValue });
    } catch (error) {
      console.error("Failed to update reminder:", error);
      alert("Failed to update reminder. Please try again.");
    }
  };

  const filteredShows = shows.filter(show =>
    (filter === 'All' || show.status === filter) &&
    (!genreFilter || show.genre === genreFilter) &&
    (!languageFilter || show.language === languageFilter) &&
    (!yearFilter || show.year === yearFilter)
  );

  return (
    <div className="watchlist-page">
      <h2>📺 My Watchlist</h2>

      {/* Add Show Form */}
      <div className="add-show-form">
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Enter show title"
        />
        <select value={status} onChange={e => setStatus(e.target.value)}>
          <option>Watching</option>
          <option>Completed</option>
          <option>On Hold</option>
          <option>Dropped</option>
          <option>Plan to Watch</option>
        </select>
        <input
          placeholder="Genre (e.g. Action)"
          value={genre}
          onChange={e => setGenre(e.target.value)}
        />
        <input
          placeholder="Language (e.g. Japanese)"
          value={language}
          onChange={e => setLanguage(e.target.value)}
        />
        <input
          placeholder="Year (e.g. 2023)"
          value={year}
          onChange={e => setYear(e.target.value)}
        />
        <button onClick={addShow}>Add</button>
      </div>

      {/* Filter Buttons */}
      <div className="filter-buttons">
        {['All', 'Watching', 'Completed', 'On Hold', 'Dropped', 'Plan to Watch'].map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={filter === cat ? 'active' : ''}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Tag Filters */}
      <div style={{ marginBottom: '20px' }}>
        <select value={genreFilter} onChange={e => setGenreFilter(e.target.value)}>
          <option value="">Filter by Genre</option>
          {[...new Set(shows.map(s => s.genre).filter(Boolean))].map(g => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>

        <select value={languageFilter} onChange={e => setLanguageFilter(e.target.value)}>
          <option value="">Filter by Language</option>
          {[...new Set(shows.map(s => s.language).filter(Boolean))].map(l => (
            <option key={l} value={l}>{l}</option>
          ))}
        </select>

        <select value={yearFilter} onChange={e => setYearFilter(e.target.value)}>
          <option value="">Filter by Year</option>
          {[...new Set(shows.map(s => s.year).filter(Boolean))].map(y => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
      </div>

      {/* Show List */}
      <div>
        {filteredShows.length === 0 && <p>No shows found for the selected filters.</p>}
        {filteredShows.map(show => (
          <div key={show.id} className="show-card">
            <h3>{show.title}</h3>
            <p>Status: {show.status}</p>
            <p>Genre: {show.genre || 'N/A'} | Language: {show.language || 'N/A'} | Year: {show.year || 'N/A'}</p>
            <p>Episodes: {show.episodesWatched ?? 0}/{show.totalEpisodes ?? 0}</p>

            <button onClick={() => updateProgress(show.id, (show.episodesWatched ?? 0) + 1)}>➕</button>
            <button onClick={() => updateProgress(show.id, Math.max(0, (show.episodesWatched ?? 0) - 1))}>➖</button>
            <button onClick={() => deleteShow(show.id)} className="delete-btn">Delete</button>

            {/* Reminder Input */}
            <div style={{ marginTop: '10px' }}>
              <label>Reminder (YYYY-MM-DD HH:MM): </label>
              <input
                type="datetime-local"
                value={show.reminder || ''}
                onChange={e => updateReminder(show.id, e.target.value)}
              />
            </div>

            {/* View Details Link */}
            <div style={{ marginTop: '10px' }}>
              <a href={`/show/${show.id}`} style={{ color: 'blue' }}>📄 View Details</a>
            </div>

            {/* Comments Section */}
            <div style={{ marginTop: '15px' }}>
              <Comments showId={show.id} />
            </div>
          </div>
        ))}
      </div>

      {/* Share Button */}
      <div>
        <button
          onClick={() => {
            const uid = localStorage.getItem('uid');
            const shareLink = `${window.location.origin}/shared/${uid}`;
            navigator.clipboard.writeText(shareLink);
            alert('🔗 Shareable link copied to clipboard!');
          }}
          className="share-btn"
        >
          📤 Share My Watchlist
        </button>
      </div>
    </div>
  );
}
