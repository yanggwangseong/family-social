import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';

import { OverrideInsertArrayFeild } from '@/types/repository';

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
		overrideInsertArrayFeild: OverrideInsertArrayFeild<TourismPeriodEntity>,
		qr?: QueryRunner,
	) {
		const tourismPeriodRepository = this.getTourismPeriodRepository(qr);

		await tourismPeriodRepository.insert(overrideInsertArrayFeild);
	}

	async deleteTourismPeriod(scheduleId: string, qr?: QueryRunner) {
		const tourismPeriodRepository = this.getTourismPeriodRepository(qr);

		const { affected } = await tourismPeriodRepository.delete({
			scheduleId,
		});

		return !!affected;
	}

	async findTourismPeriodsByScheduleId(scheduleId: string) {
		const tourismPeriods = this.repository.find({
			select: {
				id: true,
			},
			where: {
				scheduleId,
			},
			order: {
				createdAt: 'asc',
			},
		});

		return tourismPeriods;
	}
}
