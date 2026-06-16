import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IWorkout extends Document {
  user: Types.ObjectId;
  name: string;
  exercises: { name: string; sets?: number; reps?: number; durationSeconds?: number }[];
  date: Date;
}

const WorkoutSchema: Schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  exercises: [
    {
      name: String,
      sets: Number,
      reps: Number,
      durationSeconds: Number,
    },
  ],
  date: { type: Date, default: () => new Date() },
});

const Workout = mongoose.model<IWorkout>('Workout', WorkoutSchema);
export default Workout;
