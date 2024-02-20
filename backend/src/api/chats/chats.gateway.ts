import {
	OnGatewayConnection,
	OnGatewayDisconnect,
	OnGatewayInit,
	WebSocketGateway,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
	// ws://localhost:3000/api/chats
	transports: ['websocket'],
	namespace: 'chats',
})
export class ChatsGateway
	implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
	afterInit(server: Server) {
		console.log('Init', server);
	}

	handleDisconnect(client: Socket) {
		console.log('disconnect', client);
	}

	handleConnection(socket: Socket) {
		console.log(`connect gateway ${socket}`);
	}
}
