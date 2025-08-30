import mongosee, { ObjectId } from "mongoose"

export type UserLoginLogType = {
    _id?: ObjectId;
    userId: ObjectId;
    loginTime: Date;
    ipAddress: string;
    city: string;
    device: string;
    status: string;
}

export const UserLoginLog = new mongosee.Schema<UserLoginLogType>({
    userId: { type: mongosee.Types.ObjectId, ref: 'User', required: true },
    loginTime: { type: Date, required: true },
    ipAddress: { type: String, required: true },
    city: { type: String, required: true },
    device: { type: String, required: true },
    status: { type: String, required: true },
});

export default mongosee.models.UserLoginLog || mongosee.model<UserLoginLogType>('UserLoginLog', UserLoginLog);
