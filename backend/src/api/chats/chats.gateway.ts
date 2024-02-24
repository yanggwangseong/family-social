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

import { ChatCreateReqDto } from '@/models/dto/chat/req/chat-create-req.dto';

import { ChatsService } from './chats.service';

@WebSocketGateway({
	transports: ['websocket'],
	namespace: 'chats',
})
export class ChatsGateway
	implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
	constructor(private readonly chatsService: ChatsService) {}

	afterInit(server: Server) {
		console.log('Init', server);
	}

	handleDisconnect(client: Socket) {
		console.log('disconnect', client);
	}

	handleConnection(socket: Socket) {
		console.log(`connect gateway ${socket.data}`);
	}

	@SubscribeMessage('create-chat')
	async createChat(
		@ConnectedSocket() socket: Socket,
		@MessageBody() dto: ChatCreateReqDto,
	) {
		return await this.chatsService.createChat(dto);
	}

	@SubscribeMessage('enter-chat')
	enterChat(@ConnectedSocket() socket: Socket) {
		socket.join('room1');
	}

	@SubscribeMessage('send-message')
	sendMessage(
		@ConnectedSocket() socket: Socket,
		@MessageBody() body: { message: string },
	) {
		socket.to('room1').emit('receive-message', body.message);
	}
}
