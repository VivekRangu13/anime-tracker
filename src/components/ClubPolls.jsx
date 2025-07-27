import React, { useEffect, useState } from 'react';
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  onSnapshot
} from 'firebase/firestore';
import { db, auth } from '../firebase';

export default function ClubPolls({ clubId }) {
  const [polls, setPolls] = useState([]);

  const user = auth.currentUser;

  useEffect(() => {
    const q = collection(db, 'clubs', clubId, 'polls');
    const unsub = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPolls(data);
    });
    return () => unsub();
  }, [clubId]);

  const vote = async (pollId, index) => {
    const pollRef = doc(db, 'clubs', clubId, 'polls', pollId);
    const pollDoc = await getDocs(collection(db, 'clubs', clubId, 'polls'));
    const poll = pollDoc.docs.find(p => p.id === pollId).data();

    const updatedVotes = { ...poll.votes, [user.uid]: index };

    await updateDoc(pollRef, {
      votes: updatedVotes
    });
  };

  const getResults = (votes, options) => {
    const counts = Array(options.length).fill(0);
    Object.values(votes || {}).forEach(voteIndex => {
      counts[voteIndex]++;
    });
    return counts;
  };

  return (
    <div className="poll-section">
      <h3>📊 Club Polls</h3>
      {polls.map((poll) => {
        const userVote = poll.votes?.[user.uid];
        const results = getResults(poll.votes || {}, poll.options);

        return (
          <div key={poll.id} className="poll-card">
            <p><strong>{poll.question}</strong></p>
            {poll.options.map((opt, idx) => (
              <div key={idx}>
                <button
                  disabled={userVote !== undefined}
                  onClick={() => vote(poll.id, idx)}
                >
                  {opt}
                </button>
                {userVote !== undefined && (
                  <span> — {results[idx]} votes</span>
                )}
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}
