import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ChatEntity } from '@/models/entities/chat.entity';
import { ChatsRepository } from '@/models/repositories/chats.repository';

import { ChatsGateway } from './chats.gateway';
import { ChatsService } from './chats.service';

@Module({
	imports: [TypeOrmModule.forFeature([ChatEntity])],
	controllers: [],
	providers: [ChatsGateway, ChatsService, ChatsRepository],
	exports: [],
})
export class ChatsModule {}
