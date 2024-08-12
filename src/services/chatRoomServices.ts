import ChatRoom from '../config/database/models/ChatRoom';

export class ChatRoomService {
  static async create(chatRoomName: string, userId: string) {
    const newChatRoom = new ChatRoom({
      name: chatRoomName,
      participants: [userId],
    });
    await newChatRoom.save();
    return newChatRoom;
  }

  static async findAll() {
    const chatRooms = await ChatRoom.find();
    return chatRooms;
  }

  static async findOne(id: string) {
    const chatRoom = await ChatRoom.findById(id);
    if (!chatRoom) {
      throw new Error('Chat room not found');
    }
    return chatRoom;
  }

  static async update(id: string, chatRoomName: string) {
    const chatRoom = await ChatRoom.findByIdAndUpdate(id, { name: chatRoomName }, { new: true });
    if (!chatRoom) {
      throw new Error('Chat room not found');
    }
    return chatRoom;
  }

  static async delete(id: string) {
    const chatRoom = await ChatRoom.findByIdAndDelete(id);
    if (!chatRoom) {
      throw new Error('Chat room not found');
    }
  }
}
