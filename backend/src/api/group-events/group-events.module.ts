import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GroupEventTypeEntity } from '@/models/entities/group-event-type.entity';
import { GroupEventEntity } from '@/models/entities/group-event.entity';
import { GroupEventTypeRepository } from '@/models/repositories/group-event-type.repository';
import { GroupEventRepository } from '@/models/repositories/group-event.repository';

import { GroupEventsService } from './group-events.service';

@Module({
	imports: [TypeOrmModule.forFeature([GroupEventEntity, GroupEventTypeEntity])],
	controllers: [],
	providers: [
		GroupEventsService,
		GroupEventRepository,
		GroupEventTypeRepository,
	],
	exports: [GroupEventsService],
})
export class GroupEventsModule {}
