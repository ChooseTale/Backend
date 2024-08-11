import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
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
    console.log('WebSocket initialized');
  }

  handleConnection(client: Socket) {
    // header 에서 유저 아이디 가져오기

    client.join(`user:${client.id}`);
  }

  handleDisconnect(client: Socket) {
    client.leave(`user:${client.id}`);
  }

  emitMessage(client: Socket, eventName: string, message: string) {
    this.server.to(`user:${client.id}`).emit(eventName, message);
    client.disconnect();
  }
}
