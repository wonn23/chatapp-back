import mongoose, { Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  token: string;
  online: boolean;
}

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  token: {
    type: String,
  },
  online: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model<IUser>('User', userSchema);
