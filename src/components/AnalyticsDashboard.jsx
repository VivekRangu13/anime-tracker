const AnalyticsDashboard = ({ data }) => {
  const totalWatched = data.reduce((acc, anime) => acc + anime.episodesWatched, 0);
  const totalTime = totalWatched * 24; // assuming 24 min per episode

  return (
    <div className="p-4 bg-white rounded shadow mt-2">
      <h2 className="text-lg font-bold mb-2">📊 Your Watch Stats</h2>
      <p>Total Episodes Watched: {totalWatched}</p>
      <p>Total Time Spent: {totalTime} minutes (~{Math.floor(totalTime / 60)} hours)</p>
    </div>
  );
};

export default AnalyticsDashboard;
