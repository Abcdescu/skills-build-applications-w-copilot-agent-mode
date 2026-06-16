import mongoose, { Schema, Document, Types } from 'mongoose';

export interface ILeaderboard extends Document {
  entityType: 'user' | 'team';
  entity: Types.ObjectId;
  score: number;
  period?: string;
  date: Date;
}

const LeaderboardSchema: Schema = new Schema({
  entityType: { type: String, enum: ['user', 'team'], required: true },
  entity: { type: Schema.Types.ObjectId, required: true },
  score: { type: Number, required: true },
  period: { type: String },
  date: { type: Date, default: () => new Date() },
});

const Leaderboard = mongoose.model<ILeaderboard>('Leaderboard', LeaderboardSchema);
export default Leaderboard;
