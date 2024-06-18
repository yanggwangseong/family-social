import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';

import { EventType, Union } from '@/types';

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

	async findByEventType(eventType: Union<typeof EventType>) {
		return await this.findOne({
			where: {
				groupEventType: eventType,
			},
		});
	}
}
