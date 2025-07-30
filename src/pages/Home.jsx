import React, { useState, useEffect } from 'react';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const recommended = [
  {
    id: 1,
    title: "Attack on Titan",
    source: "Shonen Club",
    genre: "Action",
    image: "https://cdn.myanimelist.net/images/anime/10/47347.jpg"
  },
  {
    id: 2,
    title: "Your Name",
    source: "Romance Club",
    genre: "Romance",
    image: "https://cdn.myanimelist.net/images/anime/5/87048.jpg"
  },
  {
    id: 3,
    title: "Death Note",
    source: "Thriller Club",
    genre: "Mystery",
    image: "https://cdn.myanimelist.net/images/anime/9/9453.jpg"
  }
];

const genres = [
  '', 'Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy',
  'Horror', 'Mystery', 'Romance', 'Sci-Fi', 'Slice of Life', 'Supernatural'
];

const Home = () => {
  const [user, setUser] = useState(null);
  const [queryText, setQueryText] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsub();
  }, []);

  const searchAnime = async () => {
    if (!queryText.trim() && !selectedGenre) return;

    setLoading(true);
    try {
      const res = await fetch(`https://api.jikan.moe/v4/anime?q=${queryText}&limit=20`);
      const data = await res.json();
      const filtered = selectedGenre
        ? data.data.filter(anime =>
            anime.genres.some(g => g.name.toLowerCase() === selectedGenre.toLowerCase())
          )
        : data.data;

      setResults(filtered);
    } catch (err) {
      alert("Search failed.");
    }
    setLoading(false);
  };

  const handleAnimeClick = (id) => {
    navigate(`/anime/${id}`);
  };

  return (
    <div className="container">
      <header>
        <div>
          <h1>🎌 Welcome to Anime Tracker</h1>
          <p className="greeting">👋 Hello, {user?.displayName || "R V K"}!</p>
        </div>
        <button className="logout-btn">Logout</button>
      </header>

      <section className="recommended">
        <h2>🔥 Recommended Anime</h2>
        <div className="card-container">
          {recommended.map(anime => (
            <div
              key={anime.id}
              className="anime-card hoverable"
              onClick={() => handleAnimeClick(anime.id)}
            >
              <img src={anime.image} alt={anime.title} />
              <h3>{anime.title}</h3>
              <p>📺 Source: {anime.source}</p>
              <p>🎭 Genre: {anime.genre}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="search-section">
        <h2>🔍 Search Anime</h2>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Enter anime name..."
            value={queryText}
            onChange={(e) => setQueryText(e.target.value)}
          />
          <select
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
          >
            <option value="">🎭 Filter by Genre</option>
            {genres.map(genre => (
              <option key={genre} value={genre}>{genre}</option>
            ))}
          </select>
          <button onClick={searchAnime}>Search</button>
        </div>

        {loading ? (
          <p className="loading">Loading...</p>
        ) : (
          <div className="card-container">
            {results.map(anime => (
              <div
                key={anime.mal_id}
                className="anime-card"
                onClick={() => handleAnimeClick(anime.mal_id)}
              >
                <img src={anime.images.jpg.image_url} alt={anime.title} />
                <h3>{anime.title}</h3>
                <p>Episodes: {anime.episodes || 'N/A'}</p>
                <p>Genres: {anime.genres.map(g => g.name).join(', ')}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="stats">
        <h2>📊 Your Watch Stats</h2>
        <p>Total Episodes Watched: 0</p>
        <p>Total Time Spent: 0 minutes (~0 hours)</p>
      </section>

      <footer>
        <button className="share-btn">📤 Share My Watchlist</button>
      </footer>
    </div>
  );
};

export default Home;
