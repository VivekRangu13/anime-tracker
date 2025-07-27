import React, { useEffect, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db, auth } from '../firebase';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer
} from 'recharts';

export default function Dashboard() {
  const [shows, setShows] = useState([]);
  const user = auth.currentUser;

  useEffect(() => {
    if (!user) return;
    const unsub = onSnapshot(collection(db, 'users', user.uid, 'watchlist'), (snapshot) => {
      const data = snapshot.docs.map(doc => doc.data());
      setShows(data);
    });
    return () => unsub();
  }, [user]);

  const totalEpisodes = shows.reduce((acc, s) => acc + s.episodesWatched, 0);
  const totalShows = shows.length;

  const statusCount = ['Watching', 'Completed', 'On Hold', 'Dropped', 'Plan to Watch'].map(status => ({
    name: status,
    count: shows.filter(s => s.status === status).length
  }));

  const genreCount = shows.reduce((map, s) => {
    if (!s.genre) return map;
    map[s.genre] = (map[s.genre] || 0) + 1;
    return map;
  }, {});
  const topGenre = Object.entries(genreCount).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A';

  return (
    <div style={{ padding: '20px' }}>
      <h2>📊 Analytics Dashboard</h2>
      <p>Total Shows: {totalShows}</p>
      <p>Total Episodes Watched: {totalEpisodes}</p>
      <p>Most Watched Genre: {topGenre}</p>

      <h3>Status Chart</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={statusCount}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
