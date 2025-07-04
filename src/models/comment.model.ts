import mongoose, { Schema } from "mongoose";

export type CommentType = {
    author: string;
    text: string;
    createdAt?: Date;
}

// schema
const commentSchema = new Schema<CommentType>({
    author: { type: String, required: true },
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

// export
export default mongoose.models.Comment || mongoose.model<CommentType>('Comment', commentSchema);