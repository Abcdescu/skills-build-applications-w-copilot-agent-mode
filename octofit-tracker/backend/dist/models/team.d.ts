import mongoose, { Document, Types } from 'mongoose';
export interface ITeam extends Document {
    name: string;
    members: Types.ObjectId[];
    createdAt: Date;
}
declare const Team: mongoose.Model<ITeam, {}, {}, {}, mongoose.Document<unknown, {}, ITeam, {}, mongoose.DefaultSchemaOptions> & ITeam & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, ITeam>;
export default Team;
//# sourceMappingURL=team.d.ts.map