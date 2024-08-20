import { model, Schema, SchemaTypes, Types, Document } from 'mongoose';

export interface IMessage extends Document {
  roomId: Types.ObjectId;
  userId: Types.ObjectId;
  text: string;
  createdAt: Date;
}

const MessageSchema: Schema = new Schema({
  roomId: { type: SchemaTypes.ObjectId, ref: 'ChatRoom', required: true },
  userId: { type: SchemaTypes.ObjectId, ref: 'User', required: true },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default model<IMessage>('Message', MessageSchema);
