import React, { useState, useEffect } from 'react';
import { auth } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import StreamingLinks from '../components/StreamingLinks';
import AnalyticsDashboard from '../components/AnalyticsDashboard';
import ShareWatchlist from '../components/ShareWatchlist';

const statusOptions = ['Watching', 'Completed', 'On Hold', 'Dropped', 'Plan to Watch'];
const genreOptions = [
  '', 'Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Horror',
  'Mystery', 'Romance', 'Sci-Fi', 'Slice of Life', 'Supernatural', 'Sports'
];

const AnimeList = () => {
  const [queryText, setQueryText] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [reminderTimes, setReminderTimes] = useState({});
  const [ratings, setRatings] = useState({});
  const [statuses, setStatuses] = useState({});
  const [watchStats, setWatchStats] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    if ("Notification" in window && Notification.permission !== "granted") {
      Notification.requestPermission();
    }

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    await signOut(auth);
  };

  const searchAnime = async () => {
    if (!queryText.trim() && !selectedGenre) return;
    setLoading(true);

    try {
      const res = await fetch(`https://api.jikan.moe/v4/anime?q=${queryText}&limit=20`);
      const data = await res.json();
      const allResults = data.data || [];

      const filteredResults = selectedGenre
        ? allResults.filter(anime =>
            anime.genres.some(g => g.name.toLowerCase() === selectedGenre.toLowerCase())
          )
        : allResults;

      setResults(filteredResults);
    } catch (error) {
      alert('Error fetching anime!');
      console.error(error);
    }

    setLoading(false);
  };

  const handleReminder = (anime) => {
    const time = reminderTimes[anime.mal_id];
    if (!time) return;

    const delay = new Date(time).getTime() - Date.now();
    if (delay > 0) {
      setTimeout(() => {
        if ("Notification" in window && Notification.permission === "granted") {
          new Notification(`📺 Time to watch ${anime.title}!`);
        } else {
          alert(`Reminder: Time to watch ${anime.title}!`);
        }
      }, delay);
      alert("⏰ Reminder scheduled!");
    } else {
      alert("⚠️ Please choose a future time.");
    }
  };

  return (
    <main className="max-w-7xl mx-auto px-4 py-8 font-sans text-gray-900">
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-extrabold text-indigo-600">🎌 Anime Tracker</h1>
        {user ? (
          <div className="flex items-center space-x-4">
            <span className="text-lg">👋 Welcome, <strong>{user.displayName || 'User'}</strong>!</span>
            <button
              onClick={logout}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition"
            >
              Logout
            </button>
          </div>
        ) : (
          <p className="text-gray-500">Please log in to access full features.</p>
        )}
      </header>

      {/* Recommended Anime (Dummy data example) */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">🔥 Recommended Anime</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { title: 'Attack on Titan', source: 'Shonen Club', genre: 'Action' },
            { title: 'Your Name', source: 'Romance Club', genre: 'Romance' },
            { title: 'Death Note', source: 'Thriller Club', genre: 'Mystery' }
          ].map((anime, i) => (
            <div
              key={i}
              className="bg-white rounded-lg shadow p-5 hover:shadow-lg transition"
            >
              <h3 className="text-xl font-bold mb-1">{anime.title}</h3>
              <p className="text-sm text-gray-600 mb-1">📺 Source: {anime.source}</p>
              <p className="text-sm text-gray-600">🎭 Genre: {anime.genre}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Search Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">🔍 Search Anime</h2>
        <div className="flex flex-col sm:flex-row gap-3 max-w-xl">
          <input
            type="text"
            placeholder="Enter anime name..."
            value={queryText}
            onChange={(e) => setQueryText(e.target.value)}
            className="border rounded px-4 py-2 flex-grow focus:outline-indigo-500"
          />
          <select
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
            className="border rounded px-4 py-2"
          >
            {genreOptions.map((genre) => (
              <option key={genre} value={genre}>
                {genre || '🎭 Filter by Genre'}
              </option>
            ))}
          </select>
          <button
            onClick={searchAnime}
            className="bg-indigo-600 text-white rounded px-5 py-2 hover:bg-indigo-700 transition"
          >
            Search
          </button>
        </div>
      </section>

      {/* Search Results */}
      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : (
        results.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">Search Results</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {results.map((anime) => (
                <article
                  key={anime.mal_id}
                  className="bg-white rounded-lg shadow hover:shadow-lg transition p-4 flex flex-col"
                >
                  <img
                    src={anime.images.jpg.image_url}
                    alt={anime.title}
                    className="rounded-md mb-4 object-cover aspect-[16/9]"
                  />
                  <h3 className="text-lg font-bold mb-1">{anime.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">
                    Episodes: {anime.episodes || 'N/A'}
                  </p>
                  <p className="text-sm text-gray-600 mb-2">
                    Genres: {anime.genres.map((g) => g.name).join(', ')}
                  </p>

                  <StreamingLinks
                    links={[
                      { platform: "MyAnimeList", url: anime.url },
                      { platform: "Crunchyroll", url: `https://www.crunchyroll.com/search?q=${anime.title}` },
                      { platform: "Netflix", url: `https://www.netflix.com/search?q=${anime.title}` }
                    ]}
                  />

                  <label className="mt-4 block text-sm font-medium text-gray-700">
                    Rating (0-10):
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="10"
                    value={ratings[anime.mal_id] || ''}
                    onChange={(e) => setRatings({ ...ratings, [anime.mal_id]: e.target.value })}
                    className="border rounded px-3 py-1 mt-1 w-full"
                  />

                  <label className="mt-4 block text-sm font-medium text-gray-700">
                    Status:
                  </label>
                  <select
                    value={statuses[anime.mal_id] || 'Plan to Watch'}
                    onChange={(e) => setStatuses({ ...statuses, [anime.mal_id]: e.target.value })}
                    className="border rounded px-3 py-1 mt-1 w-full"
                  >
                    {statusOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>

                  <label className="mt-4 block text-sm font-medium text-gray-700">
                    Reminder:
                  </label>
                  <input
                    type="datetime-local"
                    value={reminderTimes[anime.mal_id] || ''}
                    onChange={(e) => setReminderTimes({ ...reminderTimes, [anime.mal_id]: e.target.value })}
                    className="border rounded px-3 py-1 mt-1 w-full"
                  />
                  <button
                    onClick={() => handleReminder(anime)}
                    className="bg-yellow-400 hover:bg-yellow-500 transition rounded text-white py-2 mt-3 w-full"
                  >
                    🔔 Set Reminder
                  </button>
                </article>
              ))}
            </div>
          </section>
        )
      )}

      {/* Watch Stats */}
      <section className="mb-12 bg-indigo-50 p-6 rounded-lg shadow-inner max-w-md">
        <h2 className="text-2xl font-semibold mb-4">📊 Your Watch Stats</h2>
        <p className="text-lg mb-2">
          <strong>Total Episodes Watched:</strong> 0
        </p>
        <p className="text-lg">
          <strong>Total Time Spent:</strong> 0 minutes (~0 hours)
        </p>
      </section>

      {/* Share Watchlist */}
      {user && <ShareWatchlist userId={user.uid} />}
      
      {/* Analytics Dashboard */}
      <AnalyticsDashboard data={watchStats} />
    </main>
  );
};

export default AnimeList;
