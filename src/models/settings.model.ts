import mongoose from "mongoose"
export type Settings = {
    title: string,
    smtp: {
        host: string,
        port: number,
        secure: boolean
    },
    payment: {
        active: 'paytr',
        paytr: {
            merchantId: string
        }
    },
    kdv: number
}

const settingsSchema = new mongoose.Schema<Settings>({
    title: { type: String, required: true },
    smtp: {
        host: { type: String, required: true },
        port: { type: Number, required: true },
        secure: { type: Boolean, required: true }
    },
    payment: {
        active: { type: String, enum: ['paytr'], required: true },
        paytr: {
            merchantId: { type: String, required: true }
        }
    },
    kdv: { type: Number, required: true, default: 0 }
});

const SettingsModel = mongoose.models.Settings || mongoose.model<Settings>('Settings', settingsSchema);
export default SettingsModel;