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

  // Fetch watchlist
  useEffect(() => {
    if (!user) return;
    localStorage.setItem('uid', user.uid);
    const unsub = onSnapshot(collection(db, 'users', user.uid, 'watchlist'), (snapshot) => {
      const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setShows(list);
    });
    return () => unsub();
  }, [user]);

  // Reminder checker
  useEffect(() => {
    const interval = setInterval(() => {
      shows.forEach((show) => {
        if (!show.reminder) return;

        const now = new Date();
        const reminderTime = new Date(show.reminder);

        if (
          Math.abs(now.getTime() - reminderTime.getTime()) < 60000
        ) {
          alert(`⏰ Reminder: Time to watch "${show.title}"`);
        }
      });
    }, 60000);
    return () => clearInterval(interval);
  }, [shows]);

  // Add show
  const addShow = async () => {
    if (!title.trim()) return;
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
  };

  const deleteShow = async (id) => {
    await deleteDoc(doc(db, 'users', user.uid, 'watchlist', id));
  };

  const updateProgress = async (id, episodes) => {
    const showRef = doc(db, 'users', user.uid, 'watchlist', id);
    await updateDoc(showRef, {
      episodesWatched: episodes
    });
  };

  return (
    <div className="watchlist-page" style={{ padding: '20px' }}>
      <h2>📺 My Watchlist</h2>

      {/* Add Show */}
      <div className="add-show-form" style={{ marginBottom: '20px' }}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter show title"
        />
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option>Watching</option>
          <option>Completed</option>
          <option>On Hold</option>
          <option>Dropped</option>
          <option>Plan to Watch</option>
        </select>
        <input
          placeholder="Genre (e.g. Action)"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        />
        <input
          placeholder="Language (e.g. Japanese)"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        />
        <input
          placeholder="Year (e.g. 2023)"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
        <button onClick={addShow}>Add</button>
      </div>

      {/* Filter Buttons */}
      <div className="filter-buttons" style={{ marginBottom: '10px' }}>
        {['All', 'Watching', 'Completed', 'On Hold', 'Dropped', 'Plan to Watch'].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            style={{
              margin: '5px',
              padding: '6px 10px',
              backgroundColor: filter === cat ? '#333' : '#ddd',
              color: filter === cat ? '#fff' : '#000',
              borderRadius: '5px',
              border: 'none'
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Tag Filters */}
      <div style={{ marginBottom: '20px' }}>
        <select value={genreFilter} onChange={(e) => setGenreFilter(e.target.value)}>
          <option value="">Filter by Genre</option>
          {[...new Set(shows.map(s => s.genre))].map(g => g && <option key={g}>{g}</option>)}
        </select>

        <select value={languageFilter} onChange={(e) => setLanguageFilter(e.target.value)}>
          <option value="">Filter by Language</option>
          {[...new Set(shows.map(s => s.language))].map(l => l && <option key={l}>{l}</option>)}
        </select>

        <select value={yearFilter} onChange={(e) => setYearFilter(e.target.value)}>
          <option value="">Filter by Year</option>
          {[...new Set(shows.map(s => s.year))].map(y => y && <option key={y}>{y}</option>)}
        </select>
      </div>

      {/* Show List */}
      <div style={{ marginTop: '20px' }}>
        {shows
          .filter(show =>
            (filter === 'All' || show.status === filter) &&
            (!genreFilter || show.genre === genreFilter) &&
            (!languageFilter || show.language === languageFilter) &&
            (!yearFilter || show.year === yearFilter)
          )
          .map(show => (
            <div key={show.id} style={{
              border: '1px solid #ccc',
              padding: '10px',
              marginBottom: '20px',
              borderRadius: '6px'
            }}>
              <h3>{show.title}</h3>
              <p>Status: {show.status}</p>
              <p>Genre: {show.genre} | Language: {show.language} | Year: {show.year}</p>
              <p>Episodes: {show.episodesWatched}/{show.totalEpisodes}</p>

              <button onClick={() => updateProgress(show.id, show.episodesWatched + 1)}>➕</button>
              <button onClick={() => updateProgress(show.id, Math.max(0, show.episodesWatched - 1))}>➖</button>
              <button onClick={() => deleteShow(show.id)} style={{ marginLeft: '10px', backgroundColor: 'red', color: 'white' }}>Delete</button>

              {/* Reminder Input */}
              <div style={{ marginTop: '10px' }}>
                <label>Reminder (YYYY-MM-DD HH:MM): </label>
                <input
                  type="datetime-local"
                  value={show.reminder || ''}
                  onChange={(e) =>
                    updateDoc(doc(db, 'users', user.uid, 'watchlist', show.id), {
                      reminder: e.target.value
                    })
                  }
                />
              </div>

              {/* View Details */}
              <div style={{ marginTop: '10px' }}>
                <a href={`/show/${show.id}`} style={{ color: 'blue' }}>📄 View Details</a>
              </div>

              {/* Comments */}
              <div style={{ marginTop: '15px' }}>
                <Comments showId={show.id} />
              </div>
            </div>
        ))}
      </div>

      {/* Share Button */}
      <div style={{ marginTop: '30px' }}>
        <button
          onClick={() => {
            const uid = localStorage.getItem('uid');
            const shareLink = `${window.location.origin}/shared/${uid}`;
            navigator.clipboard.writeText(shareLink);
            alert('🔗 Shareable link copied to clipboard!');
          }}
        >
          📤 Share My Watchlist
        </button>
      </div>
    </div>
  );
}
