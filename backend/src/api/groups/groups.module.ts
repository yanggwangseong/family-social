import {
	MiddlewareConsumer,
	Module,
	NestModule,
	RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GroupEventExistsMiddleware } from '@/common/middlewares/group-event-exists.middleware';
import { GroupExistsMiddleware } from '@/common/middlewares/group-exists.middleware';
import { ScheduleExistsMiddleware } from '@/common/middlewares/schedule-exists.middleware';
import { Pagination } from '@/common/strategies/context/pagination';
import { GroupFollowCache } from '@/models/cache/group-follow-cache';
import { FamEntity } from '@/models/entities/fam.entity';
import { GroupEntity } from '@/models/entities/group.entity';
import { GroupFollowEntity } from '@/models/entities/group.follow.entity';
import { FamsRepository } from '@/models/repositories/fams.repository';
import { GroupFollowRepository } from '@/models/repositories/group-follow.repository';
import { GroupsRepository } from '@/models/repositories/groups.repository';

import { GroupsController } from './groups.controller';
import { GroupsService } from './groups.service';
import { FamsModule } from '../fams/fams.module';
import { GroupEventsModule } from '../group-events/group-events.module';
import { GroupFollowService } from '../group-follow/group-follow.service';
import { InvitationsModule } from '../invitations/invitations.module';
import { MailsModule } from '../mails/mails.module';
import { MembersModule } from '../members/members.module';
import { SchedulesModule } from '../schedules/schedules.module';

@Module({
	imports: [
		TypeOrmModule.forFeature([GroupEntity, FamEntity, GroupFollowEntity]),
		FamsModule,
		MembersModule,
		SchedulesModule,
		MailsModule,
		GroupEventsModule,
		InvitationsModule,
	],
	controllers: [GroupsController],
	providers: [
		GroupsService,
		GroupsRepository,
		FamsRepository,
		Pagination,
		GroupFollowService,
		GroupFollowCache,
		GroupFollowRepository,
	],
	exports: [GroupsService],
})
export class GroupsModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer
			.apply(GroupExistsMiddleware)
			.exclude(
				{ path: 'groups', method: RequestMethod.GET },
				{ path: 'groups', method: RequestMethod.POST },
				{ path: 'groups/feeds', method: RequestMethod.GET },
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

		consumer.apply(GroupEventExistsMiddleware).forRoutes(
			{
				path: 'groups/:groupId/group-events/:groupEventId',
				method: RequestMethod.GET,
			},
			{
				path: 'groups/:groupId/group-events/:groupEventId',
				method: RequestMethod.DELETE,
			},
			{
				path: 'groups/:groupId/group-events/:groupEventId',
				method: RequestMethod.PUT,
			},
		);
	}
}
