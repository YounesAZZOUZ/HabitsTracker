'use client';
import { useEffect, useState } from 'react';
import { useAuth } from "@clerk/nextjs"; // ✅ import Clerk hook
import HabitNotifier from '../Habitsnotifier/page';

export default function HabitsPage() {
  const [habits, setHabits] = useState([]);
  const [checkedHabits, setCheckedHabits] = useState(new Set());
  const { getToken } = useAuth(); // ✅ get the auth token


  useEffect(() => {
    const fetchHabits = async () => {
      try {
        const token = await getToken(); // ✅ get session token from Clerk

        const res = await fetch('/api/habits', {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ pass the token to server
          },
        });

        if (res.status === 401) {
          console.error("Unauthorized: User is not signed in.");
          return;
        }

        const data = await res.json();
        setHabits(data.habits || []);
      } catch (err) {
        console.error('Failed to load habits:', err);
        setHabits([]);
      }
    };

    fetchHabits();
  }, [getToken]);

  const handleCheckboxChange = (habitId) => {
    setCheckedHabits(prev => {
      const newSet = new Set(prev);
      if (newSet.has(habitId)) {
        newSet.delete(habitId);
      } else {
        newSet.add(habitId);
      }
      return newSet;
    });
  };

  return (
    
    <div className="min-h-screen bg-gray-100 px-6 py-10">
      <HabitNotifier habits={habits} />
      
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">Your Habits</h1>

      {habits?.length === 0 ? (
        <p className="text-center text-gray-500">No habits yet. Add one!</p>
      ) : (
        <div className="max-w-xl mx-auto space-y-4">
          {habits.map((habit) => {
            const isChecked = checkedHabits.has(habit._id);
            return (
              <label
                key={habit._id}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg border bg-white hover:shadow cursor-pointer transition-all ${
                  isChecked 
                    ? 'border-dashed border-gray-400 bg-gray-50' 
                    : 'border-gray-200'
                }`}
              >
                <input 
                  type="checkbox" 
                  className="w-5 h-5 text-blue-600 rounded" 
                  checked={isChecked}
                  onChange={() => handleCheckboxChange(habit._id)}
                />
                <span className={`text-lg transition-all ${
                  isChecked 
                    ? 'text-gray-500 line-through' 
                    : 'text-gray-800'
                }`}>
                  {habit.title}
                </span>
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
}