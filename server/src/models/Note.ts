import { Schema, model, models, InferSchemaType, Types } from "mongoose";

const noteSchema = new Schema(
    {
        user: { type: Schema.Types.ObjectId, ref: "User", required: true },
        title: { type: String, required: true, trim: true },
        content: { type: String, default: "" },
    },
    { timestamps: true }
);

export type Note = InferSchemaType<typeof noteSchema> & { user: Types.ObjectId };

export const NoteModel = models.Note || model("Note", noteSchema);


