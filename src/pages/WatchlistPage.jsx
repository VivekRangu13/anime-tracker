import React, { useEffect, useState } from 'react';
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

  const addShow = () => {
    if (!title.trim()) {
      alert("Please enter a show title.");
      return;
    }

    const newShow = {
      id: Date.now().toString(),
      title,
      status,
      episodesWatched: 0,
      totalEpisodes: 12,
      reminder: '',
      genre,
      language,
      year
    };

    setShows(prev => [...prev, newShow]);
    setTitle('');
    setGenre('');
    setLanguage('');
    setYear('');
  };

  const deleteShow = (id) => {
    setShows(prev => prev.filter(show => show.id !== id));
  };

  const updateProgress = (id, episodes) => {
    if (episodes < 0) return;

    setShows(prev =>
      prev.map(show =>
        show.id === id ? { ...show, episodesWatched: episodes } : show
      )
    );
  };

  const updateReminder = (id, reminderValue) => {
    setShows(prev =>
      prev.map(show =>
        show.id === id ? { ...show, reminder: reminderValue } : show
      )
    );
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

            <div style={{ marginTop: '10px' }}>
              <label>Reminder (YYYY-MM-DD HH:MM): </label>
              <input
                type="datetime-local"
                value={show.reminder || ''}
                onChange={e => updateReminder(show.id, e.target.value)}
              />
            </div>

            {/* Comments Section (optional demo) */}
            <div style={{ marginTop: '15px' }}>
              <Comments showId={show.id} />
            </div>
          </div>
        ))}
      </div>

      {/* Share Button (for demo only) */}
      <div>
        <button
          onClick={() => {
            alert('🔗 This is a demo version. No real share link created.');
          }}
          className="share-btn"
        >
          📤 Share My Watchlist
        </button>
      </div>
    </div>
  );
}
