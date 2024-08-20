import { Request, Response, NextFunction } from 'express';
import ChatRoom from '../models/ChatRoom';
import { ChatRoomService } from '../services/chat-room.service';

export const ChatRoomController = {
  async create(req: Request, res: Response, next: NextFunction) {
    const { title, max, owner } = req.body;

    try {
      const chatRoom = await ChatRoomService.createRoom(title, parseInt(max), owner);
      res.status(201).json(chatRoom);
    } catch (error) {
      next(error);
    }
  },

  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const chatRooms = await ChatRoomService.findAllRooms();
      res.status(200).json(chatRooms);
    } catch (error) {
      next(error);
    }
  },

  async findOne(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      const chatRoom = await ChatRoomService.findOneRoom(id);
      res.status(200).json(chatRoom);
    } catch (error) {
      next(error);
    }
  },

  async update(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const { title } = req.body;
    try {
      const chatRoom = await ChatRoomService.updateRoom(id, title);
      res.status(200).json(chatRoom);
    } catch (error) {
      next(error);
    }
  },

  async delete(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      await ChatRoomService.deleteRoom(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  },

  async checkChatRoom(roomId: string, next: NextFunction) {
    const chatRoom = await ChatRoom.findById({ _id: roomId });
    if (!chatRoom) {
      throw new Error('ChatRoom not found');
    }
    return chatRoom;
  },
};
