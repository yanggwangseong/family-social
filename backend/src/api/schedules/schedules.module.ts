import {
	MiddlewareConsumer,
	Module,
	NestModule,
	RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ScheduleExistsMiddleware } from '@/common/middlewares/schedule-exists.middleware';
import { Pagination } from '@/common/strategies/context/pagination';
import { ScheduleEntity } from '@/models/entities/schedule.entity';
import { SharedScheduleMemberEntity } from '@/models/entities/shared-schedule-member.entity';
import { TourismPeriodEntity } from '@/models/entities/tourism-period.entity';
import { TourismEntity } from '@/models/entities/tourism.entity';
import { ScheduleRepository } from '@/models/repositories/schedule.repository';
import { SharedScheduleMemberRepository } from '@/models/repositories/shared-schedule-member.repository';
import { TourismPeriodRepository } from '@/models/repositories/tourism-period.repository';
import { TourismRepository } from '@/models/repositories/tourism.repository';

import { SchedulesController } from './schedules.controller';
import { SchedulesService } from './schedules.service';

@Module({
	imports: [
		TypeOrmModule.forFeature([
			ScheduleEntity,
			TourismPeriodEntity,
			TourismEntity,
			SharedScheduleMemberEntity,
		]),
	],
	controllers: [SchedulesController],
	providers: [
		SchedulesService,
		ScheduleRepository,
		TourismPeriodRepository,
		TourismRepository,
		SharedScheduleMemberRepository,
		Pagination,
	],
	exports: [SchedulesService],
})
export class SchedulesModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer
			.apply(ScheduleExistsMiddleware)
			.exclude({ path: 'schdules', method: RequestMethod.GET });
	}
}
