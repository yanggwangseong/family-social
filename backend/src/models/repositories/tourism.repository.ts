import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

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

	async createTourism(tourism: ICreateTourismArgs[]) {
		await this.repository.insert(tourism);
	}

	async deleteTourism(periodId: string) {
		const { affected } = await this.delete({ periodId: periodId });

		return !!affected;
	}
}
