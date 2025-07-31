import React, { useState } from "react";

const sampleRecommendations = [
  {
    mal_id: 1,
    title: "Demon Slayer: Kimetsu no Yaiba",
    episodes: 26,
    genre: "Action",
    image_url:
      "https://cdn.myanimelist.net/images/anime/1286/99889.jpg",
    url: "https://myanimelist.net/anime/38000/Kimetsu_no_Yaiba",
  },
  {
    mal_id: 2,
    title: "Jujutsu Kaisen",
    episodes: 24,
    genre: "Supernatural",
    image_url:
      "https://cdn.myanimelist.net/images/anime/1171/109222.jpg",
    url: "https://myanimelist.net/anime/40748/Jujutsu_Kaisen",
  },
  {
    mal_id: 3,
    title: "Attack on Titan",
    episodes: 75,
    genre: "Action",
    image_url:
      "https://cdn.myanimelist.net/images/anime/10/47347.jpg",
    url: "https://myanimelist.net/anime/16498/Shingeki_no_Kyojin",
  },
  {
    mal_id: 4,
    title: "My Hero Academia",
    episodes: 88,
    genre: "Superhero",
    image_url:
      "https://cdn.myanimelist.net/images/anime/10/78745.jpg",
    url: "https://myanimelist.net/anime/31964/Boku_no_Hero_Academia",
  },
  {
    mal_id: 5,
    title: "One Piece",
    episodes: 1000,
    genre: "Adventure",
    image_url:
      "https://cdn.myanimelist.net/images/anime/6/73245.jpg",
    url: "https://myanimelist.net/anime/21/One_Piece",
  },
  {
    mal_id: 6,
    title: "Spy x Family",
    episodes: 12,
    genre: "Comedy",
    image_url:
      "https://cdn.myanimelist.net/images/anime/1576/109222.jpg",
    url: "https://myanimelist.net/anime/50265/Spy_x_Family",
  },
];

export default function Recommendations() {
  const [likedIds, setLikedIds] = useState([]);
  const [watchlistIds, setWatchlistIds] = useState([]);

  const toggleLike = (id) => {
    setLikedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const toggleWatchlist = (id) => {
    setWatchlistIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const shareAnime = (title) => {
    alert(`Share this anime with friends: "${title}"`);
  };

  return (
    <div style={{ maxWidth: 1000, margin: "auto", padding: 20 }}>
      <h2 style={{ textAlign: "center", marginBottom: 20 }}>
        Recommended Anime For You
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
          gap: 20,
        }}
      >
        {sampleRecommendations.map((anime) => (
          <div
            key={anime.mal_id}
            style={{
              borderRadius: 12,
              overflow: "hidden",
              boxShadow:
                "0 8px 16px rgba(0,0,0,0.15), 0 6px 8px rgba(0,0,0,0.1)",
              backgroundColor: "#fff",
              display: "flex",
              flexDirection: "column",
              transition: "transform 0.2s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <img
              src={anime.image_url}
              alt={anime.title}
              style={{ width: "100%", height: 300, objectFit: "cover" }}
            />
            <div style={{ padding: 15, flexGrow: 1 }}>
              <h3 style={{ margin: "0 0 10px" }}>{anime.title}</h3>
              <p style={{ margin: "0 0 10px", color: "#555" }}>
                Episodes: {anime.episodes}
              </p>
              <p style={{ margin: "0 0 15px", fontStyle: "italic", color: "#888" }}>
                Genre: {anime.genre}
              </p>

              <div style={{ marginTop: "auto" }}>
                <button
                  onClick={() => toggleWatchlist(anime.mal_id)}
                  style={{
                    backgroundColor: watchlistIds.includes(anime.mal_id)
                      ? "#4caf50"
                      : "#ccc",
                    border: "none",
                    padding: "8px 12px",
                    borderRadius: 6,
                    cursor: "pointer",
                    marginRight: 10,
                    color: "white",
                  }}
                >
                  {watchlistIds.includes(anime.mal_id)
                    ? "In Watchlist"
                    : "Add to Watchlist"}
                </button>

                <button
                  onClick={() => toggleLike(anime.mal_id)}
                  style={{
                    backgroundColor: likedIds.includes(anime.mal_id)
                      ? "#e91e63"
                      : "#ccc",
                    border: "none",
                    padding: "8px 12px",
                    borderRadius: 6,
                    cursor: "pointer",
                    marginRight: 10,
                    color: "white",
                  }}
                >
                  {likedIds.includes(anime.mal_id) ? "Liked ❤️" : "Like"}
                </button>

                <button
                  onClick={() => shareAnime(anime.title)}
                  style={{
                    backgroundColor: "#2196f3",
                    border: "none",
                    padding: "8px 12px",
                    borderRadius: 6,
                    cursor: "pointer",
                    color: "white",
                  }}
                >
                  Share
                </button>
              </div>
            </div>

            <a
              href={anime.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: "12px",
                backgroundColor: "#f5f5f5",
                textAlign: "center",
                textDecoration: "none",
                color: "#333",
                fontWeight: "bold",
                borderTop: "1px solid #ddd",
              }}
            >
              View on MAL →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
} 