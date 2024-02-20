import { Module } from '@nestjs/common';

import { ChatsGateway } from './chats.gateway';

@Module({
	imports: [],
	controllers: [],
	providers: [ChatsGateway],
	exports: [],
})
export class ChatsModule {}
