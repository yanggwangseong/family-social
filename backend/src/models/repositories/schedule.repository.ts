import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ScheduleEntity } from '../entities/schedule.entity';

@Injectable()
export class ScheduleRepository extends Repository<ScheduleEntity> {
	constructor(
		@InjectRepository(ScheduleEntity)
		private readonly repository: Repository<ScheduleEntity>,
	) {
		super(repository.target, repository.manager, repository.queryRunner);
	}
}
