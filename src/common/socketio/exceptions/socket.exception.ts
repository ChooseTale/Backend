import { IoAdapter } from '@nestjs/platform-socket.io';
import { Socket } from 'socket.io';

export class SocketException extends IoAdapter {
  emitExcetion(socket: Socket, event: string, data: any) {
    socket.emit(event, data);
  }
}
