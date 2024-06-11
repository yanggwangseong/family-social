import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';

import { OverrideInsertArrayFeild } from '@/types/repository';

import { TourismEntity } from '../entities/tourism.entity';

@Injectable()
export class TourismRepository extends Repository<TourismEntity> {
	constructor(
		@InjectRepository(TourismEntity)
		private readonly repository: Repository<TourismEntity>,
	) {
		super(repository.target, repository.manager, repository.queryRunner);
	}

	getTourismRepository(qr?: QueryRunner) {
		return qr
			? qr.manager.getRepository<TourismEntity>(TourismEntity)
			: this.repository;
	}

	async createTourism(
		overrideInsertArrayFeild: OverrideInsertArrayFeild<TourismEntity>,
		qr?: QueryRunner,
	) {
		const tourismRepository = this.getTourismRepository(qr);

		await tourismRepository.insert(overrideInsertArrayFeild);
	}

	async deleteTourism(periodId: string, qr?: QueryRunner) {
		const tourismRepository = this.getTourismRepository(qr);

		const { affected } = await tourismRepository.delete({ periodId: periodId });

		return !!affected;
	}
}
