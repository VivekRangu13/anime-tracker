import axios from "axios";

const API_BASE = "http://127.0.0.1:8000";

const cleanId = (id) => id.replace(/"/g, "");

export const addAnime = (anime) =>
  axios.post(`${API_BASE}/watchlist/`, anime);

export const getPreferredGenre = async (uid) => {
  const res = await axios.get(`${API_BASE}/preferred-genre/${cleanId(uid)}`);
  return res.data.genre;
};

export const fetchWatchlist = (userId) =>
  axios.get(`${API_BASE}/watchlist/${cleanId(userId)}`);

export const getWatchlist = (userId) =>
  axios.get(`${API_BASE}/watchlist/${cleanId(userId)}`);

export const updateEpisodes = (userId, animeId, episodes) =>
  axios.put(
    `${API_BASE}/watchlist/${cleanId(userId)}/${cleanId(animeId)}/episodes?episodes=${episodes}`
  );

export const deleteAnime = (userId, animeId) =>
  axios.delete(`${API_BASE}/watchlist/${cleanId(userId)}/${cleanId(animeId)}`);

export const submitReview = (reviewData) =>
  axios.post(`${API_BASE}/reviews/`, reviewData);
