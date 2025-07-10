import connect_db from "@/lib/mongodb";
import Habit from "@/models/habits";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server"; // ✅ This is the correct one

export async function POST(req) {
  try {
    const { userId } = auth(); // ✅ Correct way in App Router

    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await connect_db();
    const { title, frequency, time } = await req.json();
    const habit = await Habit.create({ userId, title, frequency, time });

    return NextResponse.json({ message: "created success", habit });
  } catch (error) {
    console.error("POST Error:", error);
    return NextResponse.json({ error: "Failed to post habit" }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    const { userId } = auth(); // ✅ Same fix here

    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await connect_db();
    const habits = await Habit.find({ userId });
    return NextResponse.json({ habits });
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json({ error: "Failed to get habits" }, { status: 500 });
  }
}
