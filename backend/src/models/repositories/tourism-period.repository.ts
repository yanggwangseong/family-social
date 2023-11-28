import { Injectable } from '@nestjs/common';
import { TourismPeriodEntity } from '../entities/tourism-period.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ICreateTourPeriodArgs } from '@/types/args/tour';

@Injectable()
export class TourismPeriodRepository extends Repository<TourismPeriodEntity> {
	constructor(
		@InjectRepository(TourismPeriodEntity)
		private readonly repository: Repository<TourismPeriodEntity>,
	) {
		super(repository.target, repository.manager, repository.queryRunner);
	}

	async createTourismPeriod(periods: ICreateTourPeriodArgs[]) {
		const insertResult = await this.repository.insert(periods);
	}
}
