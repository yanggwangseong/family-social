import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';

import { AlarmType, Union } from '@/types';

import { NotificationTypeEntity } from '../entities/notification-type.entity';

@Injectable()
export class NotificationTypeRepository extends Repository<NotificationTypeEntity> {
	constructor(
		@InjectRepository(NotificationTypeEntity)
		private readonly repository: Repository<NotificationTypeEntity>,
	) {
		super(repository.target, repository.manager, repository.queryRunner);
	}

	getScheduleRepository(qr?: QueryRunner) {
		return qr
			? qr.manager.getRepository<NotificationTypeEntity>(NotificationTypeEntity)
			: this.repository;
	}

	async findNotificationTypeId(notificationType: Union<typeof AlarmType>) {
		return await this.repository
			.findOneOrFail({
				select: {
					id: true,
					notificationType: true,
				},
				where: {
					notificationType,
				},
			})
			.then((item) => {
				return {
					notificationTypeId: item.id,
				};
			});
	}
}
