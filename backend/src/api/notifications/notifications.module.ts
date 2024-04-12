import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { NotificationTypeEntity } from '@/models/entities/notification-type.entity';
import { NotificationEntity } from '@/models/entities/notification.entity';
import { NotificationTypeRepository } from '@/models/repositories/notification-type.repository';
import { NotificationsRepository } from '@/models/repositories/notifications.repository';

import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';
import { ServerSentEventsModule } from '../server-sent-events/server-sent-events.module';

@Module({
	imports: [
		TypeOrmModule.forFeature([NotificationEntity, NotificationTypeEntity]),
		ServerSentEventsModule,
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
