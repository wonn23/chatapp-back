import { model, Schema, SchemaTypes, Types, Document } from 'mongoose';

export interface IMessage extends Document {
  chatRoom: Types.ObjectId;
  sender: Types.ObjectId;
  message: string;
  timestamp: Date;
}

const MessageSchema: Schema = new Schema({
  chatRoom: { type: SchemaTypes.ObjectId, ref: 'ChatRoom', required: true },
  sender: { type: SchemaTypes.ObjectId, ref: 'User', required: true },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

export default model<IMessage>('Message', MessageSchema);
