import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
	DeepPartial,
	FindOptionsWhere,
	QueryRunner,
	Repository,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { NotificationResDto } from '../dto/notification/res/notification.res.dto';
import { NotificationEntity } from '../entities/notification.entity';

@Injectable()
export class NotificationsRepository extends Repository<NotificationEntity> {
	constructor(
		@InjectRepository(NotificationEntity)
		private readonly repository: Repository<NotificationEntity>,
	) {
		super(repository.target, repository.manager, repository.queryRunner);
	}

	getNotificationRepository(qr?: QueryRunner) {
		return qr
			? qr.manager.getRepository<NotificationEntity>(NotificationEntity)
			: this.repository;
	}

	async createNotification(
		overrideInsertFeilds: DeepPartial<NotificationEntity>,
		qr?: QueryRunner,
	) {
		const NotificationRepository = this.getNotificationRepository(qr);

		const notification: DeepPartial<NotificationEntity> = {
			id: uuidv4(),
			...overrideInsertFeilds,
		};

		await NotificationRepository.insert(
			NotificationRepository.create(notification),
		);
	}

	async getNotifications({
		whereOverride,
		take,
		skip,
	}: {
		whereOverride: FindOptionsWhere<NotificationEntity>;
		take: number;
		skip: number;
	}): Promise<[NotificationResDto[], number]> {
		return await this.repository.findAndCount({
			select: {
				id: true,
				notificationTypeId: true,
				recipientId: true,
				senderId: true,
				notificationTitle: true,
				notificationDescription: true,
				notificationFeedId: true,
				isRead: true,
				createdAt: true,
				sender: {
					id: true,
					username: true,
					profileImage: true,
				},
			},
			where: {
				...whereOverride,
			},
			relations: {
				sender: true,
			},
			skip,
			take,
		});
	}
}
