import {
	MiddlewareConsumer,
	Module,
	NestModule,
	RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ScheduleExistsMiddleware } from '@/common/middlewares/schedule-exists.middleware';
import { FeedMediaEntity } from '@/models/entities/feed-media.entity';
import { MediasRepository } from '@/models/repositories/medias.repository';

import { MediasController } from './medias.controller';
import { MediasService } from './medias.service';
import { GroupsModule } from '../groups/groups.module';
import { SchedulesModule } from '../schedules/schedules.module';

@Module({
	imports: [
		TypeOrmModule.forFeature([FeedMediaEntity]),
		SchedulesModule,
		GroupsModule,
	],
	controllers: [MediasController],
	providers: [MediasService, MediasRepository],
	exports: [MediasService],
})
export class MediasModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(ScheduleExistsMiddleware).forRoutes({
			path: 'medias/schedules/:scheduleId/thumbnail-image',
			method: RequestMethod.PATCH,
		});
	}
}
