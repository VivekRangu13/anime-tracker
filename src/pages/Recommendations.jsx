import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { auth, db } from '../firebase';

export default function Recommendations() {
  const [topCategory, setTopCategory] = useState('');
  const [recommendations, setRecommendations] = useState([]);

  // 1. Find most watched category
  useEffect(() => {
    const fetchCategoryAndRecommend = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const q = query(collection(db, 'watchlist'), where('uid', '==', user.uid));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => doc.data());

      const freq = {};
      data.forEach((anime) => {
        const cat = anime.category || 'Unknown';
        freq[cat] = (freq[cat] || 0) + 1;
      });

      const top = Object.keys(freq).sort((a, b) => freq[b] - freq[a])[0];
      setTopCategory(top);

      // 2. Fetch recommended anime using Jikan API
      const res = await fetch(`https://api.jikan.moe/v4/anime?genres=${top}`);
      const json = await res.json();
      setRecommendations(json.data.slice(0, 10)); // Top 10
    };

    fetchCategoryAndRecommend();
  }, []);

  return (
    <div className="recommendations">
      <h2>Recommended for You</h2>
      <p>Based on your favorite category: <strong>{topCategory}</strong></p>

      <div className="anime-grid">
        {recommendations.map(anime => (
          <div key={anime.mal_id} className="anime-card">
            <img src={anime.images.jpg.image_url} alt={anime.title} width="100%" />
            <h3>{anime.title}</h3>
            <p>Episodes: {anime.episodes}</p>
            <a href={anime.url} target="_blank" rel="noopener noreferrer">
              View on MAL →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
