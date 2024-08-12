import { Request, Response } from 'express';
import { ChatRoomService } from '../services/chatRoomServices';

export class ChatRoomController {
  static create = async (req: Request, res: Response) => {
    const { chatRoomName, userId } = req.body;

    try {
      const chatRoom = await ChatRoomService.create(chatRoomName, userId);
      res.status(201).json(chatRoom);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  static findAll = async (req: Request, res: Response) => {
    try {
      const chatRooms = await ChatRoomService.findAll();
      res.status(200).json(chatRooms);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  static findOne = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const chatRoom = await ChatRoomService.findOne(id);
      res.status(200).json(chatRoom);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  static update = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { chatRoomName } = req.body;
    try {
      const chatRoom = await ChatRoomService.update(id, chatRoomName);
      res.status(200).json(chatRoom);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  static delete = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      await ChatRoomService.delete(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
}
