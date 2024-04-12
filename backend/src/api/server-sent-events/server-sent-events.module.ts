import { Module } from '@nestjs/common';

import { ServerSentEventsController } from './server-sent-events.controller';
import { ServerSentEventsService } from './server-sent-events.service';

@Module({
	imports: [],
	controllers: [ServerSentEventsController],
	providers: [ServerSentEventsService],
	exports: [ServerSentEventsService],
})
export class ServerSentEventsModule {}
