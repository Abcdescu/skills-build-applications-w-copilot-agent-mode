import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  createdAt: Date;
  teams: Types.ObjectId[];
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: () => new Date() },
  teams: [{ type: Schema.Types.ObjectId, ref: 'Team' }],
});

const User = mongoose.model<IUser>('User', UserSchema);
export default User;
