import { useState } from "react";

const Reminder = ({ title }) => {
  const [time, setTime] = useState("");

  const handleSetReminder = () => {
    const reminderTime = new Date(time).getTime();
    const now = new Date().getTime();
    const delay = reminderTime - now;

    if (delay > 0) {
      setTimeout(() => {
        alert(`⏰ Reminder: Time to watch ${title}!`);
      }, delay);
      alert("Reminder set!");
    } else {
      alert("Please select a future time.");
    }
  };

  return (
    <div className="p-2 bg-white rounded shadow">
      <label className="block mb-1">Set Reminder for: {title}</label>
      <input
        type="datetime-local"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        className="border p-1 w-full mb-2"
      />
      <button
        onClick={handleSetReminder}
        className="bg-blue-500 text-white px-3 py-1 rounded"
      >
        Set Reminder
      </button>
    </div>
  );
};

export default Reminder;
