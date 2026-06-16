import mongoose, { Document, Types } from 'mongoose';
export interface IWorkout extends Document {
    user: Types.ObjectId;
    name: string;
    exercises: {
        name: string;
        sets?: number;
        reps?: number;
        durationSeconds?: number;
    }[];
    date: Date;
}
declare const Workout: mongoose.Model<IWorkout, {}, {}, {}, mongoose.Document<unknown, {}, IWorkout, {}, mongoose.DefaultSchemaOptions> & IWorkout & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IWorkout>;
export default Workout;
//# sourceMappingURL=workout.d.ts.map