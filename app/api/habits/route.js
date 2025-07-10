import connect_db from "@/lib/mongodb";
import Habit from "@/models/habits";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getAuth } from "@clerk/nextjs/server"; // ✅ NEW

export async function POST(req) {
  try {
    const { userId } = getAuth(req); // ✅ use this

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
    const { userId } = getAuth(req); // ✅ this supports Bearer tokens from frontend

    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await connect_db();
    const habits = await Habit.find({ userId });
    return NextResponse.json({ habits });
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json({ error: "Failed to get habits" }, { status: 500 });
  }
}
