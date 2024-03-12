import {
	MiddlewareConsumer,
	Module,
	NestModule,
	RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ChatExistsMiddleware } from '@/common/middlewares/chat-exists.middleware';
import { ChatEntity } from '@/models/entities/chat.entity';
import { MemberChatEntity } from '@/models/entities/member-chat.entity';
import { MessageEntity } from '@/models/entities/message.entity';
import { ChatsRepository } from '@/models/repositories/chats.repository';
import { MemberChatRepository } from '@/models/repositories/member-chat.repository';
import { MessagesRepository } from '@/models/repositories/messages.repository';

import { ChatsController } from './chats.controller';
import { ChatsGateway } from './chats.gateway';
import { ChatsService } from './chats.service';
import { AuthModule } from '../auth/auth.module';
import { MessagesService } from '../messages/messages.service';

@Module({
	imports: [
		TypeOrmModule.forFeature([ChatEntity, MemberChatEntity, MessageEntity]),
		AuthModule,
	],
	controllers: [ChatsController],
	providers: [
		ChatsGateway,
		ChatsService,
		ChatsRepository,
		MemberChatRepository,
		MessagesService,
		MessagesRepository,
	],
	exports: [],
})
export class ChatsModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(ChatExistsMiddleware).forRoutes({
			path: 'chats/:chatId/messages',
			method: RequestMethod.GET,
		});
	}
}
