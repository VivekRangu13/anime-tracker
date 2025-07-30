const ShareWatchlist = ({ userId }) => {
  const shareUrl = `https://your-app.com/user/${userId}/watchlist`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    alert("📎 Watchlist link copied to clipboard!");
  };

  return (
    <div className="p-2 bg-white rounded shadow">
      <button
        onClick={handleCopy}
        className="bg-green-500 text-white px-3 py-1 rounded"
      >
        Share My Watchlist
      </button>
      <p className="text-sm mt-1 break-all">{shareUrl}</p>
    </div>
  );
};

export default ShareWatchlist;
