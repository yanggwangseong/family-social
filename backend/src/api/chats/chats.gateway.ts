import { UseFilters, UsePipes, ValidationPipe } from '@nestjs/common';
import {
	ConnectedSocket,
	MessageBody,
	OnGatewayConnection,
	OnGatewayDisconnect,
	OnGatewayInit,
	SubscribeMessage,
	WebSocketGateway,
	WsException,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';

import { SocketCatchHttpExceptionFilter } from '@/common/filter/socket-catch-http.exception-filter';
import { ChatCreateReqDto } from '@/models/dto/chat/req/chat-create-req.dto';
import { ChatEnterReqDto } from '@/models/dto/chat/req/chat-enter-req.dto';
import { MessageCreateReqDto } from '@/models/dto/message/req/message-create-req.dto';

import { ChatsService } from './chats.service';
import { AuthService } from '../auth/auth.service';
import { MessagesService } from '../messages/messages.service';

@UsePipes(
	new ValidationPipe({
		transform: true,
		transformOptions: {
			enableImplicitConversion: true,
		},
		whitelist: true,
		forbidNonWhitelisted: true,
	}),
)
@UseFilters(SocketCatchHttpExceptionFilter)
@WebSocketGateway({
	transports: ['websocket'],
	namespace: 'chats',
	cors: {
		credentials: true,
	},
})
export class ChatsGateway
	implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
	constructor(
		private readonly chatsService: ChatsService,
		private readonly messagesService: MessagesService,
		private readonly authService: AuthService,
	) {}

	afterInit() {}

	handleDisconnect() {}

	handleConnection(socket: Socket & { sub: string }) {
		//const headers = socket.handshake.headers;

		//const rawToken = headers['authorization']!;

		const rawToken = socket.handshake.auth['authorization'];

		if (!rawToken) {
			socket.disconnect();
		}

		try {
			//const token = this.authService.extractTokenFromHeader(rawToken, true);

			const payload = this.authService.verifyToken(rawToken);
			socket.sub = payload.sub;

			return true;
		} catch (error) {
			socket.disconnect();
		}
	}

	@SubscribeMessage('create-chat')
	async createChat(
		@ConnectedSocket() socket: Socket,
		@MessageBody() dto: ChatCreateReqDto,
	) {
		const chatId = await this.chatsService.createChat(dto);

		socket.emit('chat-created', chatId);
	}

	@SubscribeMessage('enter-chat')
	async enterChat(
		@ConnectedSocket() socket: Socket,
		@MessageBody() dto: ChatEnterReqDto,
	) {
		for (const chatId of dto.chatIds) {
			const exists = await this.chatsService.checkIfChatExists(chatId);

			if (!exists) {
				throw new WsException({
					success: false,
					timestamp: new Date().toISOString(),
					status: 404,
					message: `존재하지 않는 chat 입니다. chatId: ${chatId}`,
				});
			}
		}
		socket.join(dto.chatIds);
	}

	@SubscribeMessage('send-message')
	async sendMessage(
		@ConnectedSocket() socket: Socket & { sub: string },
		@MessageBody() dto: MessageCreateReqDto,
	) {
		const exists = await this.chatsService.checkIfChatExists(dto.chatId);

		if (!exists) {
			throw new WsException({
				success: false,
				timestamp: new Date().toISOString(),
				status: 404,
				message: `존재하지 않는 chat 입니다. chatId: ${dto.chatId}`,
			});
		}

		const message = await this.messagesService.createMessage({
			chatId: dto.chatId,
			message: dto.message,
			memberId: socket.sub,
		});

		socket.to(message.chatId).emit('receive-message', dto.message);
	}
}
