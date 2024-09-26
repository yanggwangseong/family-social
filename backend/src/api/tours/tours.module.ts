import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Pagination } from '@/common/strategies/context/pagination';
import { ToursCache } from '@/models/cache/tours-cache';
import { ScheduleEntity } from '@/models/entities/schedule.entity';
import { TourismPeriodEntity } from '@/models/entities/tourism-period.entity';
import { TourismEntity } from '@/models/entities/tourism.entity';
import { ScheduleRepository } from '@/models/repositories/schedule.repository';
import { TourismPeriodRepository } from '@/models/repositories/tourism-period.repository';
import { TourismRepository } from '@/models/repositories/tourism.repository';

import { ToursController } from './tours.controller';
import { ToursService } from './tours.service';

@Module({
	imports: [
		TypeOrmModule.forFeature([
			ScheduleEntity,
			TourismPeriodEntity,
			TourismEntity,
		]),
		HttpModule,
	],
	controllers: [ToursController],
	providers: [
		ToursService,
		ScheduleRepository,
		TourismPeriodRepository,
		TourismRepository,
		ToursCache,
		Pagination,
	],
	exports: [ToursService],
})
export class ToursModule {}
