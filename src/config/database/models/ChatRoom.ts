import { model, Schema, Types, SchemaTypes, Document } from 'mongoose';

export interface IChatRoom extends Document {
  name: string;
  participants: Types.ObjectId[];
}

const ChatRoomSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  participants: [{ type: SchemaTypes.ObjectId, ref: 'User' }],
});

export default model<IChatRoom>('ChatRoom', ChatRoomSchema);
