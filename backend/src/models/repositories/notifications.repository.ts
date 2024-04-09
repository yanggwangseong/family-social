import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { NotificationEntity } from '../entities/notification.entity';

@Injectable()
export class NotificationsRepository extends Repository<NotificationEntity> {
	constructor(
		@InjectRepository(NotificationEntity)
		private readonly repository: Repository<NotificationEntity>,
	) {
		super(repository.target, repository.manager, repository.queryRunner);
	}
}
