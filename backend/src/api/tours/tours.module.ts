import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ToursController } from './tours.controller';
import { ToursService } from './tours.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleRepository } from '@/models/repositories/schedule.repository';
import { TourismPeriodRepository } from '@/models/repositories/tourism-period.repository';
import { TourismRepository } from '@/models/repositories/tourism.repository';
import { ScheduleEntity } from '@/models/entities/schedule.entity';
import { TourismPeriodEntity } from '@/models/entities/tourism-period.entity';
import { TourismEntity } from '@/models/entities/tourism.entity';

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
	],
	exports: [ToursService],
})
export class ToursModule {}
