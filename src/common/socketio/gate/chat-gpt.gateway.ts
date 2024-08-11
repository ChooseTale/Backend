import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(5002, { cors: true, namespace: '/chat-gpt' })
export class AppGateGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private server: Server;

  afterInit(server: Server) {
    this.server = server;
  }

  handleConnection(client: Socket) {
    // 유저 아이디 가져오기
    const userId = client.handshake.headers.userId ?? 1;
    // userId등록
    Object.assign(client, { userId });

    client.join(`user:${userId}`);
  }

  handleDisconnect(client: Socket) {
    const userId = client.handshake.headers.userId ?? 1;
    client.leave(`user:${userId}`);
  }

  emitMessage(userId: number, eventName: string, message: object) {
    this.server.to(`user:${userId}`).emit(eventName, message);
  }

  emitException(userId: number, eventName: string, message: object) {
    this.server.to(`user:${userId}`).emit(eventName, {
      ...message,
      status: 'error',
    });
  }
}
