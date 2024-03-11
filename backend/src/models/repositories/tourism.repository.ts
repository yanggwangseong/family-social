import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';

import { ICreateTourismArgs } from '@/types/args/tour';

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

	async createTourism(tourism: ICreateTourismArgs[], qr?: QueryRunner) {
		const tourismRepository = this.getTourismRepository(qr);

		await tourismRepository.insert(tourism);
	}

	async deleteTourism(periodId: string, qr?: QueryRunner) {
		const tourismRepository = this.getTourismRepository(qr);

		const { affected } = await tourismRepository.delete({ periodId: periodId });

		return !!affected;
	}
}
