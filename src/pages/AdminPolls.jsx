import React, { useState } from "react";

const initialPolls = [
  {
    id: 1,
    question: " What is your Favorite Anime ?",
    options: ["Naruto", "One Piece", "Shinchan", "SOLO"],
  },
  {
    id: 2,
    question: "Best anime of the year?",
    options: ["Solo Levelling 2", "Danadan 2", "One Piece NEW"],
  },
];

export default function Polls() {
  const [polls, setPolls] = useState(initialPolls);
  const [newQuestion, setNewQuestion] = useState("");
  const [newOptions, setNewOptions] = useState("");
  const [editId, setEditId] = useState(null);
  const [editQuestion, setEditQuestion] = useState("");
  const [editOptions, setEditOptions] = useState("");

  const handleDelete = (id) => {
    setPolls(polls.filter((poll) => poll.id !== id));
  };

  const handleAdd = () => {
    if (!newQuestion.trim()) return;
    const optionsArray = newOptions
      .split(",")
      .map((opt) => opt.trim())
      .filter((opt) => opt);
    const newPoll = {
      id: Date.now(),
      question: newQuestion.trim(),
      options: optionsArray.length ? optionsArray : ["Option 1", "Option 2"],
    };
    setPolls([...polls, newPoll]);
    setNewQuestion("");
    setNewOptions("");
  };

  const handleEdit = (poll) => {
    setEditId(poll.id);
    setEditQuestion(poll.question);
    setEditOptions(poll.options.join(", "));
  };

  const handleSave = () => {
    const optionsArray = editOptions
      .split(",")
      .map((opt) => opt.trim())
      .filter((opt) => opt);
    setPolls(
      polls.map((poll) =>
        poll.id === editId
          ? { ...poll, question: editQuestion, options: optionsArray }
          : poll
      )
    );
    setEditId(null);
    setEditQuestion("");
    setEditOptions("");
  };

  const handleCancel = () => {
    setEditId(null);
    setEditQuestion("");
    setEditOptions("");
  };

  return (
    <div style={{ maxWidth: 600, margin: "auto" }}>
      <h2>Polls</h2>

      <div style={{ marginBottom: 20 }}>
        <input
          placeholder="New poll question"
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
          style={{ marginRight: 10, width: "40%" }}
        />
        <input
          placeholder="Options (comma separated)"
          value={newOptions}
          onChange={(e) => setNewOptions(e.target.value)}
          style={{ marginRight: 10, width: "40%" }}
        />
        <button onClick={handleAdd}>Add Poll</button>
      </div>

      <ul style={{ listStyleType: "none", padding: 0 }}>
        {polls.map((poll) => (
          <li
            key={poll.id}
            style={{
              border: "1px solid #ccc",
              padding: 10,
              marginBottom: 10,
              borderRadius: 5,
            }}
          >
            {editId === poll.id ? (
              <>
                <input
                  value={editQuestion}
                  onChange={(e) => setEditQuestion(e.target.value)}
                  style={{ marginBottom: 5, width: "100%" }}
                />
                <input
                  value={editOptions}
                  onChange={(e) => setEditOptions(e.target.value)}
                  style={{ marginBottom: 5, width: "100%" }}
                />
                <button onClick={handleSave} style={{ marginRight: 5 }}>
                  Save
                </button>
                <button onClick={handleCancel}>Cancel</button>
              </>
            ) : (
              <>
                <strong>{poll.question}</strong>
                <ul>
                  {poll.options.map((opt, i) => (
                    <li key={i}>{opt}</li>
                  ))}
                </ul>
                <div style={{ marginTop: 5 }}>
                  <button onClick={() => handleEdit(poll)} style={{ marginRight: 5 }}>
                    Edit
                  </button>
                  <button onClick={() => handleDelete(poll.id)}>Delete</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
