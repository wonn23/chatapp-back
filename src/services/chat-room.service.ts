import ChatRoom from '../models/ChatRoom';

export const ChatRoomService = {
  async createRoom(title: string, max: number, owner: string) {
    const newChatRoom = new ChatRoom({
      title,
      max,
      owner,
      participants: [owner],
    });
    await newChatRoom.save();
    return newChatRoom;
  },

  async findAllRooms() {
    const chatRooms = await ChatRoom.find();
    return chatRooms;
  },

  async findOneRoom(id: string) {
    const chatRoom = await ChatRoom.findById(id);
    if (!chatRoom) {
      throw new Error('Chat room not found');
    }
    return chatRoom;
  },

  async updateRoom(id: string, title: string) {
    const chatRoom = await ChatRoom.findByIdAndUpdate(id, { title }, { new: true });
    if (!chatRoom) {
      throw new Error('Chat room not found');
    }
    return chatRoom;
  },

  async deleteRoom(id: string) {
    const chatRoom = await ChatRoom.findByIdAndDelete(id);
    if (!chatRoom) {
      throw new Error('Chat room not found');
    }
  },
};
