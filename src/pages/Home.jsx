import React from 'react';

const recommendations = [
  {
    title: 'Attack on Titan',
    source: 'Shonen Club',
    genre: 'Action',
  },
  {
    title: 'Your Name',
    source: 'Romance Club',
    genre: 'Romance',
  },
  {
    title: 'Death Note',
    source: 'Thriller Club',
    genre: 'Mystery',
  },
];

const Home = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h2>🔥 Recommended Anime</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {recommendations.map((anime, index) => (
          <li
            key={index}
            style={{
              marginBottom: '12px',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '8px',
              backgroundColor: '#f9f9f9',
            }}
          >
            <strong>{anime.title}</strong> <br />
            <span>📺 Source: {anime.source}</span> <br />
            <span>🎭 Genre: {anime.genre}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
