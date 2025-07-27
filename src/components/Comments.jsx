import React, { useState, useEffect } from 'react';
import {
  collection,
  addDoc,
  onSnapshot,
  serverTimestamp
} from 'firebase/firestore';
import { db, auth } from '../firebase';

export default function Comments({ showId }) {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState('');
  const [isSpoiler, setIsSpoiler] = useState(false);
  const user = auth.currentUser;

  useEffect(() => {
    const q = collection(db, 'shows', showId, 'comments');
    const unsub = onSnapshot(q, (snapshot) => {
      const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data(), reveal: false }));
      setComments(list);
    });
    return () => unsub();
  }, [showId]);

  const postComment = async () => {
    if (!text.trim()) return;

    await addDoc(collection(db, 'shows', showId, 'comments'), {
      text,
      spoiler: isSpoiler,
      userId: user.uid,
      username: user.email,
      createdAt: serverTimestamp()
    });

    setText('');
    setIsSpoiler(false);
  };

  const toggleReveal = (id) => {
    setComments(prev =>
      prev.map(c => (c.id === id ? { ...c, reveal: !c.reveal } : c))
    );
  };

  return (
    <div className="comments-section">
      <h4>💬 Comments</h4>

      {/* Input */}
      <div>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write your thoughts..."
        />
        <label style={{ marginLeft: '10px' }}>
          <input
            type="checkbox"
            checked={isSpoiler}
            onChange={() => setIsSpoiler(!isSpoiler)}
          /> Spoiler
        </label>
        <button onClick={postComment}>Post</button>
      </div>

      {/* List */}
      <ul style={{ marginTop: '10px' }}>
        {comments.map((c) => (
          <li key={c.id}>
            <strong>{c.username}:</strong>{' '}
            {c.spoiler && !c.reveal ? (
              <>
                <i style={{ color: 'gray' }}>[Spoiler Hidden]</i>{' '}
                <button onClick={() => toggleReveal(c.id)}>Show</button>
              </>
            ) : (
              <>
                {c.text}{' '}
                {c.spoiler && <button onClick={() => toggleReveal(c.id)}>Hide</button>}
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
