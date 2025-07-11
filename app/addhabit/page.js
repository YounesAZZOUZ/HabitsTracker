'use client';

import { useState } from 'react';
import { useAuth } from '@clerk/nextjs';

export default function AddHabitForm() {
  const { getToken } = useAuth(); // ✅ Get the token
  const [showTime, setShowTime] = useState(false);
  const [title, setTitle] = useState('');
  const [frequency, setFrequency] = useState('');
  const [time, setTime] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = await getToken(); // ✅ Get Clerk session token

      const res = await fetch('/api/habits', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // ✅ Send token in header
        },
        body: JSON.stringify({
          title,
          frequency,
          time,
        }),
      });

      if (res.ok) {
        alert('Habit created!');
        setTitle('');
        setFrequency('');
        setTime('');
        setShowTime(false);
      } else {
        const errorText = await res.text();
        console.error('Failed to create habit:', errorText);
      }
    } catch (error) {
      console.log('Submit error:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
          Add a New Habit
        </h2>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter habit name"
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <select
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
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
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          )}

          <button
            type="submit"
            className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
          >
            Add Habit
          </button>
        </form>
      </div>
    </div>
  );
}
