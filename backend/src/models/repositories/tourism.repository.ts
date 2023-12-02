import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { TourismEntity } from '../entities/tourism.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ICreateTourismArgs } from '@/types/args/tour';

@Injectable()
export class TourismRepository extends Repository<TourismEntity> {
	constructor(
		@InjectRepository(TourismEntity)
		private readonly repository: Repository<TourismEntity>,
	) {
		super(repository.target, repository.manager, repository.queryRunner);
	}

	async createTourism(tourism: ICreateTourismArgs[]) {
		const insertResult = await this.repository.insert(tourism);
	}

	async deleteTourism(periodId: string) {
		const { affected } = await this.delete({ periodId: periodId });

		return !!affected;
	}
}
