import { model, Schema, Types, SchemaTypes, Document } from 'mongoose';

export interface IChatRoom extends Document {
  _id: Types.ObjectId;
  title: string;
  max: number;
  owner: Types.ObjectId;
  participants: Types.ObjectId[];
  createdAt?: Date;
  isActive?: boolean;
}

const ChatRoomSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
  },
  max: {
    type: Number,
    required: true,
    default: 10,
    min: 2,
  },
  owner: {
    type: SchemaTypes.ObjectId,
    ref: 'User',
    required: true,
  },
  participants: [{ type: SchemaTypes.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true },
});

export default model<IChatRoom>('ChatRoom', ChatRoomSchema);
