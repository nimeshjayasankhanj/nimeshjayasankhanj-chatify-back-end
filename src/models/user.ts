import mongoose, { Schema, Document } from "mongoose";

interface UserDocument extends Document {
  full_name: string;
  phone_number: string;
  email: string;
  password: string;
  user_type: number;
}

const UserSchema = new Schema(
  {
    full_name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    phone_number: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    user_type: {
      type: Number,
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

const User = mongoose.model<UserDocument>("user", UserSchema);
export { User };
