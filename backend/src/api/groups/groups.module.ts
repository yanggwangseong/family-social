import {
	MiddlewareConsumer,
	Module,
	NestModule,
	RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GroupExistsMiddleware } from '@/common/middlewares/group-exists.middleware';
import { ScheduleExistsMiddleware } from '@/common/middlewares/schedule-exists.middleware';
import { FamEntity } from '@/models/entities/fam.entity';
import { GroupEntity } from '@/models/entities/group.entity';
import { FamsRepository } from '@/models/repositories/fams.repository';
import { GroupsRepository } from '@/models/repositories/groups.repository';

import { GroupsController } from './groups.controller';
import { GroupsService } from './groups.service';
import { FamsModule } from '../fams/fams.module';
import { GroupEventsModule } from '../group-events/group-events.module';
import { MailsModule } from '../mails/mails.module';
import { MembersModule } from '../members/members.module';
import { SchedulesModule } from '../schedules/schedules.module';

@Module({
	imports: [
		TypeOrmModule.forFeature([GroupEntity, FamEntity]),
		FamsModule,
		MembersModule,
		SchedulesModule,
		MailsModule,
		GroupEventsModule,
	],
	controllers: [GroupsController],
	providers: [GroupsService, GroupsRepository, FamsRepository],
	exports: [GroupsService],
})
export class GroupsModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer
			.apply(GroupExistsMiddleware)
			.exclude(
				{ path: 'groups', method: RequestMethod.GET },
				{ path: 'groups', method: RequestMethod.POST },
			)
			.forRoutes(GroupsController);

		consumer.apply(ScheduleExistsMiddleware).forRoutes(
			{
				path: 'groups/:groupId/schedules/:scheduleId',
				method: RequestMethod.GET,
			},
			{
				path: 'groups/:groupId/schedules/:scheduleId',
				method: RequestMethod.PUT,
			},
			{
				path: 'groups/:groupId/schedules/:scheduleId',
				method: RequestMethod.DELETE,
			},
		);
	}
}
