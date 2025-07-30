// src/utils/seedPolls.js
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';

export const seedPollsForAdmin = async (adminUID) => {
  const questions = [
    "Best opening theme?",
    "Favorite anime genre?",
    "Who is the strongest character?",
    "Best fight scene?",
    "Favorite anime couple?",
    "Best anime of 2024?",
    "Who deserves a spin-off?",
    "Most emotional death?",
    "Most hated villain?",
    "Best animation studio?"
  ];

  for (let i = 0; i < 10; i++) {
    await addDoc(collection(db, "polls"), {
      question: questions[i],
      createdBy: adminUID,
      createdAt: new Date(),
      options: [
        { text: "Naruto", votes: [] },
        { text: "Luffy", votes: [] },
        { text: "Goku", votes: [] }
      ]
    });
  }

  alert("✅ 10 polls seeded successfully!");
};
