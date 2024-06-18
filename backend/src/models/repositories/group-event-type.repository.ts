import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';

import { GroupEventTypeEntity } from '../entities/group-event-type.entity';

@Injectable()
export class GroupEventTypeRepository extends Repository<GroupEventTypeEntity> {
	constructor(
		@InjectRepository(GroupEventTypeEntity)
		private readonly repository: Repository<GroupEventTypeEntity>,
	) {
		super(repository.target, repository.manager, repository.queryRunner);
	}

	getRepository(qr?: QueryRunner) {
		return qr
			? qr.manager.getRepository<GroupEventTypeEntity>(GroupEventTypeEntity)
			: this.repository;
	}
}
