import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import Comments from '../components/Comments';

export default function ShowDetails() {
  const { id } = useParams(); // show ID from URL
  const [show, setShow] = useState(null);

  useEffect(() => {
    const fetchShow = async () => {
      const docRef = doc(db, 'users', localStorage.getItem('uid'), 'watchlist', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setShow({ id, ...docSnap.data() });
      }
    };
    fetchShow();
  }, [id]);

  if (!show) return <p>Loading show...</p>;

  return (
    <div className="show-details" style={{ padding: '20px' }}>
      <h2>{show.title}</h2>
      <p>Status: {show.status}</p>
      <p>Episodes Watched: {show.episodesWatched} / {show.totalEpisodes}</p>

      {/* Dummy Streaming Link */}
      <p>
        🎥 Watch here:{" "}
        <a href="https://www.crunchyroll.com/" target="_blank" rel="noopener noreferrer">
          Open Streaming Site
        </a>
      </p>

      {/* Comments Section */}
      <div style={{ marginTop: '30px' }}>
        <Comments showId={id} />
      </div>
    </div>
  );
}
