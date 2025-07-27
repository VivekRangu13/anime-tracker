// src/pages/AnimeList.jsx
import React, { useState } from 'react';
import { auth, db } from '../firebase';
import {
  addDoc,
  collection,
  query,
  where,
  getDocs
} from 'firebase/firestore';

const AnimeList = () => {
  const [queryText, setQueryText] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const user = auth.currentUser;

  const searchAnime = async () => {
    if (!queryText.trim()) return;
    setLoading(true);

    try {
      const res = await fetch(`https://api.jikan.moe/v4/anime?q=${queryText}&limit=10`);
      const data = await res.json();
      setResults(data.data);
    } catch (error) {
      alert('Error fetching anime!');
    }

    setLoading(false);
  };

  const addToWatchlist = async (anime) => {
    if (!user) {
      alert("Please login first.");
      return;
    }

    const watchlistRef = collection(db, 'watchlist');

    const q = query(watchlistRef,
      where('uid', '==', user.uid),
      where('title', '==', anime.title)
    );
    const existing = await getDocs(q);
    if (!existing.empty) {
      alert("Already in your watchlist!");
      return;
    }

    await addDoc(watchlistRef, {
      uid: user.uid,
      title: anime.title,
      category: 'Plan to Watch',
      episodesWatched: 0,
      totalEpisodes: anime.episodes || 0,
      imageUrl: anime.images.jpg.image_url,
      streamLink: anime.url 
    });

    alert("Added to watchlist!");
  };

  return (
    <main>
      <h2>Search Anime</h2>

      <div className="search-section">
        <input
          type="text"
          placeholder="Enter anime name..."
          value={queryText}
          onChange={(e) => setQueryText(e.target.value)}
        />
        <button onClick={searchAnime}>Search</button>
      </div>

      {loading && <p>Loading...</p>}

      <div className="anime-grid">
        {results.map((anime) => (
          <div key={anime.mal_id} className="anime-card">
            <img src={anime.images.jpg.image_url} alt={anime.title} width={150} />
            <h3>{anime.title}</h3>
            <p>Episodes: {anime.episodes || 'N/A'}</p>
            <p>Score: {anime.score || 'N/A'}</p>
            <a href={anime.url} target="_blank" rel="noreferrer">View on MyAnimeList</a>
            <br />
            <button onClick={() => addToWatchlist(anime)}>➕ Add to Watchlist</button>
          </div>
        ))}
      </div>
    </main>
  );
};

export default AnimeList;
