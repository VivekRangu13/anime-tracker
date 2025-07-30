import React, { useState } from "react";

const initialAnimeClubs = [
  { id: 1, name: "Naruto Fans", description: "For fans of Naruto series", likes: 0, joined: false },
  { id: 2, name: "One Piece Explorers", description: "Join the adventure with One Piece!", likes: 0, joined: false },
  { id: 3, name: "Attack on Titan Squad", description: "Discuss the latest AoT episodes and theories.", likes: 0, joined: false },
  { id: 4, name: "My Hero Academia Heroes", description: "Talk about heroes and quirks.", likes: 0, joined: false },
];

export default function AnimeClubs() {
  const [clubs, setClubs] = useState(initialAnimeClubs);

  // Toggle join status for a club
  const toggleJoin = (id) => {
    setClubs((prevClubs) =>
      prevClubs.map((club) =>
        club.id === id ? { ...club, joined: !club.joined } : club
      )
    );
  };

  // Increase like count for a club
  const likeClub = (id) => {
    setClubs((prevClubs) =>
      prevClubs.map((club) =>
        club.id === id ? { ...club, likes: club.likes + 1 } : club
      )
    );
  };

  // Share club (simple alert for demo)
  const shareClub = (name) => {
    alert(`Share this club with friends: "${name}"`);
  };

  return (
    <div>
      <h2>Anime Clubs</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {clubs.map((club) => (
          <li
            key={club.id}
            style={{
              border: "1px solid #ccc",
              padding: "12px",
              marginBottom: "10px",
              borderRadius: "6px",
              backgroundColor: club.joined ? "#e0ffe0" : "white",
            }}
          >
            <h3>{club.name}</h3>
            <p>{club.description}</p>
            <p>Likes: {club.likes}</p>
            <button onClick={() => toggleJoin(club.id)}>
              {club.joined ? "Leave Club" : "Join Club"}
            </button>{" "}
            <button onClick={() => likeClub(club.id)}>Like Club</button>{" "}
            <button onClick={() => shareClub(club.name)}>Share Club</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
