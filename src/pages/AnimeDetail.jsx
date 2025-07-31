
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const AnimeDetail = () => {
  const { id } = useParams();
  const [anime, setAnime] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnime = async () => {
      try {
        const res = await fetch(`https://api.jikan.moe/v4/anime/${id}`);
        const data = await res.json();
        setAnime(data.data);
      } catch (err) {
        console.error("Failed to fetch anime details", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnime();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!anime) return <p>Anime not found.</p>;

  return (
    <div style={{ padding: "2rem", maxWidth: "800px", margin: "auto" }}>
      <h1>{anime.title}</h1>
      <img
        src={anime.images.jpg.large_image_url}
        alt={anime.title}
        style={{ width: "100%", borderRadius: "10px", marginBottom: "1rem" }}
      />
      <p><strong>Episodes:</strong> {anime.episodes}</p>
      <p><strong>Score:</strong> {anime.score}</p>
      <p><strong>Status:</strong> {anime.status}</p>
      <p><strong>Genres:</strong> {anime.genres.map(g => g.name).join(", ")}</p>
      <p><strong>Synopsis:</strong> {anime.synopsis}</p>
    </div>
  );
};

export default AnimeDetail;
