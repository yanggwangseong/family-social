import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ChatEntity } from '@/models/entities/chat.entity';
import { MemberChatEntity } from '@/models/entities/member-chat.entity';
import { MessageEntity } from '@/models/entities/message.entity';
import { ChatsRepository } from '@/models/repositories/chats.repository';
import { MemberChatRepository } from '@/models/repositories/member-chat.repository';
import { MessagesRepository } from '@/models/repositories/messages.repository';

import { ChatsController } from './chats.controller';
import { ChatsGateway } from './chats.gateway';
import { ChatsService } from './chats.service';
import { MessagesService } from '../messages/messages.service';

@Module({
	imports: [
		TypeOrmModule.forFeature([ChatEntity, MemberChatEntity, MessageEntity]),
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
export class ChatsModule {}
