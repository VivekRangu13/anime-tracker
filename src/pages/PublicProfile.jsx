// src/pages/PublicProfile.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';

export default function PublicProfile() {
  const { uid } = useParams();
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWatchlist = async () => {
      const q = query(collection(db, 'watchlist'), where('uid', '==', uid));
      const snapshot = await getDocs(q);
      setWatchlist(snapshot.docs.map(doc => doc.data()));
      setLoading(false);
    };

    fetchWatchlist();
  }, [uid]);

  return (
    <div>
      <h2>📺 Public Watchlist</h2>
      {loading ? <p>Loading...</p> : (
        <div className="anime-grid">
          {watchlist.map((anime, index) => (
            <div className="anime-card" key={index}>
              <img src={anime.imageUrl} alt={anime.title} width={150} />
              <h3>{anime.title}</h3>
              <p>Episodes Watched: {anime.episodesWatched}/{anime.totalEpisodes}</p>
              {anime.streamLink && (
                <a href={anime.streamLink} target="_blank" rel="noreferrer">
                  ▶️ Watch Now
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
