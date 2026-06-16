import mongoose, { Document, Types } from 'mongoose';
export interface IUser extends Document {
    name: string;
    email: string;
    createdAt: Date;
    teams: Types.ObjectId[];
}
declare const User: mongoose.Model<IUser, {}, {}, {}, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IUser>;
export default User;
//# sourceMappingURL=user.d.ts.map