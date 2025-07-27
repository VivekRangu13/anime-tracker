// src/pages/Clubs.jsx
import React, { useEffect, useState } from 'react';
import { db, auth } from '../firebase';
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  arrayUnion,
  onSnapshot,
  addDoc,
  query,
  where
} from 'firebase/firestore';

export default function Clubs() {
  const [clubs, setClubs] = useState([]);
  const [selectedClub, setSelectedClub] = useState(null);
  const [posts, setPosts] = useState([]);
  const [message, setMessage] = useState('');
  const [isSpoiler, setIsSpoiler] = useState(false);
  const user = auth.currentUser;

  // Load all clubs
  useEffect(() => {
    const fetchClubs = async () => {
      const snapshot = await getDocs(collection(db, 'clubs'));
      setClubs(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchClubs();
  }, []);

  // Join club
  const joinClub = async (clubId) => {
    const clubRef = doc(db, 'clubs', clubId);
    await updateDoc(clubRef, {
      members: arrayUnion(user.uid)
    });
    setSelectedClub(clubId);
  };

  // Load posts for selected club
  useEffect(() => {
    if (!selectedClub) return;
    const q = query(collection(db, 'clubs', selectedClub, 'posts'));
    const unsub = onSnapshot(q, (snapshot) => {
      setPosts(snapshot.docs.map(doc => doc.data()));
    });
    return () => unsub();
  }, [selectedClub]);

  // Add post with spoiler option
  const sendPost = async () => {
    if (!message) return;
    const postsRef = collection(db, 'clubs', selectedClub, 'posts');
    await addDoc(postsRef, {
      message,
      isSpoiler,
      uid: user.uid,
      timestamp: new Date()
    });
    setMessage('');
    setIsSpoiler(false);
  };

  return (
    <div className="clubs-page">
      <h2>Anime Clubs</h2>

      <div className="club-list">
        {clubs.map(club => (
          <div key={club.id} className="club-box">
            <h3>{club.name}</h3>
            <button onClick={() => joinClub(club.id)}>Join</button>
          </div>
        ))}
      </div>

      {selectedClub && (
        <div className="club-chat">
          <h3>Club Chat</h3>
          <div className="messages">
            {posts.map((post, idx) => (
              <div key={idx}>
                <strong>{post.uid}</strong>:
                {post.isSpoiler ? (
                  <details>
                    <summary>⚠️ Spoiler — Click to Reveal</summary>
                    <p>{post.message}</p>
                  </details>
                ) : (
                  <p>{post.message}</p>
                )}
              </div>
            ))}
          </div>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message"
          />
          <label>
            <input
              type="checkbox"
              checked={isSpoiler}
              onChange={() => setIsSpoiler(!isSpoiler)}
            />
            Mark as Spoiler
          </label>
          <button onClick={sendPost}>Send</button>
        </div>
      )}
    </div>
  );
}
