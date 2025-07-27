import React, { useEffect, useState } from 'react';
import {
  collectionGroup,
  deleteDoc,
  doc,
  getDocs
} from 'firebase/firestore';
import { db } from '../firebase';

export default function AdminPanel() {
  const [allWatchlists, setAllWatchlists] = useState([]);
  const [allPolls, setAllPolls] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const watchlistSnap = await getDocs(collectionGroup(db, 'watchlist'));
      setAllWatchlists(watchlistSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));

      const pollsSnap = await getDocs(collectionGroup(db, 'polls'));
      setAllPolls(pollsSnap.docs.map(doc => ({ id: doc.id, ref: doc.ref, ...doc.data() })));
    };
    fetchData();
  }, []);

  const deletePoll = async (pollRef) => {
    await deleteDoc(pollRef);
    alert('🗑️ Poll deleted');
    setAllPolls(prev => prev.filter(p => p.ref !== pollRef));
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>🛡️ Admin Panel</h2>

      <h3>📋 All Watchlist Shows</h3>
      {allWatchlists.map((show, idx) => (
        <div key={idx} style={{ marginBottom: '10px', border: '1px solid #ccc', padding: '8px' }}>
          <strong>{show.title}</strong> | Status: {show.status} | Genre: {show.genre}
        </div>
      ))}

      <h3 style={{ marginTop: '30px' }}>📊 Club Polls</h3>
      {allPolls.map((poll, idx) => (
        <div key={idx} style={{ marginBottom: '10px', border: '1px solid #aaa', padding: '10px' }}>
          <strong>Q: {poll.question}</strong><br />
          Options: {poll.options.join(', ')}
          <div>
            <button onClick={() => deletePoll(poll.ref)} style={{ color: 'red' }}>Delete Poll</button>
          </div>
        </div>
      ))}
    </div>
  );
}
