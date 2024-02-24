import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ChatEntity } from '@/models/entities/chat.entity';
import { MemberChatEntity } from '@/models/entities/member-chat.entity';
import { ChatsRepository } from '@/models/repositories/chats.repository';
import { MemberChatRepository } from '@/models/repositories/member-chat.repository';

import { ChatsGateway } from './chats.gateway';
import { ChatsService } from './chats.service';

@Module({
	imports: [TypeOrmModule.forFeature([ChatEntity, MemberChatEntity])],
	controllers: [],
	providers: [
		ChatsGateway,
		ChatsService,
		ChatsRepository,
		MemberChatRepository,
	],
	exports: [],
})
export class ChatsModule {}
