import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  googleId: string;
  displayName: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserResponse {
  id: string;
  displayName: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    googleId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      index: true,
      lowercase: true,
      trim: true,
    },
    displayName: {
      type: String,
      trim: true,
      maxlength: [100, 'Display name cannot be more than 100 characters'],
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        const response: Partial<IUserResponse> = {};

        response.id = ret._id?.toString();
        response.email = ret.email;
        response.displayName = ret.displayName;
        response.createdAt = ret.createdAt;
        response.updatedAt = ret.updatedAt;

        delete ret._id;
        delete ret.__v;
        delete ret.googleId;

        const finalResponse: IUserResponse = {
          id: doc._id as string,
          email: doc.email,
          displayName: doc.displayName,
          createdAt: doc.createdAt,
          updatedAt: doc.updatedAt,
        };

        return finalResponse;
      },
    },
  },
);

const User = mongoose.model<IUser>('User', userSchema);

export default User;
