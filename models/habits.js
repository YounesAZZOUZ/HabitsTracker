import mongoose from "mongoose";

const HabitSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // store which user owns the habit
  title: { type: String, required: true },
  frequency: { type: String, required: true },
  time: { type: String },
});


const Habit = mongoose.models.Habit || mongoose.model("Habit", HabitSchema);
export default Habit;
