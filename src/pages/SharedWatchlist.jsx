import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

export default function SharedWatchlist() {
  const { uid } = useParams();
  const [shows, setShows] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'users', uid, 'watchlist'), (snapshot) => {
      const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setShows(list);
    });
    return () => unsub();
  }, [uid]);

  return (
    <div style={{ padding: '20px' }}>
      <h2>📤 Shared Watchlist</h2>
      {shows.map((show) => (
        <div key={show.id} style={{ border: '1px solid #aaa', padding: '10px', marginBottom: '10px', borderRadius: '6px' }}>
          <h3>{show.title}</h3>
          <p>Status: {show.status}</p>
          <p>Episodes: {show.episodesWatched}/{show.totalEpisodes}</p>
        </div>
      ))}
    </div>
  );
}
