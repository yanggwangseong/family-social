import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { TourismEntity } from '../entities/tourism.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TourismRepository extends Repository<TourismEntity> {
	constructor(
		@InjectRepository(TourismEntity)
		private readonly repository: Repository<TourismEntity>,
	) {
		super(repository.target, repository.manager, repository.queryRunner);
	}
}
