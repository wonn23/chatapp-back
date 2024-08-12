import { model, Schema, Types, SchemaTypes, Document } from 'mongoose';

export interface IChatRoom extends Document {
  _id: Types.ObjectId;
  name: string;
  participants: Types.ObjectId[];
  createdAt?: Date;
  updatedAt?: Date;
  isActive?: boolean;
}

const ChatRoomSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  participants: [{ type: SchemaTypes.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true },
});

export default model<IChatRoom>('ChatRoom', ChatRoomSchema);
