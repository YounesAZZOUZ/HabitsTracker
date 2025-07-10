'use client';

import { useState } from "react";

export default function AddHabitForm() {
  const [showTime, setShowTime] = useState(false);
  const [title, setTitle] = useState("");
  const [frequency, setFrequency] = useState("");
  const [time, setTime] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/habits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, frequency, time }),
      });

      if (res.ok) {
        alert("Habit created successfully");
        setTitle("");
        setFrequency("");
        setTime("");
      } else {
        const error = await res.json();
        alert("Error: " + error?.error);
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
          Add a New Habit
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            value={title}
            placeholder="Enter habit name"
            onChange={(e) => setTitle(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md"
            required
          />

          <select
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md"
            required
          >
            <option value="">Select frequency</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
          </select>

          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input
              type="checkbox"
              checked={showTime}
              onChange={() => setShowTime(!showTime)}
              className="accent-blue-500"
            />
            Must be done at a specific time
          </label>

          {showTime && (
            <input
              value={time}
              onChange={(e) => setTime(e.target.value)}
              type="time"
              className="px-4 py-2 border border-gray-300 rounded-md"
            />
          )}

          <button
            type="submit"
            className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Add Habit
          </button>
        </form>
      </div>
    </div>
  );
}
