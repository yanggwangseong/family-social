import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { NotificationEntity } from '@/models/entities/notification.entity';
import { NotificationsRepository } from '@/models/repositories/notifications.repository';

import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';

@Module({
	imports: [TypeOrmModule.forFeature([NotificationEntity])],
	controllers: [NotificationsController],
	providers: [NotificationsService, NotificationsRepository],
	exports: [NotificationsService],
})
export class NotificationsModule {}
