import mongoose, { Schema, Document } from "mongoose";

interface TwoFADocument extends Document {
  two_fa: string;
  user_id: Schema.Types.ObjectId;
  status: boolean;
}

const TwoFASchema = new Schema(
  {
    two_fa: {
      type: String,
      require: true,
    },
    user_id: { type: Schema.Types.ObjectId, ref: "user", required: true },
    status: {
      type: Boolean,
      require: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.__v;
        delete ret.created_at;
        delete ret.updated_at;
      },
    },
  }
);

const TwoFA = mongoose.model<TwoFADocument>("two_fa", TwoFASchema);
export { TwoFA };
