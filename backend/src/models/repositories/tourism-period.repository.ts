import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';

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

	getTourismPeriodRepository(qr?: QueryRunner) {
		return qr
			? qr.manager.getRepository<TourismPeriodEntity>(TourismPeriodEntity)
			: this.repository;
	}

	async createTourismPeriod(
		periods: ICreateTourPeriodArgs[],
		qr?: QueryRunner,
	) {
		const tourismPeriodRepository = this.getTourismPeriodRepository(qr);

		await tourismPeriodRepository.insert(periods);
	}

	async deleteTourismPeriod(scheduleId: string, qr?: QueryRunner) {
		const tourismPeriodRepository = this.getTourismPeriodRepository(qr);

		const { affected } = await tourismPeriodRepository.delete({
			scheduleId: scheduleId,
		});

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
