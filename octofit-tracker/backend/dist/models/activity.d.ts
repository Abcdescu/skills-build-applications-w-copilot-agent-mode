import mongoose, { Document, Types } from 'mongoose';
export interface IActivity extends Document {
    user: Types.ObjectId;
    team?: Types.ObjectId;
    type: string;
    durationMinutes: number;
    distanceKm?: number;
    calories?: number;
    date: Date;
}
declare const Activity: mongoose.Model<IActivity, {}, {}, {}, mongoose.Document<unknown, {}, IActivity, {}, mongoose.DefaultSchemaOptions> & IActivity & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IActivity>;
export default Activity;
//# sourceMappingURL=activity.d.ts.map