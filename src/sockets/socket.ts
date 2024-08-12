import { Server } from 'socket.io';

export const configureSocket = (io: Server) => {
  io.on('connection', socket => {
    console.log('New client connected:', socket.id);

    socket.on('message', msg => {
      console.log('Received message:', msg);
      socket.broadcast.emit('message', msg);
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });
};
