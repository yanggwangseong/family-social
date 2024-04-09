import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { v4 as uuidv4 } from 'uuid';

import { NotificationEntity } from '../entities/notification.entity';

@Injectable()
export class NotificationsRepository extends Repository<NotificationEntity> {
	constructor(
		@InjectRepository(NotificationEntity)
		private readonly repository: Repository<NotificationEntity>,
	) {
		super(repository.target, repository.manager, repository.queryRunner);
	}

	getScheduleRepository(qr?: QueryRunner) {
		return qr
			? qr.manager.getRepository<NotificationEntity>(NotificationEntity)
			: this.repository;
	}

	async createNotification(
		overrideInsertFeilds: QueryDeepPartialEntity<NotificationEntity>,
		qr?: QueryRunner,
	) {
		const scheduleRepository = this.getScheduleRepository(qr);

		await scheduleRepository.insert({
			id: uuidv4(),
			...overrideInsertFeilds,
		});
	}
}
