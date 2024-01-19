import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ICreateTourPeriodArgs } from '@/types/args/tour';

import { TourismPeriodEntity } from '../entities/tourism-period.entity';

@Injectable()
export class TourismPeriodRepository extends Repository<TourismPeriodEntity> {
	constructor(
		@InjectRepository(TourismPeriodEntity)
		private readonly repository: Repository<TourismPeriodEntity>,
	) {
		super(repository.target, repository.manager, repository.queryRunner);
	}

	async createTourismPeriod(periods: ICreateTourPeriodArgs[]) {
		await this.repository.insert(periods);
	}

	async deleteTourismPeriod(scheduleId: string) {
		const { affected } = await this.delete({ scheduleId: scheduleId });

		return !!affected;
	}

	async findTourismPeriodsByScheduleId(scheduleId: string) {
		const tourismPeriods = this.repository.find({
			select: {
				id: true,
			},
			where: {
				scheduleId: scheduleId,
			},
			order: {
				createdAt: 'asc',
			},
		});

		return tourismPeriods;
	}
}
