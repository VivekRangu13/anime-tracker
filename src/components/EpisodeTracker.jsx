import { useState } from "react";

const EpisodeTracker = ({ anime }) => {
  const [watched, setWatched] = useState(0);

  const handleChange = (e) => {
    const value = Number(e.target.value);
    if (value <= anime.totalEpisodes) setWatched(value);
  };

  return (
    <div className="p-2 bg-white rounded shadow mb-2">
      <h3 className="text-lg font-semibold">{anime.title}</h3>
      <p>Total Episodes: {anime.totalEpisodes}</p>
      <input
        type="number"
        value={watched}
        onChange={handleChange}
        className="border p-1 mt-1 w-full"
        placeholder="Episodes watched"
        min={0}
        max={anime.totalEpisodes}
      />
      <p className="text-sm mt-1">Progress: {watched}/{anime.totalEpisodes}</p>
    </div>
  );
};

export default EpisodeTracker;
