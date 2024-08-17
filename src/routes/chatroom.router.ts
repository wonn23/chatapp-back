import { Router } from 'express';
import { ChatRoomController } from '../controllers/chat-room.controller';

const router = Router();

router.post('/', ChatRoomController.create);
router.get('/', ChatRoomController.findAll);
router.get('/:id', ChatRoomController.findOne);
router.put('/:id', ChatRoomController.update);
router.delete('/:id', ChatRoomController.delete);

export default router;
