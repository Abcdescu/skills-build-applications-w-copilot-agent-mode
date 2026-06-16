import mongoose, { Document, Types } from 'mongoose';
export interface ILeaderboard extends Document {
    entityType: 'user' | 'team';
    entity: Types.ObjectId;
    score: number;
    period?: string;
    date: Date;
}
declare const Leaderboard: mongoose.Model<ILeaderboard, {}, {}, {}, mongoose.Document<unknown, {}, ILeaderboard, {}, mongoose.DefaultSchemaOptions> & ILeaderboard & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, ILeaderboard>;
export default Leaderboard;
//# sourceMappingURL=leaderboard.d.ts.map