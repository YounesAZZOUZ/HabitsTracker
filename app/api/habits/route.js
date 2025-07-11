import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import connect_db from '@/lib/mongodb';
import Habit from '@/models/habits';

export async function POST(req) {
  const { userId } = auth(); // ✅ Get current user ID
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await connect_db();
    const { title, frequency, time } = await req.json();

    const habit = await Habit.create({
      title,
      frequency,
      time,
      userId, // ✅ Save the habit for this user
    });

    return NextResponse.json({ message: 'Created', habit });
  } catch (error) {
    console.error('Error creating habit:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function GET() {
  const { userId } = auth(); // ✅ Ensure only their own habits show
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await connect_db();
    const habits = await Habit.find({ userId }); // ✅ Only user's habits
    return NextResponse.json({ habits });
  } catch (error) {
    console.error('Error fetching habits:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
