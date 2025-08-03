import mongoose from "mongoose"
export type Settings = {
    title: string,
    smtp: {
        host: string,
        port: number,
        secure: boolean,
        auth: {
            user: string,
            pass: string
        }
    },
    payment: {
        active: 'paytr',
        paytr: {
            merchantId: string,
            merchantKey: string
        }
    },
    discord: {
        botToken: string,
        clientId: string
        secret: string
    },
    translator: {
        deepL: string
    }
}

const settingsSchema = new mongoose.Schema<Settings>({
    title: { type: String, required: true },
    smtp: {
        host: { type: String, required: true },
        port: { type: Number, required: true },
        secure: { type: Boolean, required: true },
        auth: {
            user: { type: String, required: true },
            pass: { type: String, required: true }
        }
    },
    payment: {
        active: { type: String, required: true },
        paytr: {
            merchantId: { type: String, required: true },
            merchantKey: { type: String, required: true }
        }
    },
    discord: {
        botToken: { type: String, required: true },
        clientId: { type: String, required: true },
        secret: { type: String, required: true }
    },
    translator: {
        deepL: { type: String, required: true }
    }
});

const SettingsModel = mongoose.models.Settings || mongoose.model<Settings>('Settings', settingsSchema);
export default SettingsModel;