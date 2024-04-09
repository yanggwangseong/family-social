import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { NotificationTypeEntity } from '@/models/entities/notification-type.entity';
import { NotificationEntity } from '@/models/entities/notification.entity';
import { NotificationTypeRepository } from '@/models/repositories/notification-type.repository';
import { NotificationsRepository } from '@/models/repositories/notifications.repository';

import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';

@Module({
	imports: [
		TypeOrmModule.forFeature([NotificationEntity, NotificationTypeEntity]),
	],
	controllers: [NotificationsController],
	providers: [
		NotificationsService,
		NotificationsRepository,
		NotificationTypeRepository,
	],
	exports: [NotificationsService],
})
export class NotificationsModule {}
