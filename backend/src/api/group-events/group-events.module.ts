import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Pagination } from '@/common/strategies/context/pagination';
import { GroupEventTypeEntity } from '@/models/entities/group-event-type.entity';
import { GroupEventEntity } from '@/models/entities/group-event.entity';
import { GroupEventTypeRepository } from '@/models/repositories/group-event-type.repository';
import { GroupEventRepository } from '@/models/repositories/group-event.repository';

import { GroupEventsController } from './group-events.controller';
import { GroupEventsService } from './group-events.service';

@Module({
	imports: [TypeOrmModule.forFeature([GroupEventEntity, GroupEventTypeEntity])],
	controllers: [GroupEventsController],
	providers: [
		GroupEventsService,
		GroupEventRepository,
		GroupEventTypeRepository,
		Pagination,
	],
	exports: [GroupEventsService],
})
export class GroupEventsModule {}
