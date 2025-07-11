'use client';

import { useEffect, useState } from 'react';

export default function HabitsPage() {
  const [habits, setHabits] = useState([]);
  const [checkedHabits, setCheckedHabits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHabits = async () => {
      try {
        const res = await fetch("/api/habits");
        const data = await res.json();
        setHabits(Array.isArray(data.habits) ? data.habits : []);
      } catch (err) {
        console.error("Error fetching habits:", err);
        setHabits([]);
      } finally {
        setLoading(false);
      }
    };

    fetchHabits();
  }, []);

  const toggleCheck = (id) => {
    setCheckedHabits((prev) =>
      prev.includes(id) ? prev.filter((h) => h !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-2xl font-bold text-center mb-6">Your Habits</h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading habits...</p>
      ) : habits.length === 0 ? (
        <p className="text-center text-gray-500">No habits found.</p>
      ) : (
        <div className="max-w-xl mx-auto space-y-4">
          {habits.map((habit) => (
            <label
              key={habit._id}
              className={`flex items-center p-4 border rounded-md bg-white shadow transition cursor-pointer ${
                checkedHabits.includes(habit._id)
                  ? 'border-dashed border-2 border-blue-500 bg-blue-50'
                  : ''
              }`}
            >
              <input
                type="checkbox"
                checked={checkedHabits.includes(habit._id)}
                onChange={() => toggleCheck(habit._id)}
                className="mr-4 h-5 w-5 accent-blue-500"
              />
              <span className="text-gray-800 font-medium">{habit.title}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
