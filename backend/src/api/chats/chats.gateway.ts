import { OnGatewayConnection, WebSocketGateway } from '@nestjs/websockets';
import { Socket } from 'socket.io';

@WebSocketGateway({
	// ws://localhost:3000/api/chats
	namespace: 'chats',
})
export class ChatsGateway implements OnGatewayConnection {
	handleConnection(socket: Socket) {
		console.log(`connect gateway ${socket}`);
	}
}
