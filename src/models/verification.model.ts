import mongoose from "mongoose";
export type EmailVerificationCodeType = {
    email: string;
    code: string;
}

const emailVerificationCodeSchema = new mongoose.Schema<EmailVerificationCodeType>({
    email: { type: String, required: true },
    code: { type: String, required: true },
}, {
    timestamps: true,
});

const EmailVerificationCodeModel = mongoose.models.EmailVerificationCode || mongoose.model<EmailVerificationCodeType>("EmailVerificationCode", emailVerificationCodeSchema);
export default EmailVerificationCodeModel;

