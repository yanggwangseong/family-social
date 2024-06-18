import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';

import { GroupEventEntity } from '../entities/group-event.entity';

@Injectable()
export class GroupEventRepository extends Repository<GroupEventEntity> {
	constructor(
		@InjectRepository(GroupEventEntity)
		private readonly repository: Repository<GroupEventEntity>,
	) {
		super(repository.target, repository.manager, repository.queryRunner);
	}

	getRepository(qr?: QueryRunner) {
		return qr
			? qr.manager.getRepository<GroupEventEntity>(GroupEventEntity)
			: this.repository;
	}
}
